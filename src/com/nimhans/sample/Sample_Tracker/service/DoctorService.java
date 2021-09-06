package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.DoctorDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Request;

public class DoctorService {
	
	DoctorDAO doctorDAO = new DoctorDAO();
	AssetDAO assetDAO = new AssetDAO();
	
	public List doctorList(){
		
		//System.out.println("Hello"+doctorDAO.doctorList());
			
		return doctorDAO.doctorList();		
		
	}
	
public List unitList(){
		
		//System.out.println("Hello"+doctorDAO.doctorList());
			
		return doctorDAO.unitList();		
		
	}
	
	public List<Request> doctorDetails(String doctorname){
		
   List<Request> requests = doctorDAO.doctorDetails(doctorname);
   
   for(Request request : requests){

	   
	   request.setStatus(assetDAO.getStatus(request.getNpBase()));
	   //System.out.println(request.getStatus());
   }
   
   return requests;
	}	

	//unitDetails
	public List<Request> unitDetails(String unit_id){
		
		   List<Request> requests = doctorDAO.unitDetails(unit_id);
		   
		   for(Request request : requests){

			   
			   request.setStatus(assetDAO.getStatus(request.getNpBase()));
			   //System.out.println(request.getStatus());
		   }
		   
		   return requests;
			}	
	
}
