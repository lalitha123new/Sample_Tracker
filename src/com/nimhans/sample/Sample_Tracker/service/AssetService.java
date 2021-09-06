package com.nimhans.sample.Sample_Tracker.service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
*/
import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.BlockDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.LoginDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.NcsAssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.RequestDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.SlideDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TechnicianDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TissueDAO;
import com.nimhans.sample.Sample_Tracker.globals.NPNumberGlobal;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.NpUpload;
import com.nimhans.sample.Sample_Tracker.model.Request;

public class AssetService {
	RequestDAO requestDB = new RequestDAO();
	AssetDAO assetDB = new AssetDAO();
	NcsAssetDAO ncsDB = new NcsAssetDAO();
	TissueDAO tissueDB = new TissueDAO();
	BlockDAO blockDB = new BlockDAO();
	SlideDAO slideDB = new SlideDAO();
	TechnicianDAO technicianDB = new TechnicianDAO();
	LoginDAO logindb = new LoginDAO();
	
	NPNumberGlobal npNumberGlobal = new NPNumberGlobal();
	TransactionService transactionService = new TransactionService();
	
	public AssetService(){
	}
	
	public Asset addAsset(Asset asset,int stationId, String technicianName,String assistantName,String npBase){
		//Add block slide tissue
		if(asset.getNcs()==1){
			ncsDB.addNcsAsset(asset);
			ncsDB.addNcsTagToAsset(asset.getNpNumber());
		}
		assetDB.addAsset(asset,npBase);	
		int assistantId = (assistantName==null)?0:technicianDB.getAssistantIdByName(assistantName);
		transactionService.addTransaction(asset.getNpNumber(), asset.getCurrentState(),technicianDB.getTechnicianIdByName(technicianName),assistantId); //Start a transaction
		transactionService.endTransaction(asset.getNpNumber(), asset.getCurrentState()); //Dummy end of transaction
		return asset;
	}
	
	public Asset addMoreAsset(Asset asset,int stationId, String technicianName,String assistantName,String spcial_request_arr){
		//Add block slide tissue
		if(asset.getNcs()==1){
			ncsDB.addNcsAsset(asset);
			ncsDB.addNcsTagToAsset(asset.getNpNumber());
		}
		assetDB.addBulkAsset(asset,spcial_request_arr);	
		int assistantId = (assistantName==null)?0:technicianDB.getAssistantIdByName(assistantName);
		transactionService.addTransaction(asset.getNpNumber(), asset.getCurrentState(),technicianDB.getTechnicianIdByName(technicianName),assistantId); //Start a transaction
		transactionService.endTransaction(asset.getNpNumber(), asset.getCurrentState()); //Dummy end of transaction
		return asset;
	}
	
	
	
	public void generateBlocks(Asset asset, int number, String technicianName,String assistantName){
		//These are the transactions of the parent Asset, Tissue
	//	transactionService.addTransaction(asset.getNpNumber(), 2,technicianDB.getTechnicianIdByName(technicianName)); //Start a transaction
//		transactionService.endTransaction(asset.getNpNumber(), 2); //End a transaction
		
		//Changing the details of the child asset.
		asset.setSpecimen("Block");
		asset.setCurrentState(2);
		asset.setNextState(3);
		asset.setType(2);
		for(int i=0; i<number;i++){
			System.out.println(i);
			asset.setType_id(blockDB.addBlock());
			asset.setNpNumber(assetDB.getAssetNpNumber(asset.getNpNumber(),2));
			addAsset(asset,2,technicianName,assistantName,null);
		}
	}
	private static final String[] commonTests = {"H&E"};
	//private static final String[] tumerTests = {"H&E"};
	//private static final String[] skinTests = {"H&E"};
	private static final String[] muscleTests = {"H&E","MAT"};
	private static final String[] nerveTests1 = {"H&E","MAT"};
	private static final String[] nerveTests2 = {"K-Pal"};
	private static final String[] muscleFreshTests = {"H2E","MAT","H&E CRYO","MGT","NADH","SDH","ATP 9.4","ATP 4.6"};
	

