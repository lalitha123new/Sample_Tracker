package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.NpMessage;
import com.nimhans.sample.Sample_Tracker.model.SpecialRequest;

public class NpMessageDAO extends Database{
	
	
	public void addNpmessage(NpMessage npMessage)
	{
		String query = "INSERT INTO `np_message` (`asset_number`, `rec_station_id`, `send_station_id`, `message`, `user_id`) VALUES (?,?,?,?,?)";
		PreparedStatement preparedStatement;
		
		try {
			preparedStatement = conn.prepareStatement(query);
			preparedStatement.setString(1,npMessage.getAsset_number());
			preparedStatement.setInt(2, npMessage.getRec_station_id());
			preparedStatement.setInt(3, npMessage.getSend_station_id());
			preparedStatement.setString(4, npMessage.getMessage());
			preparedStatement.setInt(5, npMessage.getUser_id());
			boolean result = preparedStatement.execute();

		} catch (SQLException e){
			e.printStackTrace();
		}
	}
	
	
	//get All np messages
	public List<NpMessage> getAllnpmessages(String npNumber){
		List<NpMessage> npmessage=new ArrayList<>();
		String responseQuery = "SELECT * FROM `np_message` WHERE `asset_number` LIKE '"+npNumber+"%';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next()){
				System.out.println(rs.getString("message"));
				NpMessage NpMessage1 = new NpMessage(rs.getInt("np_message_id"),
						rs.getString("asset_number"), 
						rs.getInt("rec_station_id"),
						rs.getInt("send_station_id"),
						rs.getString("message"),
						rs.getInt("user_id"),
						rs.getString("createdAt"),
						rs.getInt("read_flag"));
				 npmessage.add(NpMessage1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return npmessage;
	}
	
	//get All without fail np messages
		public List<NpMessage> getAllnpmessages1(int rec_station_id){
			List<NpMessage> npmessage=new ArrayList<>();
			String responseQuery = "SELECT * FROM `np_message` where `rec_station_id`="+rec_station_id+" ORDER BY `read_flag` DESC";
			System.out.println(responseQuery);
			Statement stmt;
			try {
				stmt = conn.createStatement();
				ResultSet rs= stmt.executeQuery(responseQuery);
				while(rs.next()){
					System.out.println(rs.getString("message"));
					NpMessage NpMessage1 = new NpMessage(rs.getInt("np_message_id"),
							rs.getString("asset_number"), 
							rs.getInt("rec_station_id"),
							rs.getInt("send_station_id"),
							rs.getString("message"),
							rs.getInt("user_id"),
							rs.getString("createdAt"),
							rs.getInt("read_flag"));
					 npmessage.add(NpMessage1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return npmessage;
		}
	
	
	
	   //get All np messages by all
		public List<NpMessage> getAllnpmessagesByAll(String npNumber,int stn_id){
			List<NpMessage> npmessage=new ArrayList<>();
			String responseQuery = "SELECT * FROM `np_message` WHERE rec_station_id="+stn_id+" and `asset_number` LIKE '%"+npNumber+"%';";
			System.out.println("97--"+responseQuery);
			Statement stmt;
			try {
				stmt = conn.createStatement();
				ResultSet rs= stmt.executeQuery(responseQuery);
				while(rs.next()){
					System.out.println(rs.getString("message"));
					NpMessage NpMessage1 = new NpMessage(rs.getInt("np_message_id"),
							rs.getString("asset_number"), 
							rs.getInt("rec_station_id"),
							rs.getInt("send_station_id"),
							rs.getString("message"),
							rs.getInt("user_id"),
							rs.getString("createdAt"),
							rs.getInt("read_flag"));
					 npmessage.add(NpMessage1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return npmessage;
		}
		
	
	public int getNpmessageCount(int station_id) {
		// SELECT COUNT(*) FROM `np_message` WHERE `rec_station_id`=6
		int count=0;
		String responseQuery ="SELECT COUNT(*) as count FROM `np_message` WHERE `read_flag`= 0 and `rec_station_id`= "+station_id;
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			
			while(rs.next()){
				
				count = rs.getInt("count");	 
				 
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return count; 
	}


	public int makeReadmessage(int np_message_id) {
		
		String responseQuery = "UPDATE `np_message` SET `read_flag` = '1' WHERE  `np_message_id` ="+np_message_id;
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return 1;
     }
	
}
