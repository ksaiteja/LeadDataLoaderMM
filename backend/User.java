package com.fsdbackend.Login;


import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
   
    
    private String username;
    private String password;
    private String role;
    // Other properties, getters, and setters
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

  
}
