package com.nimhans.sample.Sample_Tracker.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TissueDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.service.AssetService;
import com.nimhans.sample.Sample_Tracker.service.TransactionService;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TissueResource {
	AssetService assetService = new AssetService();
	TissueDAO tissueDB = new TissueDAO();
	AssetDAO assetDB = new AssetDAO();

	TransactionService transactionService = new TransactionService();

	@POST
	public Response addNewTissue(@QueryParam("technician") String technicianName,@QueryParam("np") String npBase,@QueryParam("review") String review,@QueryParam("quantity") int quantity, Asset tissue){
		//add a new tissue as a asset
		//tissue id=1
		System.out.println("tissue-KING- "+tissue);
		//can be added only in receiving Station
		for(int i=1;i<quantity;i++)
			addNewTissue2(technicianName,npBase,review,quantity,tissue);	
		System.out.println("hi im inside tissuresource loop"+quantity);
		tissue.setType(1);
		tissue.setCurrentState(1);
		tissue.setNextState(2);	
		tissue.setType_id(tissueDB.addTissue());
		tissue.setNpNumber(assetDB.getAssetNpNumber(npBase,1));
		tissue.setReview(review);
		Asset asset = assetService.addAsset(tissue,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	public Response addNewTissue2(String technicianName,String npBase,String review,int quantity,Asset tissue){
		System.out.println("hi im inside tissuresource loop"+quantity);
		tissue.setType(1);
		tissue.setCurrentState(1);
		tissue.setNextState(2);	
		tissue.setType_id(tissueDB.addTissue());
		tissue.setNpNumber(assetDB.getAssetNpNumber(npBase,1));
		tissue.setReview(review);
		Asset asset = assetService.addAsset(tissue,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	@POST
	@Path("/generateblocks")
	public Response generateBlocks(@QueryParam("technician") String technicianName,@QueryParam("assistant") String assistantName,@QueryParam("number") int number, Asset tissue){
		//generate blocks from parent tissue
		assetService.generateBlocks(tissue, number, technicianName,assistantName);
		return Response.ok()
				.build();
	}
	@POST
	@Path("/setProcessStatus")
	public Response setprocessStatus(@QueryParam("npNumber") String npNumber,@QueryParam("pStatus") String pStatus){
		assetService.setprocessStatus(npNumber,pStatus);
		return Response.ok()
				.build();
	}
	
	
	//for external sample methods
	
	
	public Response addexternalSampleNewTissue(String technicianName,String npBase,String review,int quantity, Asset tissue){
		//add a new tissue as a asset
		//tissue id=1
		System.out.println("tissue-KING- "+tissue);
		//can be added only in receiving Station
		for(int i=1;i<quantity;i++)
			addNewTissue2(technicianName,npBase,review,quantity,tissue);	
		System.out.println("hi im inside tissuresource loop"+quantity);
		tissue.setType(1);
		tissue.setCurrentState(1);
		tissue.setNextState(2);	
		tissue.setType_id(tissueDB.addTissue());
		tissue.setNpNumber(assetDB.getAssetNpNumber(npBase,1));
		tissue.setReview(review);
		Asset asset = assetService.addAsset(tissue,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	
	
}