package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;

public class StationService {
	private AssetDAO assetDB=new AssetDAO();
	
	public List<Asset> getAllCompletedTasks(int stationId) {
		return assetDB.getCompletedTasks(stationId);
	}

	public List<Asset> getAllOnGoingTasks(int stationId) {
		return assetDB.getOnGoingTasks(stationId);
	}

	public List<Asset> getAllPendingTasks(int stationId) {
		return assetDB.getAllPendingTasks(stationId);			
	}
	public List<Asset> getAllSpecialTasks(int stationId) {
		return assetDB.getAllSpecialTasks(stationId);
	}
}
