package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Admin {

	private String admin_name;
	private String password;
	private int admin_id;
	
	

	//Constructors
	public Admin() {
	}

	public Admin(String admin_name,String password) {
		super();
		this.admin_name = admin_name;
		this.password = password;
		
	}
	
	public Admin(String admin_name) {
		super();
		this.admin_name = admin_name;
	}

	//GETTERS AND SETTERS
	
	public String getadmin_name() {
		return admin_name;
	}
	public void setadmin_name(String admin_name) {
		this.admin_name = admin_name;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	public int getadmin_id() {
		return admin_id;
	}

	public void setadmin_id(int admin_id) {
		this.admin_id = admin_id;
	}
	
	
}