	public void generateSlides(String npNumber, int number, String technicianName, String stainName){
		//Parent NP Number: ie, Block Np Number is used.
		//Slides are generated in Sectioning So Current State is 4.
		
		//Parent Block Transactions
		/*transactionService.addTransaction(asset.getNpNumber(), 2,technicianDB.getTechnicianIdByName(technicianName)); //Start a transaction
		transactionService.endTransaction(asset.getNpNumber(), 2); //End a transaction
		*/
		
		//Setting properties and Creating new Slides 
		Asset asset = assetDB.getAsset(npNumber);
		asset.setCurrentState(4);
		System.out.println("Genrate Slides Method");
		asset.setNextState(5);
		asset.setType(3);
		System.out.println("stainname"+stainName);
		if(stainName.equals("default")){
			switch(asset.getBiopsy()){
				/*case "Tumor" : addSlide(asset,technicianName,tumerTests);
				break;*/
				case "Nerve" : if(!npNumber.contains("X")){
					if(npNumber.contains(":01")){
						addSlide(asset,technicianName,nerveTests1);
					}else if(npNumber.contains(":02")){
						addSlide(asset,technicianName,nerveTests2);
					}else{
						addSlide(asset,technicianName,nerveTests1);
					}
				}else
					addSlide(asset,technicianName,nerveTests1);
				break;
				case "Muscle": 
					if(asset.getFixative().equals("Fresh")){
						addSlide(asset,technicianName,muscleFreshTests);
					}else if(asset.getFixative().equals("Saline")){
						addSlide(asset,technicianName,muscleFreshTests);
					}
					else{
						addSlide(asset,technicianName,muscleTests);
					}
				break;
				/*case "Skin": addSlide(asset,technicianName,skinTests);
				break;*/
				default:
					addSlide(asset,technicianName,commonTests);
			}
		}else{
			for(int i=0; i<number;i++){
				System.out.println("NUMBER"+number);
				asset.setStain_name(stainName);
				asset.setType_id(slideDB.addSlide());
				asset.setNpNumber(assetDB.getAssetNpNumber(asset.getNpNumber(),3));
				addAsset(asset,4,technicianName,null,null);
			}
		}
	}
	
	//more generate
	public void moreGenerateSlides(String npNumber, int number, String technicianName, String stainName,String spcial_request_arr){
		//Parent NP Number: ie, Block Np Number is used.
		//Slides are generated in Sectioning So Current State is 4.
		
		//Parent Block Transactions
		/*transactionService.addTransaction(asset.getNpNumber(), 2,technicianDB.getTechnicianIdByName(technicianName)); //Start a transaction
		transactionService.endTransaction(asset.getNpNumber(), 2); //End a transaction
		*/
		
		//Setting properties and Creating new Slides 
		Asset asset = assetDB.getAsset(npNumber);
		asset.setCurrentState(4);
		System.out.println("Genrate Slides Method");
		asset.setNextState(5);
		asset.setType(3);
		System.out.println("stainname"+stainName);
		if(stainName.equals("default")){
			switch(asset.getBiopsy()){
				/*case "Tumor" : addSlide(asset,technicianName,tumerTests);
				break;*/
				case "Nerve" : if(!npNumber.contains("X")){
					if(npNumber.contains(":01")){
						addMoreSlide(asset,technicianName,nerveTests1,spcial_request_arr);
					}else if(npNumber.contains(":02")){
						addMoreSlide(asset,technicianName,nerveTests2,spcial_request_arr);
					}else{
						addMoreSlide(asset,technicianName,nerveTests1,spcial_request_arr);
					}
				}else
					addMoreSlide(asset,technicianName,nerveTests1,spcial_request_arr);
				break;
				case "Muscle": 
					if(asset.getFixative().equals("Fresh")){
						addMoreSlide(asset,technicianName,muscleFreshTests,spcial_request_arr);
					}else if(asset.getFixative().equals("Saline")){
						addMoreSlide(asset,technicianName,muscleFreshTests,spcial_request_arr);
					}
					else{
						addMoreSlide(asset,technicianName,muscleTests,spcial_request_arr);
					}
				break;
				/*case "Skin": addSlide(asset,technicianName,skinTests);
				break;*/
				default:
					addMoreSlide(asset,technicianName,commonTests,spcial_request_arr);
			}
		}else{
			for(int i=0; i<number;i++){
				asset.setStain_name(stainName);
				asset.setType_id(slideDB.addSlide());
				asset.setNpNumber(assetDB.getAssetNpNumber(asset.getNpNumber(),3));
				addMoreAsset(asset,4,technicianName,null,spcial_request_arr);
			}
		}
	}

	
	
	
	
