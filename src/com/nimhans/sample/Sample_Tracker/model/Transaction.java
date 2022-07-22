package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Transaction {

	private int transactionId;
	private int technicianId;
	private int stationId;
	private int assetId;
	private String npNumber;
	private String startTime;
	private String endTime;
	private int assistantId;
	private int ncs;
	private int special;
	private String biopsy;
	private int type;
	private String process_status;
	
	
	public Transaction(int technicianId, int stationId, String npNumber,int assistantId) {
		super();
		this.technicianId = technicianId;
		this.stationId = stationId;
		this.npNumber = npNumber;
		this.assistantId = assistantId;
	}
	public Transaction(int technicianId, int stationId, String npNumber,int assistantId,String startTime,String endTime) {
		super();
		this.technicianId = technicianId;
		this.stationId = stationId;
		this.npNumber = npNumber;
		this.startTime = startTime;
		this.endTime = endTime;
		this.assistantId = assistantId;
	}
	public Transaction(String npNumber,String endTime,String startTime,int ncs,int special,int technicianId,int assistantId,int stationId,String biopsy,int type,String process_status) {
		super();
		this.npNumber = npNumber;
		this.endTime = endTime;
		this.startTime=startTime;
		this.ncs = ncs;
		this.special = special;
		this.assistantId = assistantId;
		this.technicianId = technicianId;
		this.stationId = stationId;
		this.biopsy = biopsy;
		this.type = type;
		this.process_status = process_status;
	}

	public Transaction() {
		super();
	}
	
	public int getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}
	public int getTechnicianId() {
		return technicianId;
	}
	public int getAssistantId() {
		return assistantId;
	}
	public void setTechnicianId(int technicianId) {
		this.technicianId = technicianId;
	}
	public void setAssistantId(int assistantId) {
		this.assistantId = assistantId;
	}
	public int getStationId() {
		return stationId;
	}
	public String getNpNumber() {
		return npNumber;
	}

	public void setNpNumber(String npBase) {
		this.npNumber = npBase;
	}

	public void setStationId(int stationId) {
		this.stationId = stationId;
	}
	public int getAssetId() {
		return assetId;
	}
	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public int getNcs() {
		return ncs;
	}
	public void setNcs(int ncs) {
		this.ncs= ncs;
	}
	public int getSpecial() {
		return special;
	}
	public void setSpecial(int special) {
		this.special= special;
	}
	public String getBiopsy() {
		return biopsy;
	}
	public void setBiopsy(String biopsy) {
		this.biopsy = biopsy;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getProcess_status() {
		return process_status;
	}
	public void setProcess_status(String process_status) {
		this.process_status = process_status;
	}

}
