package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NpMessage {

	
	private int np_message_id;
	private String asset_number;	
	private int rec_station_id;	
	private int send_station_id;	
	private String message;
	private int user_id;
	private String createdAt;
	private int read_flag;
	
	
	public int getRead_flag() {
		return read_flag;
	}

	public void setRead_flag(int read_flag) {
		this.read_flag = read_flag;
	}

	public int getNp_message_id() {
		return np_message_id;
	}

	public void setNp_message_id(int np_message_id) {
		this.np_message_id = np_message_id;
	}

	public String getAsset_number() {
		return asset_number;
	}

	public void setAsset_number(String asset_number) {
		this.asset_number = asset_number;
	}

	public int getRec_station_id() {
		return rec_station_id;
	}

	public void setRec_station_id(int rec_station_id) {
		this.rec_station_id = rec_station_id;
	}

	public int getSend_station_id() {
		return send_station_id;
	}

	public void setSend_station_id(int send_station_id) {
		this.send_station_id = send_station_id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
	
	public NpMessage(){}
	
	public NpMessage(int np_message_id, String asset_number, int rec_station_id,
			int send_station_id, String message,int user_id,String createdAt,int read_flag) {
		super();
		this.np_message_id = np_message_id;
		this.asset_number= asset_number;
		this.rec_station_id= rec_station_id;	
		this.send_station_id= send_station_id;
		this.message= message;
		this.user_id= user_id;
		this.createdAt= createdAt;
		this.read_flag=read_flag;
		
	}
}
