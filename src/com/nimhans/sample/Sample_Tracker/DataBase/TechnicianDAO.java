package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Technician;

public class TechnicianDAO extends Database{
	
	public int getTechnicianIdByName(String technicianName){
		try {
			String query="select technician_id from technician where technician_name ='"+technicianName+"';";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				return rs.getInt("technician_id");
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public int getAssistantIdByName(String assistantName){
			
			try {
				String query="select technician_id from technician where technician_name ='"+assistantName+"';";
				Statement stmt = conn.createStatement();
				System.out.println(query);
				ResultSet rs= stmt.executeQuery(query);
				while(rs.next()){
					return rs.getInt("technician_id");
				}
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
			
			
			return 0;
		}

	
	public List<Technician> getAllTechnicians(){
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Technician technician = new Technician(rs.getString("technician_name"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	public List<Technician>getTechnicianForReceiving(int stationId){
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Technician technician = new Technician(rs.getString("technician_name"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	public List<Technician>getTechnicianForReceiving(){
		List<Technician> technicians=new ArrayList<>();
		try {
			//String query="select * from technician where roles = 'technician' or roles='admin' or roles= 'faculty' or roles='resident' ORDER BY technician.technician_id ASC;";
			String query="select * from technician where roles = 'technician' or roles='admin' or roles= 'faculty' or roles='resident' or roles='office' ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				
				 technicians.add(technician);
				 
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	public List<Technician>getTechnicianForGrossing(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles='resident' or roles ='technician' or roles='admin' or roles='faculty'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians ;
		//return technicians;
	}

	public List<Technician>getTechnicianForEmbedding(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='technician' or roles='admin'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	public List<Technician>getTechnicianForSectioning(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='technician' or roles='admin'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}

	public List<Technician>getTechnicianForStaining(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='technician' or roles='admin' ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	
	public List<Technician>getTechnicianForReporting(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='faculty' or roles='resident'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	public List<Technician>getTechnicianForVerification(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='faculty' or roles='resident'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	
	public List<Technician>getTechnicianForTyping(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='office'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	
	public List<Technician>getTechnicianForDispatch(){
		System.out.println("inside tech dao ");
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles ='office'  ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				Technician technician = new Technician(rs.getString("technician_name"),rs.getString("roles"),rs.getInt("technician_id"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
	}
	
	/*  *******************   Fetching By Roles    ******************************  */
	public List<Technician>getResidentByRole(String role){
		System.out.println("from technician by role ");
		
		List<Technician> technicians=new ArrayList<>();
		try {
			String query="select * from technician where roles= '"+role+"' ORDER BY technician.technician_id ASC;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				//System.out.println("   technician " + rs.getString("technician_name") + " roles "+rs.getString("roles"));
				
				Technician technician = new Technician(rs.getString("technician_name"));
				 technicians.add(technician);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return technicians;
		
	}
}
