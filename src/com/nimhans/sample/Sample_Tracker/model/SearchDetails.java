package com.nimhans.sample.Sample_Tracker.model;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SearchDetails {
	
	protected String patientName;
	protected int age1;
	protected int age2;
	protected int gender;
	protected String date1;
	protected String date2;
	protected String specimen;
	protected String fixative;
	protected String biopsy;
	protected String finalImpression;
	protected String station_id;
	
	protected String doctorNmae;
	
	
	
	public String getDoctorNmae() {
		return doctorNmae;
	}


	public void setDoctorNmae(String doctorNmae) {
		this.doctorNmae = doctorNmae;
	}


	public String getPatientName() {
		return patientName;
	}


	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}


	public int getAge1() {
		return age1;
	}


	public void setAge1(int age1) {
		this.age1 = age1;
	}


	public int getAge2() {
		return age2;
	}


	public void setAge2(int age2) {
		this.age2 = age2;
	}


	public int getGender() {
		return gender;
	}


	public void setGender(int gender) {
		this.gender = gender;
	}


	public String getDate1() {
		return date1;
	}


	public void setDate1(String date1) {
		this.date1 = date1;
	}


	public String getDate2() {
		return date2;
	}


	public void setDate2(String date2) {
		this.date2 = date2;
	}


	public String getSpecimen() {
		return specimen;
	}


	public void setSpecimen(String specimen) {
		this.specimen = specimen;
	}


	public String getFixative() {
		return fixative;
	}


	public void setFixative(String fixative) {
		this.fixative = fixative;
	}


	public String getBiopsy() {
		return biopsy;
	}


	public void setBiopsy(String biopsy) {
		this.biopsy = biopsy;
	}


	public String getFinalImpression() {
		return finalImpression;
	}


	public void setFinalImpression(String finalImpression) {
		this.finalImpression = finalImpression;
	}


	public String getStation_id() {
		return station_id;
	}


	public void setStation_id(String station_id) {
		this.station_id = station_id;
	}
	


	//CONSTRUCTORS
	public SearchDetails(){}
	

	public SearchDetails(String patientName,int age1,int age2,int gender,String date1,String date2,String specimen,String biopsy,String finalImpression,String station_id,String fixative,String doctorNmae) {
		super();
		this.patientName = patientName;
		this.age1 = age1;
		this.age2 = age2;
		this.gender = gender;
		this.date1 = date1;
		this.date2 = date2;
		this.specimen = specimen;
		this.biopsy = biopsy;
		this.finalImpression = finalImpression;
		this.station_id = station_id;
		this.fixative = fixative;
		this.doctorNmae = doctorNmae;
		
	}
  
	
}
