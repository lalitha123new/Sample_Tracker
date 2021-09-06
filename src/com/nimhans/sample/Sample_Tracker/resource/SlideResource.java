package com.nimhans.sample.Sample_Tracker.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.SlideDAO;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.service.AssetService;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SlideResource {
	AssetService assetService = new AssetService();
	SlideDAO slideDB =new SlideDAO();
	AssetDAO assetDB = new AssetDAO();

	@POST
	public Response addNewSlide(@QueryParam("technician") String technicianName,@QueryParam("np") String npBase,@QueryParam("review") String review,@QueryParam("quantity") int quantity, Asset slide){
		//add new Slide as an asset
		//slide id =3
		//npBaseNumber is nothing but parent npBaseNumber
		for(int i=1;i<quantity;i++)
			addNewSlide2(technicianName,npBase,review,quantity,slide);	
		System.out.println("hi im inside slideresource loop");
		slide.setCurrentState(1);
		if(slide.getSpecimen().equals("Stained Slide")){
			slide.setNextState(5);//before it will goes to stage 6 now sheet asset will goes to reporting
			slide.setDone(1);
		}
		else
			slide.setNextState(5);
		slide.setType_id(slideDB.addSlide());
		slide.setType(3);
		slide.setNpNumber(assetDB.getAssetNpNumber(npBase+":00:#",3));
		slide.setReview(review);
		Asset asset = assetService.addAsset(slide,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}	
	public Response addNewSlide2(String technicianName,String npBase,String review,int quantity,Asset slide){
		System.out.println("hi im inside slideresource loop");
		slide.setCurrentState(1);
		if(slide.getSpecimen().equals("Stained Slide")){
			slide.setNextState(5);
			slide.setDone(1);
		}
		else
			slide.setNextState(5);
		slide.setType_id(slideDB.addSlide());
		slide.setType(3);
		slide.setNpNumber(assetDB.getAssetNpNumber(npBase+":00:#",3));
		slide.setReview(review);
		Asset asset = assetService.addAsset(slide,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}
	
	@GET
	public List<Asset> getSlides(@QueryParam("npBase") String npBase) {
		return assetService.getAllSlides(npBase);
	}
	
	
	public Response addNewExternalSlide(String technicianName,String npBase,String review,int quantity, Asset slide){
		//add new Slide as an asset
		//slide id =3
		//npBaseNumber is nothing but parent npBaseNumber
		for(int i=1;i<quantity;i++)
			addNewSlide2(technicianName,npBase,review,quantity,slide);	
		System.out.println("hi im inside slideresource loop");
		slide.setCurrentState(1);
		if(slide.getSpecimen().equals("Stained Slide")){
			slide.setNextState(5);//before it will goes to stage 6 now sheet asset will goes to reporting
			slide.setDone(1);
		}
		else
			slide.setNextState(5);
		slide.setType_id(slideDB.addSlide());
		slide.setType(3);
		slide.setNpNumber(assetDB.getAssetNpNumber(npBase+":00:#",3));
		slide.setReview(review);
		Asset asset = assetService.addAsset(slide,1,technicianName,null,npBase);
		return  Response.ok()
				.entity(asset)
				.build();
	}	
	
	
	
}