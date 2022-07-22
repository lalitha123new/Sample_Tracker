package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Patient {

	private String UHID;
	private String patientName;
	private int age;
	private String sex;
	private String sampleRequestId;
	private String npBase;
	private int external;
	private String surgeon;
	private String entryTime;
	private String mrd;
	private String hospital;
	private String departmentName;
	private String unitName;
	private String uniqueNpBase;
	
	public Patient() {
		super();
	}
	
	public Patient(String uHID, String patientName, int age, String sex, String sampleRequestId,
			String surgeon, String entryTime, String mrd, String hospital, String departmentName, String unitName) {
		super();
		UHID = uHID;
		this.patientName = patientName;
		this.age = age;
		this.sex = sex;
		this.sampleRequestId = sampleRequestId;
		this.external = 0;
		this.surgeon = surgeon;
		this.entryTime = entryTime;
		this.mrd = mrd;
		this.hospital = hospital;
		this.departmentName = departmentName;
		this.unitName = unitName;
	}

	public int getExternal() {
		return external;
	}

	public String getEntryTime() {
		return entryTime;
	}

	public void setEntryTime(String entryTime) {
		this.entryTime = entryTime;
	}

	public String getMrd() {
		return mrd;
	}

	public void setMrd(String mrd) {
		this.mrd = mrd;
	}

	public String getHospital() {
		return hospital;
	}

	public void setHospital(String hospital) {
		this.hospital = hospital;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getSurgeon() {
		return surgeon;
	}

	public void setSurgeon(String surgeon) {
		this.surgeon = surgeon;
	}

	public void setExternal(int external) {
		this.external = external;
	}

	public String getSampleRequestId() {
		return sampleRequestId;
	}
	public void setSampleRequestId(String sampleRequestId) {
		this.sampleRequestId = sampleRequestId;
	}

	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getUHID() {
		return UHID;
	}

	public void setUHID(String uHID) {
		UHID = uHID;
	}

	public String getNpBase() {
		return npBase;
	}

	public void setNpBase(String npBase) {
		this.npBase = npBase;
	}

	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getUniqueNpBase() {
		return uniqueNpBase;
	}

	public void setUniqueNpBase(String npBase) {
		this.uniqueNpBase = npBase;
	}
	
}
