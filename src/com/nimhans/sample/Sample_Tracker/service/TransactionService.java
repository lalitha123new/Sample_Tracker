package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TechnicianDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TransactionDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Transaction;

public class TransactionService {
	
	TransactionDAO transactionDb = new TransactionDAO();
	AssetDAO assetDb = new AssetDAO();
	TechnicianDAO technicianDB= new TechnicianDAO();
	
	public void addTransaction(String npNumber, int stationId, int technicianId,int assistantId){
		Transaction transaction = new Transaction(technicianId,stationId,npNumber,assistantId);
		transactionDb.addTransaction(transaction);
	}
	
	public void endTransaction(String npNumber, int stationId){
		assetDb.updateDone(npNumber);
		transactionDb.endTranaction(stationId, npNumber);
	}
	public List<Transaction> getAllTransaction(String npNumber,String createdAt){
		return transactionDb.getAllTransaction(npNumber,createdAt);
	}
	public List<Transaction> getActivitylogs(int stationId,String techName,int type,String startDate,String endDate){
		return transactionDb.getActivitylogs(stationId,technicianDB.getTechnicianIdByName(techName),type,startDate,endDate);
	}
}
