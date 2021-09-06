package com.nimhans.sample.Sample_Tracker.service;

import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.TechnicianDAO;
import com.nimhans.sample.Sample_Tracker.model.Technician;


public class TechnicianService {

	TechnicianDAO technicianDB= new TechnicianDAO();
	
	public List<Technician> getAllTechnicians(){
		return technicianDB.getAllTechnicians();
	}
	public List<Technician>getTechnicians(int stationId){
		System.out.println("inside tech service ");
		
		List<Technician> techs = new ArrayList<>();
		
		switch(stationId)
		{
			case 1 :   techs = technicianDB.getTechnicianForReceiving();
			           break;
            case 2 :   techs = technicianDB.getTechnicianForGrossing();
                       break;
            case 3 :   techs = technicianDB.getTechnicianForEmbedding();
                       break;
            case 4 :   techs = technicianDB.getTechnicianForSectioning();
                       break;          
            case 5 :   techs = technicianDB.getTechnicianForStaining();
                       break;
            case 6 :   techs = technicianDB.getTechnicianForReporting();
                        break;
            case 7 :   techs = technicianDB.getTechnicianForTyping();
                      	break;
                      	
            case 8 :   techs = technicianDB.getTechnicianForVerification();
                       break;
            
            case 9 :   techs = technicianDB.getTechnicianForDispatch();
                       break;
               
            //default: return null ;//technicianDB.getTechnicianForReceiving()
            
		}
		//System.out.println("techs "+techs);
		
		return techs;
			
		}
		
		public List<Technician> getResidentByRole(String role){
	        //System.out.println("inside tech service ");
			
			List<Technician> techs = new ArrayList<>();
			
			techs = technicianDB.getResidentByRole(role);
		
		   return techs;
		}
	
}
