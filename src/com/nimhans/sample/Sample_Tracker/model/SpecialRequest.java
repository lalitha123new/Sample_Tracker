package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class SpecialRequest {
	
	private String npNumber;
	private String special_stain;
	private String notes;
	private int assetId;
	private int done;
	private String ihc;
	private int process_all;
	private int process_more;
	private int em;
	private String block_others;
	private String createdAt;
	private int special_request_id;
	
	
	
	

	


	


	public SpecialRequest(String special_stain, String notes, int assetId, int done,String npNumber,String ihc,int process_all,int em,int process_more,String block_others,String createdAt,int special_request_id) {
		super();
		this.special_stain = special_stain;
		this.notes = notes;
		this.assetId = assetId;
		this.done = done;
		this.npNumber = npNumber;
		this.ihc = ihc;
		this.process_all = process_all;
		this.em = em;
		this.process_more = process_more;
		this.block_others = block_others;
		this.createdAt = createdAt;
		this.special_request_id = special_request_id;
	}
	
	
	public SpecialRequest(String npNumber,int process_all,int em,String ihc,String special_stain,String notes, int assetId, int done,String block_others,String createdAt,int special_request_id) {
		super();
		this.npNumber = npNumber;
		this.process_all = process_all;
		this.em = em;
		this.ihc = ihc;
		this.special_stain = special_stain;
		this.notes = notes;
		this.assetId = assetId;
		this.done = done;
		this.block_others = block_others;
		this.createdAt = createdAt;
		this.special_request_id = special_request_id;
	}
	
	public SpecialRequest() {
		super();
	}
	public String getSpecial_stain() {
		return special_stain;
	}
	public void setSpecial_stain(String special_stain) {
		this.special_stain = special_stain;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public int getAssetId() {
		return assetId;
	}
	public String getNpNumber(){
		return npNumber;
	}
	public void setNpNumber(String npNumber){
		this.npNumber=npNumber;
	}
	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}
	public int getDone() {
		return done;
	}
	public void setDone(int done) {
		this.done = done;
	}
	public String getIhc(){
		return ihc;
	}
	public void setIhc(String ihc){
		this.ihc = ihc;
	}
	public void setProcess_all(int process_all) {
		this.process_all = process_all;
	}
	public int getProcess_all() {
		return process_all;
	}
	public void setEm(int em) {
		this.em = em;
	}
	public int getEm() {
		return em;
	}
	
	public int getProcess_more() {
		return process_more;
	}


	public void setProcess_more(int process_more) {
		this.process_more = process_more;
	}
	
	public String getBlock_others() {
		return block_others;
	}


	public void setBlock_others(String block_others) {
		this.block_others = block_others;
	}

	public String getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
	public int getSpecial_request_id() {
		return special_request_id;
	}


	public void setSpecial_request_id(int special_request_id) {
		this.special_request_id = special_request_id;
	}
	
}
