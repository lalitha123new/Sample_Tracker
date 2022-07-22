package com.nimhans.sample.Sample_Tracker.resource;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.SynchronousQueue;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jettison.json.JSONException;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.globals.Functions;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Extasset;
import com.nimhans.sample.Sample_Tracker.model.NpUpload;
import com.nimhans.sample.Sample_Tracker.service.AssetService;


@Path("/assets")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AssetResource {
	
	AssetService  assetService = new AssetService();
	TissueResource tr= new TissueResource();
	BlockResource  br= new BlockResource();
	SlideResource sr = new SlideResource();
	
	public AssetResource() {
		//Constructor called with path /assets runs the database
		Database.run();
	}
		
	@GET
	@Path("/scan")
	public Response getAssetStatus(@QueryParam("technician")String technicianName,@QueryParam("assistant")String assistantName,@QueryParam("stationId") int stationId, @QueryParam("np") String npNumber){
		/*
		 *technician refers to the technician name  
		 * Scan a asset to get its details.
		 *  If stationId matches next State of assets, transaction occurs.
		 *   
		*/
		String convertedNp = Functions.convertNpForServer(npNumber);
		Asset asset = assetService.getAssetDetails(convertedNp,stationId, technicianName,assistantName);
		if(asset==null){
			return  Response.status(Status.BAD_REQUEST)
					.entity("Asset Dont Exists!")
					.build();
		}
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	@GET
	@Path("/scanreportBlock")
	public List<Asset> getAssetDetailsForReport(@QueryParam("np") String npNumber){
		/*
		 *technician refers to the technician name  
		 * Scan a asset to get its details.
		 *  If stationId matches next State of assets, transaction occurs.
		 *   
		*/
		String convertedNp = Functions.convertNpForServer(npNumber);
		System.out.println("45--"+convertedNp);
		List<Asset>  asset = assetService.getAssetDetailsforReport(convertedNp);
		return asset;
	}
	
	@GET
	@Path("/scanreportTissue")
	public List<Asset> getAssetDetailsTissueForReport(@QueryParam("np") String npNumber){
		/*
		 *technician refers to the technician name  
		 * Scan a asset to get its details.
		 *  If stationId matches next State of assets, transaction occurs.
		 *   
		*/
		String convertedNp = Functions.convertNpForServer(npNumber);
		System.out.println("45--"+convertedNp);
		List<Asset>  asset = assetService.getAssetDetailsTissueForReport(convertedNp);
		return asset;
	}
	
	
	
	@GET
	@Path("/scanSectioning")
	public Response getAssetforSection(@QueryParam("technician")String technicianName,@QueryParam("assistant")String assistantName,@QueryParam("stationId") int stationId, @QueryParam("np") String npNumber){
		/*
		 *technician refers to the technician name  
		 * Scan a asset to get its details.
		 *  If stationId matches next State of assets, transaction occurs.
		 *   
		*/
		String convertedNp = Functions.convertNpForServer(npNumber);
		Asset asset = assetService.getAssetforSection(convertedNp,stationId,technicianName,assistantName);
		if(asset==null){
			return  Response.status(Status.BAD_REQUEST)
					.entity("Asset Dont Exists!")
					.build();
		}
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	
	
	@GET
	public List<Asset> getAssets(@QueryParam("npBase") String npBase,@QueryParam("year") String createdAt) {
		System.out.println("YEAR"+createdAt);
		return assetService.getAllAssets(npBase,createdAt);
	}
	
	@Path("/tissue")
	public TissueResource getTisssueResource(){
		return new TissueResource();
	}
	
	@Path("/block")
	public BlockResource getBlockResource(){
		System.out.println("I am going to Blocks");
		return new BlockResource();
	}
	
	@Path("/slide")
	public SlideResource getSlideResource(){
		System.out.println("I am going to Slides");
		return new SlideResource();
	}
	@POST
	@Path("/sheet")
	public Response addSheet(@QueryParam("technician")String technicianName,@QueryParam("stationId") int stationId, @QueryParam("np") String npNumber){
		System.out.println("I am going to Sheets");
		String convertedNp = Functions.convertNpForServer(npNumber);
		Asset sheet = new Asset();
		sheet.setCurrentState(1);
		sheet.setNextState(6);	
		sheet.setNpNumber(convertedNp);
		sheet.setSpecimen("Sheet");
		sheet.setBiopsy("");
		sheet.setFixative("");
		sheet.setReview("");
		Asset asset = assetService.addAsset(sheet,stationId, technicianName,null,convertedNp);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	@PUT
	public Response updateAsset(Asset asset){
		//Update in receiving Station so keeping # extra in function of generating NP Number
		assetService.updateAsset(asset);
		return  Response.ok()
				.entity("sucess")
				.build();
	}
	
	@DELETE
	public Response deleteAsset(@QueryParam("npNumber")String npNumber)
	{
		npNumber = npNumber.replaceAll("-", "#");
		assetService.removeAsset(npNumber);
		return Response.ok()
				.build();
	}
	@GET
	@Path("/allncs")
	public List<Asset> getAllNcsAssets(@QueryParam("npBase") String npBase) {

		return assetService.getAllNcsAssets(npBase);
	}
	
	
	@GET
	@Path("/ncs")
	public List<Asset> getNcsAsset(@QueryParam("npBase") String npBase) {
		npBase = npBase.replaceAll("-", "#");
		List<Asset> la=assetService.getNcsAssetDetails(npBase);
		return la;
	}
	
	@GET
	@Path("/allcases")
	public List<Asset> getAllCases(){
		
		return assetService.getAllCases();
	}
	
	
	//get list of uploaded images
    @GET
    @Path("/getlistofimage")
	public List<NpUpload> getListofimage(@QueryParam("np_base") String npbase) {
    	
    	//System.out.println("npbase-- "+npbase);
    	//List<NpUpload> ts = assetService.getlistofimage(npbase);
    	
    	return assetService.getlistofimage(npbase);
	}
	
	//add external Sample
    @POST
    @Path("/addExternalSample")
	public TissueResource addExternalSample(@QueryParam("technician")String technicianName,@QueryParam("stationId") int stationId,@QueryParam("np") String npNumber,List<Extasset> extasset){
		//return new TissueResource();
    	
    	
    	System.out.println("technicianName "+technicianName+" stationId "+"o"+" np "+npNumber);
    	
    	System.out.println(extasset);
    	for (Extasset east : extasset)  
        { 
    		System.out.println("hello-- "+east.getRef_no());
    		
          if(east.getRef_no() == null) {
            	
            	east.setRef_no("nothing");	
            }
            Asset asset = new Asset();
            asset.setBiopsy(east.getSample_type());
            asset.setSpecimen(east.getSpecimen());
            asset.setFixative(east.getFixative());
            asset.setReview(east.getRef_no());
            
            System.out.println(east.getSpecimen()== "Tissue");
            if((east.getSpecimen().equals("Tissue")) || (east.getSpecimen().equals("Surgical Biopsy")) || 
            		(east.getSpecimen().equals("Epilepsy")) || (east.getSpecimen().equals("Muscle")) ||
            		(east.getSpecimen().equals("Nerve")) || (east.getSpecimen().equals("Skin")) ||
            	    (east.getSpecimen().equals("Multiple biopsies")) || (east.getSpecimen().equals("Others")) ||
            	    (east.getSpecimen().equals("Epilepsy surgery")) ||(east.getSpecimen().equals("Muscle biopsy")) ||
            	    (east.getSpecimen().equals("Nerve biopsy")) ||(east.getSpecimen().equals("Skin biopsy")) ||
            	    (east.getSpecimen().equals("Multiple biopsies")) ||(east.getSpecimen().equals("Lip")) ||
            	    (east.getSpecimen().equals("Liver")) || (east.getSpecimen().equals("Lymph Node/conjunctive/Others"))) {
            	
            	System.out.println(east.getSpecimen());
            	
            	tr.addexternalSampleNewTissue(technicianName, npNumber, east.getRef_no(), east.getSample_quantity(), asset);   	 
            	        	 
            }else if((east.getSpecimen().equals( "Blocks")) || (east.getSpecimen().equals("Block"))){
            	
            	br.addexternalNewBlock(technicianName, npNumber, east.getRef_no(), east.getSample_quantity(), asset);

            }else if(east.getSpecimen().equals("Slides for Opinion")){
                	   
            	sr.addNewExternalSlide(technicianName, npNumber, east.getRef_no(), east.getSample_quantity(), asset);   
                	   
            }
           
		 
            	
            	
         }
        
    	
		return null;
	}
    
    
    @GET
    @Path("/nextState")
    public Response getAssetforNextState(@QueryParam("np") String npNumber){

    String convertedNp = Functions.convertNpForServer(npNumber);
    System.out.println("co1nvertedNp--"+convertedNp);
    String asset = assetService.getAssetforNextState(convertedNp);

    return  Response.ok()
    .entity(asset)
    .build();
    }   
    
	
}