	public void addSlide(Asset asset,String technicianName,String[] tests){
		System.out.println("tests"+tests);
		if(tests != null){
			for(String stainName:tests){
				System.out.println("inside addSlide");
				asset.setStain_name(stainName);
				asset.setType_id(slideDB.addSlide());
				asset.setNpNumber(assetDB.getAssetNpNumber(asset.getNpNumber(),3));
				addAsset(asset,4,technicianName,null,null);
			}
		}
	}
	
	
	
	
	public void addMoreSlide(Asset asset,String technicianName,String[] tests,String spcial_request_arr){
		System.out.println("tests"+tests);
		if(tests != null){
			for(String stainName:tests){
				System.out.println("inside addSlide");
				asset.setStain_name(stainName);
				asset.setType_id(slideDB.addSlide());
				asset.setNpNumber(assetDB.getAssetNpNumber(asset.getNpNumber(),3));
				addMoreAsset(asset,4,technicianName,null,spcial_request_arr);
			}
		}
	}
	
	public List<Asset> getAllAssets(String npBaseNumber,String createdAt){
		return assetDB.getAllAssets(npBaseNumber,createdAt);
	}
	public List<Asset> getAllBlocks(String npBaseNumber){
		return assetDB.getAllBlocks(npBaseNumber);
	}
	public List<Asset> getAllSlides(String npBaseNumber){
		return assetDB.getAllSlides(npBaseNumber);
	}
	
	public Asset getAssetDetails(String npNumber, int stationId, String technicianName,String assistantName){
		Asset asset= assetDB.getAsset(npNumber);
		
		if(asset!=null){
			//If such an asset exists then check if transaction needs to be created.
			//System.out.println("asset special = "+asset.getSpecial());
//			if(asset.getSpecial()==1)//remove the special tag if it is special
//				assetDB.removeSpecialTagToAsset(asset.getAssetId());
			
			if(asset.getNextState()==stationId){
				//CREATE A Transaction
				if(stationId==5)
					assetDB.changeStation(asset.getNextState(),asset.getNextState(),npNumber,asset.getType());
				else if(stationId==8 && (!npNumber.contains("X")))
						assetDB.changeStation(asset.getNextState()+1,asset.getNextState()+2,npNumber,asset.getType());
				else
					assetDB.changeStation(asset.getNextState(),asset.getNextState()+1,npNumber,asset.getType());
				//Get technician Id by technician name here 
				transactionService.addTransaction(npNumber, stationId, technicianDB.getTechnicianIdByName(technicianName), technicianDB.getAssistantIdByName(assistantName));			
				//IF BLOCK GENERATION OR SLIDE GENERATION 			
				transactionService.endTransaction(npNumber, stationId);
			
			}
		}
		return asset;
	}
	
	//reporting station getAssetforReport
	public List<Asset>  getAssetDetailsforReport(String npNumber){
		List<Asset> asset= assetDB.getAssetforReport(npNumber);
		return asset;
	}
	
