package com.nimhans.sample.Sample_Tracker.model;

import java.util.ArrayList;

public class Department {

	private int departemnt_id;
	private String departmentName;
	ArrayList<Technician> deptTechnicians;
	
	
	
	//GETTERS AND SETTERS
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public int getDepartemnt_id() {
		return departemnt_id;
	}
	public void setDepartemnt_id(int departemnt_id) {
		this.departemnt_id = departemnt_id;
	}


}
