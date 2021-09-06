package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Request;

public class DoctorDAO extends Database {
	
	public List doctorList(){
		
		List surgons = new ArrayList<>();
		String query = "select * FROM request";
		Statement stmt;
		try {	
			stmt = conn.createStatement();
			//System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()){
				
				String  surgon  = rs.getString("surgeon");
				if(!surgons.contains(surgon)){
					if(!(surgon==null||surgon.equals("")))
					surgons.add(surgon);	
					}	
			}
			
			//System.out.println(surgons);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	return surgons;	
	}
	
public List unitList(){
		
		List units_list = new ArrayList<>();
		String query = "SELECT `technician_name` as technician_name1 FROM `technician` where `roles`= "+"'nimhans_unit'";
		Statement stmt;
		try {	
			stmt = conn.createStatement();
			//System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()){
				
				String  unit  = rs.getString("technician_name1");
				if(!units_list.contains(unit)){
					if(!(unit==null||unit.equals("")))
						units_list.add(unit);	
					}	
			}
			
			//System.out.println(surgons);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	return units_list;	
	}
	
	
	
	
	
	public List<Request> doctorDetails(String doctorname){
		
		List<Request> requests = new ArrayList<>();
		String query = "SELECT * FROM request WHERE surgeon='"+doctorname+"' order by created desc;";
		Statement stmt;
		try {	
			stmt = conn.createStatement();
			//System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()){					
				Request request = new Request(rs.getString("sample_request_id"),rs.getString("np_base"),rs.getString("uhid"),						
						rs.getString("surgeon"),rs.getString("patient_name"),rs.getInt("patient_sex"),rs.getString("patient_age"),
						rs.getInt("request_id"),rs.getString("created"),rs.getString("unit_name"),rs.getString("department_name"));
				requests.add(request);
			}			
			//System.out.println(doctor);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	return requests;
		
		
	}
	
	
	//units details
public List<Request> unitDetails(String unit_id){
		int unit_r_id=0;
	    String query1 = "SELECT `unit_id` FROM `unit_user_mapping` WHERE `technician_id` = "+unit_id;
	    Statement stmt1;
	    try {
	    	stmt1 = conn.createStatement();
	    	ResultSet rs1 = stmt1.executeQuery(query1);
	    	
			if(rs1.next()){	
				
				unit_r_id=	rs1.getInt("unit_id");
			}
	    }catch (SQLException e) {
			e.printStackTrace();
		}
		
	
	
		List<Request> requests = new ArrayList<>();
		String query = "SELECT * FROM request WHERE unit_id='"+unit_r_id+"' order by created desc;";
		Statement stmt;
		try {	
			stmt = conn.createStatement();
			//System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()){					
				Request request = new Request(rs.getString("sample_request_id"),rs.getString("np_base"),rs.getString("uhid"),						
						rs.getString("surgeon"),rs.getString("patient_name"),rs.getInt("patient_sex"),rs.getString("patient_age"),
						rs.getInt("request_id"),rs.getString("created"),rs.getString("unit_name"),rs.getString("department_name"));
				requests.add(request);
			}			
			//System.out.println(doctor);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
	return requests;
		
		
	}

}
