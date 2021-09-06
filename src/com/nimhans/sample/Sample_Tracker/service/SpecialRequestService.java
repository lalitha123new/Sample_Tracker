package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.SpecialRequestDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TechnicianDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.SpecialRequest;

public class SpecialRequestService {

	SpecialRequestDAO specialRequestDB = new SpecialRequestDAO();
	AssetService assetService = new AssetService();
	AssetDAO assetDB = new AssetDAO();
	TransactionService transactionService = new TransactionService();
	TechnicianDAO technicianDB = new TechnicianDAO();
	
	public void addSpecialRequest(SpecialRequest specialRequest, int currentState, int nextState,String technicianName){
		//Sending parent Asset ID in Special Request
		
		//for(SpecialRequest specialRequest1:specialRequest) {
			System.out.println(specialRequest);
			Asset asset = assetDB.getAsset(specialRequest.getNpNumber());
			specialRequest.setAssetId(asset.getAssetId());
			specialRequestDB.addSpecialRequest(specialRequest);
			assetDB.changeStation(currentState, nextState, asset.getNpNumber(), asset.getType());
			assetDB.addSpecialTagToAsset(specialRequest.getAssetId());
			String npBase = asset.getNpNumber().substring(0,asset.getNpNumber().indexOf(":"));
//			System.out.println("is"+npBase);
			transactionService.addTransaction(npBase, 6,technicianDB.getTechnicianIdByName(technicianName),0); //Start a transaction
			transactionService.endTransaction(npBase, 6); //Dummy end of transaction
			
		//}
		
		
	}
	
	public List<SpecialRequest> getSpecialRequest(String npNumber){
		List<SpecialRequest> specialRequest= specialRequestDB.getSpecialRequest(npNumber);
		return specialRequest;
	}
	public List<SpecialRequest> getSpecialRequest1(String npNumber){
		List<SpecialRequest> specialRequest= specialRequestDB.getSpecialRequest1(npNumber);
		return specialRequest;
		}
	
	public int makeSpecialRequest1(int special_request_id){
		
		return specialRequestDB.makeSpecialRequest1(special_request_id);
		}

}
