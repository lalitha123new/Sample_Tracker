package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NpUpload {

	private int np_upload_id;
	private String np_base;
	private String upload_path;
	
	
	
	public int getNp_upload_id() {
		return np_upload_id;
	}
	public void setNp_upload_id(int np_upload_id) {
		this.np_upload_id = np_upload_id;
	}
	public String getNp_base() {
		return np_base;
	}
	public void setNp_base(String np_base) {
		this.np_base = np_base;
	}
	public String getUpload_path() {
		return upload_path;
	}
	public void setUpload_path(String upload_path) {
		this.upload_path = upload_path;
	}
	
	public NpUpload(){}
	
	public NpUpload(int np_upload_id, String np_base, String upload_path) {
		super();
		this.np_upload_id = np_upload_id;
		this.np_base = np_base;
		this.upload_path = upload_path;
		
	}
}
