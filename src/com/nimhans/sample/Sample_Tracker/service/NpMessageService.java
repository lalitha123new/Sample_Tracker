package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.NpBaseDao;
import com.nimhans.sample.Sample_Tracker.DataBase.NpMessageDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.NpMessage;

public class NpMessageService {

	
	NpMessageDAO npmessageDAO = new NpMessageDAO();

	public NpMessage addnpmessage(NpMessage npmessage){
		
		npmessageDAO.addNpmessage(npmessage);
		return npmessage;
		
	}
	
	
   public List<NpMessage> getAllnpmessages(String npBaseNumber){
		
		List<NpMessage> npm= npmessageDAO.getAllnpmessages(npBaseNumber);
		return npm;
   }
   
   public List<NpMessage> getAllnpmessages1(int rec_station_id){
		
		List<NpMessage> npm= npmessageDAO.getAllnpmessages1(rec_station_id);
		return npm;
  }
   
   public List<NpMessage> getAllnpmessagesByAll(String npBaseNumber,int stn_id){
		
		List<NpMessage> npm= npmessageDAO.getAllnpmessagesByAll(npBaseNumber,stn_id);
		return npm;
  }
	
	
  public int getCountPsation(int station_id){
		
		int result=npmessageDAO.getNpmessageCount(station_id);
		return result;
		
	}


  public int makeReadmessage(int np_message_id){
	
	int result = npmessageDAO.makeReadmessage(np_message_id);
	return result;
	
  }
	
	
	
}
