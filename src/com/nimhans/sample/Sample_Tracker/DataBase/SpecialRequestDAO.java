package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.SpecialRequest;

public class SpecialRequestDAO extends Database{
	
	public void addSpecialRequest(SpecialRequest specialRequest)
	{
		String query = "insert into special_request(asset_id,special_stain,notes,np_number,ihc,process_all,em,process_more,block_others) values (?,?,?,?,?,?,?,?,?);";
		PreparedStatement preparedStatement;
		try {
			preparedStatement = conn.prepareStatement(query);
			preparedStatement.setInt(1, specialRequest.getAssetId());
			preparedStatement.setString(2,specialRequest.getSpecial_stain());
			preparedStatement.setString(3, specialRequest.getNotes());
			preparedStatement.setString(4, specialRequest.getNpNumber());
			preparedStatement.setString(5, specialRequest.getIhc());
			preparedStatement.setInt(6, specialRequest.getProcess_all());
			preparedStatement.setInt(7, specialRequest.getEm());
			preparedStatement.setInt(8, specialRequest.getProcess_more());
			preparedStatement.setString(9, specialRequest.getBlock_others());
			preparedStatement.execute();
		} catch (SQLException e){
			e.printStackTrace();
		}
	}
	
	public List<SpecialRequest> getSpecialRequest(String npNumber){
		List<SpecialRequest> SpecialRequests=new ArrayList<>();
		String responseQuery = "select * from special_request where np_number ='"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next()){
				 SpecialRequest specialRequest = new SpecialRequest(rs.getString("special_stain"),rs.getString("notes"),rs.getInt("asset_id"),rs.getInt("done"),rs.getString("np_number"),rs.getString("ihc"),rs.getInt("process_all"),rs.getInt("em"),rs.getInt("process_more"),rs.getString("block_others"),rs.getString("createdAt"),rs.getInt("special_request_id"));
				 SpecialRequests.add(specialRequest);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return SpecialRequests;
	}
	
	public List<SpecialRequest> getSpecialRequest1(String npNumber){
		List<SpecialRequest> SpecialRequests=new ArrayList<>();
		
		System.out.println("hello --- "+npNumber);
		//String responseQuery = "select * from special_request where np_number ='"+npNumber+"';";
		String responseQuery ="SELECT * FROM `special_request` WHERE `np_number` LIKE '"+npNumber+"' ORDER BY `np_number` DESC";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next()){
				 SpecialRequest specialRequest = new SpecialRequest(rs.getString("special_stain"),rs.getString("notes"),rs.getInt("asset_id"),rs.getInt("done"),rs.getString("np_number"),rs.getString("ihc"),rs.getInt("process_all"),rs.getInt("em"),rs.getInt("process_more"),rs.getString("block_others"),rs.getString("createdAt"),rs.getInt("special_request_id"));
				 SpecialRequests.add(specialRequest);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return SpecialRequests;
	}
	
	public int makeSpecialRequest1(int special_request_id){
		
		String responseQuery = "UPDATE `special_request` SET `done` = '1' WHERE `special_request`.`special_request_id` = "+special_request_id;
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
