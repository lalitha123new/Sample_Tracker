package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Technician {

	private String technicianName;
	private String password;
	private String roles;
	private int technician_id;
	
	private int unit_id;
	
	
	

	public int getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}

	//Constructors
	public Technician() {
	}

	public Technician(int technician_id,String technicianName,String password,String roles) {
		super();
		this.technicianName = technicianName;
		this.password = password;
		this.roles = roles;
		this.technician_id =technician_id;
		
	}
	
	public Technician(int technician_id,String technicianName,String password,String roles,int unit_id) {
		super();
		this.technicianName = technicianName;
		this.password = password;
		this.roles = roles;
		this.technician_id =technician_id;
		this.unit_id=unit_id;
		
	}
	
	public Technician(String technicianName,String roles,int technician_id) {
		super();
		this.technicianName = technicianName;
		this.roles = roles;
		this.technician_id =technician_id;	
	}
	
	public Technician(String technicianName,String password,String roles) {
		super();
		this.technicianName = technicianName;
		this.password = password;
		this.roles = roles;
		
		
	}
	
	
	public Technician(String technicianName) {
		super();
		this.technicianName = technicianName;
	}

	
	public Technician(String technicianName,String roles) {
		super();
		this.technicianName = technicianName;
		this.roles = roles;
	}

	//GETTERS AND SETTERS
	
	public String getTechnicianName() {
		return technicianName;
	}
	public void setTechnicianName(String technicianName) {
		this.technicianName = technicianName;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}
	
	public int getTechnician_id() {
		return technician_id;
	}

	public void setTechnician_id(int technician_id) {
		this.technician_id = technician_id;
	}
	
	
}
