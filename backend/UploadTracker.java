package com.fsdbackend.Login;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Tracker")
public class UploadTracker {
    @Id
    private String id;
    private static Date uploadedAt=new Date();
    private String fileName;
    private int totalRecords;
    private int goodRecords;
    private int badRecords;
    private String uploadedBy; // Reference to the user who uploaded the data
    // Other properties, getters, and setters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFileName() {
		return fileName;
	}
	public Date getUploadedAt() {
		return uploadedAt;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}
	public int getGoodRecords() {
		return goodRecords;
	}
	public void setGoodRecords(int goodRecords) {
		this.goodRecords = goodRecords;
	}
	public int getBadRecords() {
		return badRecords;
	}
	public void setBadRecords(int badRecords) {
		this.badRecords = badRecords;
	}
	public String getUploadedBy() {
		return uploadedBy;
	}
	public void setUplodedBy(String UploadedBy) {
		this.uploadedBy = UploadedBy;
	}

    
}
