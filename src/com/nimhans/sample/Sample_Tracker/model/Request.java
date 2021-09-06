package com.nimhans.sample.Sample_Tracker.model;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Request {
	
	private String sampleRequestId;
	private String npBase;
	private String UHID;
	private String surgeon;
	private String patientName;
	private int patientSex;
	private String patientAge;
	private int requestId;
	private String created;
	private String status;
	
	private String unit_name;
	private String department_name;
	private int assetId;
	private String biopsy;
	private int currentState;
	public int getCurrentState() {
		return currentState;
	}


	public void setCurrentState(int currentState) {
		this.currentState = currentState;
	}


	public int getNextState() {
		return nextState;
	}


	public void setNextState(int nextState) {
		this.nextState = nextState;
	}
	private int nextState;
	
	
	public String getBiopsy() {
		return biopsy;
	}


	public void setBiopsy(String biopsy) {
		this.biopsy = biopsy;
	}


	public int getAssetId() {
		return assetId;
	}


	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}


	public String getDepartment_name() {
		return department_name;
	}


	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}


	public String getUnit_name() {
		return unit_name;
	}


	public void setUnit_name(String unit_name) {
		this.unit_name = unit_name;
	}


//	public Request(String sampleRequestId, String npBase, String uHID, String surgeon, String patientName,
//			int patientSex, String patientAge, int requestId 
//			,String created) {
//		super();
//		this.sampleRequestId = sampleRequestId;
//		this.npBase = npBase;
//		UHID = uHID;
//		this.surgeon = surgeon;
//		this.patientName = patientName;
//		this.patientSex = patientSex;
//		this.patientAge = patientAge;
//		this.requestId = requestId;
//		this.created = created;
//		
//	}
//	
	public Request(String sampleRequestId, String npBase, String uHID, String surgeon, String patientName,
			int patientSex, String patientAge, int requestId 
			,String created,String unit_name,String department_name) {
		super();
		this.sampleRequestId = sampleRequestId;
		this.npBase = npBase;
		UHID = uHID;
		this.surgeon = surgeon;
		this.patientName = patientName;
		this.patientSex = patientSex;
		this.patientAge = patientAge;
		this.requestId = requestId;
		this.created = created;
		this.unit_name =unit_name;
		this.department_name =department_name;
	}
	public Request(String sampleRequestId, String npBase, String uHID, String surgeon, String patientName,
			int patientSex, String patientAge, int requestId 
			,String created,String unit_name,String department_name,int asset_id,String biopsy,int currentState,int nextState) {
		super();
		this.sampleRequestId = sampleRequestId;
		this.npBase = npBase;
		UHID = uHID;
		this.surgeon = surgeon;
		this.patientName = patientName;
		this.patientSex = patientSex;
		this.patientAge = patientAge;
		this.requestId = requestId;
		this.created = created;
		this.unit_name =unit_name;
		this.department_name =department_name;
		this.assetId = asset_id;
		this.biopsy = biopsy;
		this.currentState = currentState;
		this.nextState = nextState;
	}
	

	public Request(){
		super();
	}
	
	public int getRequestId() {
		return this.requestId;
	}
	public void setRequestId(int requestId) {
		
		this.requestId = requestId;
	}
	public void setStatus(String status){
		
		this.status = status; 
		
	}
   public String getStatus(){
		
		return status;
		
	}
	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public int getPatientSex() {
		return patientSex;
	}

	public void setPatientSex(int patientSex) {
		this.patientSex = patientSex;
	}

	public String getPatientAge() {
		return patientAge;
	}

	public void setPatientAge(String patientAge) {
		this.patientAge = patientAge;
	}

	public String getSampleRequestId() {
		return this.sampleRequestId;
	}
	public void setSampleRequestId(String sampleRequestId) {
		this.sampleRequestId = sampleRequestId;
	}
	public String getUHID() {
		return this.UHID;
	}
	public void setUHID(String uHID) {
		System.out.println("wfsf"+uHID);
		this.UHID = uHID;
	}
	public String getSurgeon() {
		return this.surgeon;
	}
	public void setSurgeon(String surgeon) {
		this.surgeon = surgeon;
	}
	
	public String getNpBase() {
		return npBase;
	}

	public void setNpBase(String npBase) {
		this.npBase = npBase;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getCreated() {
		return created;
	}
}
