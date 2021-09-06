package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.io.*;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.service.AssetService;


public class LoginDAO extends Database{
	
	public Boolean loginValidate(String username,String password){
	
		System.out.println("inside query fetching method");
		boolean flag=true;
		
		System.out.println(username);
		System.out.println(password);
		
		try{
			String query="select technician_name,password from technician where technician_name='"+username+"' and password='"+password+"'";		
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
	
	public int loginValidateDoctor(String username,String password,String role){
		
		System.out.println("inside query fetching method");
		boolean flag=true;
		
		System.out.println(username);
		System.out.println(password);
		int technician_id1=0;
		
		try{
			String query="select technician_name,password,technician_id from technician where technician_name='"+username+"' and password='"+password+"' and roles='"+role+"' ";		
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			 if (rs.next()) {
	                System.out.println("Correct login credentials");
	                //flag=true;
	                technician_id1=rs.getInt("technician_id");
	                
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
		 return technician_id1;
	 }
	 else{
		 return technician_id1 ;
	 }
	}
}
