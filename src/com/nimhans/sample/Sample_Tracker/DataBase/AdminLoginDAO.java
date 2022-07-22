package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.io.*;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.service.AssetService;


public class AdminLoginDAO extends Database{
	
	public Boolean loginValidate(String username,String password){
	
		System.out.println("inside query fetching method");
		boolean flag=true;
		
		try{
			String query="select admin_user_name,admin_password from su_admin where admin_user_name='"+username+"' and admin_password='"+password+"'";		
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			 if (rs.next()) {
	                System.out.println("Correct login credentials");
	                flag=true;
	            } 
	            else {
	                System.out.println("Incorrect login credentials");
	                flag=false;
	            }
			
		
		}
		catch(SQLException e){
			e.printStackTrace();
		}
			
		
		
		
	 if(flag){
		 System.out.println(flag);
		 return true;
	 }
	 else{
		 return false ;
	 }
	}	
	
	//deleteNpnumber functionality...
	public int deleteNpNumber(String npNumber) throws SQLException{
		//DELETE FROM `asset` WHERE `np_number` like "X2213/19%";
		//DELETE FROM `ncs_asset` WHERE `np_number` LIKE "X2213/19%";
		//DELETE FROM `request` WHERE `np_base` LIKE "X2213/19%";
		//DELETE FROM `transaction` WHERE `np_number` LIKE "X2213/19%"; 
		  int responce1=1;
		  String query = "DELETE FROM `asset` WHERE `np_number` like ?";
		  PreparedStatement preparedStmt = conn.prepareStatement(query);
		  preparedStmt.setString(1,npNumber+"%");
	      boolean res1 = preparedStmt.execute();
	     
		  String query1 = "DELETE FROM `ncs_asset` WHERE `np_number` LIKE ?";
		  PreparedStatement preparedStmt1 = conn.prepareStatement(query1);
		  preparedStmt1.setString(1,npNumber+"%");
		  boolean res2 =preparedStmt1.execute();
		  
		  String query2 = "DELETE FROM `request` WHERE `np_base` LIKE ?";
		  PreparedStatement preparedStmt2 = conn.prepareStatement(query2);
		  preparedStmt2.setString(1,npNumber+"%");
		  boolean res3 =preparedStmt2.execute();
		  
		  String query3 = "DELETE FROM `transaction` WHERE `np_number` LIKE ?";
	      PreparedStatement preparedStmt3 = conn.prepareStatement(query3);
	      preparedStmt3.setString(1,npNumber+"%");
	      boolean res4 = preparedStmt3.execute();
	    /*  if(res1 && res2 && res3 && res4) {
	    	  
	    	  System.out.println("all deleted");
	    	  responce1=1;
	    	  
	      }else {
	    	  
	    	  System.out.println("all  not deleted");
	    	  responce1=0;
	      }*/
	      
		return responce1;
	      
		
	}
	
	
}
