package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Unit {
    
	private int unit_id;
	private String unit;
	private String unit_incharge;
	private String employee_id_unit_incharge;
	private int department_id;
	
	
	

	//Constructors
	public Unit() {
	}

	public Unit(int unit_id,String unit,int department_id) {
		
		super();
		this.unit_id=unit_id;
		this.unit=unit;
		this.department_id=department_id;
		
	}
	
	
	public int getUnit_id() {
		return unit_id;
	}

	public void setUnit_id(int unit_id) {
		this.unit_id = unit_id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getUnit_incharge() {
		return unit_incharge;
	}

	public void setUnit_incharge(String unit_incharge) {
		this.unit_incharge = unit_incharge;
	}

	public String getEmployee_id_unit_incharge() {
		return employee_id_unit_incharge;
	}

	public void setEmployee_id_unit_incharge(String employee_id_unit_incharge) {
		this.employee_id_unit_incharge = employee_id_unit_incharge;
	}

	public int getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(int department_id) {
		this.department_id = department_id;
	}
	
	
}
