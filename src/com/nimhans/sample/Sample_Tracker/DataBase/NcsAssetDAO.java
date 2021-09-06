package com.nimhans.sample.Sample_Tracker.DataBase;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.NpUpload;
import com.nimhans.sample.Sample_Tracker.model.Technician;
import com.nimhans.sample.Sample_Tracker.model.Unit;

public class NcsAssetDAO extends Database{

	public void addNcsAsset(Asset asset){
		String query2 = "insert into ncs_asset(np_number,corrective,preventive,faculty,ncs_type,technician_name) values (?,?,?,?,?,?);";
		System.out.println(query2);
		PreparedStatement preparedStatement2;
		try {
			preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
			preparedStatement2.setString(1,asset.getNpNumber());
			preparedStatement2.setString(2, asset.getCorrective());
			preparedStatement2.setString(3, asset.getPreventive());
			preparedStatement2.setString(4, asset.getFaculty());
			preparedStatement2.setString(5, asset.getNcsType());
			preparedStatement2.setString(6, asset.getTechnician_name());
			preparedStatement2.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void deleteNcsAsset(String npNumber){
		//delete asset from assetTable
		String responseQuery = "delete from ncs_asset where np_number = '"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void updateNcsAsset(String npNumber,String corrective , String preventive,String faculty,String ncsType){
		String responseQuery = "update ncs_asset set preventive='"+preventive+"',corrective='"+corrective+"',faculty='"+faculty+"',ncs_type='"+ncsType+"' where np_number ='"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void addNcsTagToAsset(String npNumber){
		
		String responseQuery = "update asset set ncs = 1 where np_number ='"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void removeNcsTagToAsset(String npNumber){
		
		String responseQuery = "update asset set ncs = 0 where np_number ='"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public List<Asset> getAllNcsAssets(String npBaseNumber){
		List<Asset> assets=new ArrayList<>();
		try {

			String query="select * from ncs_asset where np_number  like'"+npBaseNumber+"%';";
			Statement stmt = conn.createStatement();
			System.out.println("ncsDAO  "+query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Asset asset =  new Asset(rs.getString("np_number"),rs.getString("corrective"),rs.getString("preventive"),rs.getString("faculty"),rs.getString("ncs_type"),rs.getString("technician_name"));	
				assets.add(asset);	
			}
		}
		
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}
	
	//NpUpload
	public List<NpUpload> getlistofimage(String npbase)  {
		// TODO Auto-generated method stub
		List<NpUpload> nu1= new ArrayList<>();
		try {
		String q="SELECT * FROM np_upload where np_base like '"+npbase+"%';";
		System.out.println(q);
		Statement stmt = conn.createStatement();
		ResultSet rs= stmt.executeQuery(q);
		while(rs.next()){
			
		   NpUpload nu = new NpUpload(rs.getInt("np_upload_id"),rs.getString("np_base"),rs.getString("upload_path"));
			nu1.add(nu);
			//return nu1;
		}
		return nu1;
		}catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	
	
	
	public List <Asset> getAllCases(){
		List<Asset> assetss = new ArrayList<>();
		try {

			String query="select * FROM asset LEFT JOIN special_request ON asset.np_number=special_request.np_number";
			Statement stmt = conn.createStatement();
			System.out.println("ncsDAO  "+query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				Asset asset = new Asset(rs.getString("specimen"),rs.getString("special_stain"),rs.getInt("asset_id"),rs.getString("ihc"),rs.getString("np_number"),rs.getInt("current_state"),
						rs.getInt("next_state"),rs.getString("fixative"),rs.getString("biopsy_type"),rs.getInt("asset_type"),
						rs.getString("review"),rs.getInt("special"),rs.getInt("ncs"),rs.getString("process_status"),
						rs.getString("notes"),rs.getInt("done"),rs.getInt("process_all"),rs.getInt("em"));
				System.out.println("Hello - " + rs.getString("asset_id"));
				assetss.add(asset);
			}
			
		}
		
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assetss;
	}
	//get user data
	public List <Technician> getAllusers(){
		List<Technician> Technician1 = new ArrayList<>();
		try {

			String query="SELECT * FROM `technician`";
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				Technician technician = new Technician(rs.getInt("technician_id"),rs.getString("technician_name"),rs.getString("password"),rs.getString("roles"));
				Technician1.add(technician);
			}
			
		}
		
		catch (SQLException e) {
			e.printStackTrace();
		}
		return Technician1;
	}
	
	
	
	public List<Asset> getNcsAsset(String npBaseNumber){
		try {
			System.out.println(npBaseNumber);
			
			List<Asset> ncasset = new ArrayList<Asset>();			
			String query="select * from ncs_asset where np_number like '"+npBaseNumber+"%';";
			System.out.println("ncsDAO  "+query);
			
			Statement stmt = conn.createStatement();
			System.out.println("ncsDAO  "+query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Asset a1= new Asset(rs.getString("np_number"),rs.getString("corrective"),rs.getString("preventive"),rs.getString("faculty"),rs.getString("ncs_type"),rs.getString("technician_name"));
				//return  new Asset(rs.getString("np_number"),rs.getString("corrective"),rs.getString("preventive"),rs.getString("faculty"),rs.getString("ncs_type"),rs.getString("technician_name"));	
				ncasset.add(a1);
			}
			return ncasset;
		}
		
		catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Unit> getAllunits() {
		// TODO Auto-generated method stub
		List<Unit> unit1 = new ArrayList<>();
		try {

			String query="SELECT * FROM `unit`";
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				Unit unit2 = new Unit(rs.getInt("unit_id"),rs.getString("unit"),rs.getInt("department_id"));
				unit1.add(unit2);
			}
			
		}
		
		catch (SQLException e) {
			e.printStackTrace();
		}
		//return Technician1;
		
		
		
		
		return unit1;
	}
	public String deleteUploadfilefile(int np_upload_id) {
		// TODO Auto-generated method stub
		try {
			String q="SELECT * FROM np_upload where np_upload_id = "+np_upload_id;
			System.out.println(q);
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(q);
			if(rs.next()){
				//DELETE FROM `np_upload` WHERE `np_upload`.`np_upload_id` = 3
				String q1="DELETE FROM `np_upload` WHERE `np_upload`.`np_upload_id` = "+np_upload_id;
				System.out.println(q1);
				Statement stmt1 = conn.createStatement();
				boolean rs1= stmt1.execute(q1);
				System.out.println("hello "+rs1);
				if(rs1) {
					
					return "0";
					
				}else {
					return ""+np_upload_id;
					
				}
				
				//failed to write delete file
//				String filePath = com.nimhans.sample.Sample_Tracker.globals.Path.uploadPdf;
//				String file_path= filePath+rs.getString("upload_path");
//			   
//				System.out.println("Deleted the 1file: " + file_path);
//				File myObj = new File(file_path); 
//				
//				//Path fp = myObj.toPath();
//				//Files.delete(fp);
//			    if (myObj.delete()) { 
//			      System.out.println("Deleted the file: " + myObj.getName());
//			      return "np_upload_id";
//			    } else {
//			      System.out.println("Failed to delete the file.");
//			    } 
//				
//				
//				return "0";
			}
			
			}catch (SQLException e) {
				e.printStackTrace();
			} 
			
			
		
		return "0";
	}
}
