package com.nimhans.sample.Sample_Tracker.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.BlockDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.service.AssetService;
import com.nimhans.sample.Sample_Tracker.service.TransactionService;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BlockResource {
	AssetService assetService = new AssetService();
	BlockDAO blockDB = new BlockDAO();
	AssetDAO assetDB = new AssetDAO();
	TransactionService transactionService = new TransactionService();
	public BlockResource() {
		System.out.println("In Cnstrctor dude");
		// TODO Auto-generated constructor stub
	}
	@POST
	public Response addNewBlock(@QueryParam("technician") String technicianName,@QueryParam("np") String npBase,@QueryParam("review") String review,@QueryParam("quantity") int quantity, Asset block){
		//add a new Block as an asset
		//block id =2 
		//Adding in recv. Station so keeping # extra in function of generating NP Number
		//npBaseNumber is nothing but parent npBaseNumber
		
		for(int i=1;i<quantity;i++)
			addNewBlock2(technicianName,npBase,review,quantity,block);
		System.out.println("hi im inside blockresource loop"+quantity);
		block.setType(2);
		block.setCurrentState(1);
		block.setNextState(4);
		block.setType_id(blockDB.addBlock());
		block.setNpNumber(assetDB.getAssetNpNumber(npBase+":00",2));
		block.setReview(review);
		Asset asset = assetService.addAsset(block,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	public Response addNewBlock2(String technicianName,String npBase,String review,int quantity,Asset block){
		System.out.println("hi im inside blockresource loop"+quantity);
		block.setType(2);
		block.setCurrentState(1);
		block.setNextState(4);
		block.setType_id(blockDB.addBlock());
		block.setNpNumber(assetDB.getAssetNpNumber(npBase+":00",2));
		block.setReview(review);
		Asset asset = assetService.addAsset(block,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	@POST
	@Path("/generateslides")
	public Response generateSlides(@QueryParam("number") int number,@QueryParam("technician") String technicianName,@QueryParam("npNumber") String blockNp, @QueryParam("stainName") String stainName){
		//generate slides from parent Block
		System.out.println(technicianName+"is generating slides :) ");
		assetService.generateSlides(blockNp, number, technicianName,stainName);
		System.out.println("generating slides ... ");
		return Response.ok()
				.entity("{}")
				.build();
	}	
	
	@POST
	@Path("/generateMoreslides")
	public Response generateMoreSlides(@QueryParam("number") int number,@QueryParam("technician") String technicianName,@QueryParam("npNumber") String blockNp, @QueryParam("stainName") String stainName,String spcial_request_arr){
		//generate slides from parent Block
		System.out.println(spcial_request_arr+"is generating slides :) ");
		assetService.moreGenerateSlides(blockNp, number, technicianName,stainName,spcial_request_arr);
		System.out.println("generating slides ... ");
		return Response.ok()
				.entity("{}")
				.build();
	}	
	
	@GET
	public List<Asset> getBlocks(@QueryParam("npBase") String npBase) {
		return assetService.getAllBlocks(npBase);
	}
	@POST
	@Path("/setDecal")
	public Response setprocessStatus(@QueryParam("npNumber") String npNumber,@QueryParam("pStatus") String pStatus){
		System.out.println("P STATUS IN RESOUCE"+pStatus);
		assetService.setprocessStatus(npNumber,pStatus);
		return Response.ok()
				.build();
	}
	
	//add external sample block data
	
	public Response addexternalNewBlock(String technicianName,String npBase,String review,int quantity, Asset block){
		//add a new Block as an asset
		//block id =2 
		//Adding in recv. Station so keeping # extra in function of generating NP Number
		//npBaseNumber is nothing but parent npBaseNumber
		
		for(int i=1;i<quantity;i++)
			addNewBlock2(technicianName,npBase,review,quantity,block);
		System.out.println("hi im inside blockresource loop"+quantity);
		block.setType(2);
		block.setCurrentState(1);
		block.setNextState(4);
		block.setType_id(blockDB.addBlock());
		block.setNpNumber(assetDB.getAssetNpNumber(npBase+":00",2));
		block.setReview(review);
		Asset asset = assetService.addAsset(block,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	
	
}