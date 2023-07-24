import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./UploadTracker.css"; // Import the CSS file for UploadTracker styles

const UploadTracker = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    // Fetch Uploads data from the API
    fetch("http://localhost:8081/api/leads/history")
      .then((response) => response.json())
      .then((data) => {
        setUploads(data);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);
  console.log(uploads);

  return (
    <div>
      <NavBar />

      <div className="container">
        <ul className="upload-list">
          {uploads.map((upload) => (
            <li key={upload.id} className="upload-item">
              <p>File Name: {upload.fileName}</p>
              <p>Uploaded By: {upload.uploadedBy}</p>
              <p>Records Processed: {upload.totalRecords}</p>
              <p>Good Records: {upload.goodRecords}</p>
              <p>Bad Records: {upload.badRecords}</p>
              <p>Uploaded At: {upload.uploadedAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UploadTracker;
