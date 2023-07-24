import React, { useState } from "react";
import NavBar from "./NavBar";
import "./UploadLeads.css"; // Import the CSS file for UploadLeads styles

const UploadLeads = () => {
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Status", accessor: "status" },
    { Header: "Assigned To", accessor: "assignedTo" },
  ];
  const [file, setFile] = useState(null);
  const [badRecords, setBadRecords] = useState([]);
  const userId = sessionStorage.getItem("username");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFirstName = (firstName) => {
    // Regular expression to validate phone number format
    const Regex = /^[a-zA-Z]+$/;
    return Regex.test(firstName);
  };

  const validateLastName = (lastName) => {
    // Regular expression to validate phone number format
    const Regex = /^[a-zA-Z]+$/;
    return Regex.test(lastName);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression to validate phone number format
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleFormSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        const rows = csvData.split("\n");

        let validRecords = 0;
        let invalidRecords = 0;

        rows.forEach((row) => {
          let isValid = true;
          // Process each row as needed
          // Assuming the row contains comma-separated values
          const rowData = row.split(",");
          if (rowData.length !== 6) {
            isValid = false;
          }
          const leadData = {
            firstName: rowData[0],
            lastName: rowData[1],
            email: rowData[2],
            phone: rowData[3],
            status: rowData[4],
            assignedTo: rowData[5],
          };
          // {
          //   "firstName": "ksai",
          //   "lastName": "teja",
          //   "email": "saitejakalva@gmail.com",
          //   "phone": "9010880884",
          //   "status": "pending",
          //   "assignedTo": "assigned",
          // }

          console.log(leadData);

          // Perform validations on the lead data

          if (
            !validateEmail(leadData.email) ||
            !validateFirstName(leadData.firstName) ||
            !validateLastName(leadData.lastName) ||
            !validatePhoneNumber(leadData.phone)
          ) {
            setBadRecords(row);
            isValid = false;
          }

          if (isValid) {
            validRecords++;
            // Make the API call to upload the lead data
            fetch("http://localhost:8081/api/leads/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(leadData),
            })
              .then((response) => response.json())
              .then((data) => {
                // Handle the API response
                console.log(data);
              })
              .catch((error) => {
                // Handle any errors
                console.error(error);
              });
          } else {
            invalidRecords++;
          }
        });

        // Make the API call to upload the history
        const uploadHistory = {
          fileName: file.name,
          totalRecords: rows.length,
          goodRecords: validRecords,
          badRecords: invalidRecords,
          uploadedBy: userId,
        };

        fetch("http://localhost:8081/api/leads/history/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadHistory),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the API response
            console.log(data);
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="container">
        <h1 className="title">Upload Leads</h1>

        <form className="upload-form" onSubmit={handleFormSubmit}>
          <label htmlFor="fileInput" className="file-label">
            Choose CSV file to upload:
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
          <br></br>
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>

        <br></br>
        <br></br>
        <br></br>
        <h1 className="title">Bad Records</h1>
        <table className="lead-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.Header}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {badRecords.map((badRecord) => (
              <tr key={badRecord.id}>
                {columns.map((column) => (
                  <td key={column.Header}>{badRecord[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadLeads;