	 //reporting station getAssetforReport tissue
	public List<Asset>  getAssetDetailsTissueForReport(String npNumber){
		List<Asset> asset= assetDB.getAssetDetailsTissueForReport(npNumber);
		return asset;
	}
	
	//sectioning station
		public Asset getAssetforSection(String npNumber, int stationId,String technicianName,String assistantName){
			Asset asset= assetDB.getAsset(npNumber);
			
			if(asset!=null){
				
						assetDB.changeStationForSection(asset.getNextState(),asset.getNextState()+1,npNumber,asset.getType());
					//Get technician Id by technician name here 
					transactionService.addTransaction(npNumber, stationId, technicianDB.getTechnicianIdByName(technicianName), technicianDB.getAssistantIdByName(assistantName));			
					//IF BLOCK GENERATION OR SLIDE GENERATION 			
					transactionService.endTransaction(npNumber, stationId);
				
				}
			
			return asset;
		}
	
	public List<Asset> getNcsAssetDetails(String npNumber){
		List<Asset> asset= ncsDB.getNcsAsset(npNumber);
		return asset;
	}
	public void removeAsset(String npNumber){
		Asset asset = assetDB.getAsset(npNumber);
		if(asset!=null){
			assetDB.deleteAsset(asset.getAssetId());
			if(asset.getType()==1)
			{
				tissueDB.deleteTissue(asset.getType_id());
			}
			else  if(asset.getType()==2)
				blockDB.deleteBlock(asset.getType_id());
			else slideDB.deleteslide(asset.getType_id());
			
			if(asset.getNcs()==1){
				ncsDB.deleteNcsAsset(asset.getNpNumber());
			}
		}
	}

	public Asset updateAsset(Asset asset) {
		assetDB.updateAsset(asset.getNpNumber(), asset.getBiopsy(),asset.getFixative());
		if(asset.getNcs()==1){
			ncsDB.addNcsTagToAsset(asset.getNpNumber());
			List<Asset> asset2 = ncsDB.getNcsAsset(asset.getNpNumber());
			if(asset2==null) //asset is not ncs
				ncsDB.addNcsAsset(asset); 
			else
				ncsDB.updateNcsAsset(asset.getNpNumber(), asset.getCorrective(),asset.getPreventive(),asset.getFaculty(),asset.getNcsType());
		}
		else
		{
			List<Asset> asset2 = ncsDB.getNcsAsset(asset.getNpNumber());
			if(asset2!=null){
				ncsDB.deleteNcsAsset(asset.getNpNumber());
				ncsDB.removeNcsTagToAsset(asset.getNpNumber());
			}
		}
		return null;
	}
	public List<Asset> getAllNcsAssets(String npBaseNumber){
		return ncsDB.getAllNcsAssets(npBaseNumber);
	}
	
	
	public List<Asset> getAllCases(){
		return ncsDB.getAllCases();
	}
	public void setprocessStatus(String npNumber,String pStatus){
		Asset asset= assetDB.getAsset(npNumber);
		System.out.println("*** NP NP NP"+npNumber);
		System.out.println("*** P STAS IS ASSET SER"+pStatus);
		if(asset!=null){
			assetDB.setprocessStatus(asset.getAssetId(),pStatus);
		}
	}

	public List<NpUpload> getlistofimage(String npbase) {
		// TODO Auto-generated method stub
		return ncsDB.getlistofimage(npbase);
	}

	public String deleteUploadfilefile(int np_upload_id) {
		// TODO Auto-generated method stub
		return ncsDB.deleteUploadfilefile(np_upload_id);
	}
	
	
	
	public String getAssetforNextState(String convertedNp) {
		// TODO Auto-generated method stub
		String nxtstate= assetDB.getNextState(convertedNp);
		return nxtstate;
		}
	
	
	
	
}