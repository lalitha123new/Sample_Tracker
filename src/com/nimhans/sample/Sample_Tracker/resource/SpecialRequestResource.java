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
import javax.ws.rs.core.Response.Status;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.SpecialRequest;
import com.nimhans.sample.Sample_Tracker.service.SpecialRequestService;

@Path("/specialrequests")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SpecialRequestResource {
	
	SpecialRequestService specialRequestService = new SpecialRequestService();
	
	public SpecialRequestResource(){
		Database.run();
	}

	@POST
	public Response generateSpecialRequest(@QueryParam("currentState")int currentState,@QueryParam("nextState")int nextState,@QueryParam("technicianName")String technicianName,SpecialRequest specialRequest){
		
		/*
		 * Takes in a special request. 
		 * new Special Request entered in database with AssetID.
		*/
		System.out.println(specialRequest);
		
		SpecialRequest st=null;
		
		 specialRequestService.addSpecialRequest(specialRequest,currentState,nextState,technicianName);
			return  Response.ok()
					.entity(specialRequest)
					.build();
	}
	
	@GET
	public List<SpecialRequest> getSpecialRequest(@QueryParam("npNumber")String npNumber){
		
		List<SpecialRequest> specialRequest = specialRequestService.getSpecialRequest(npNumber);
		//System.out.println(specialRequest);
//		if(specialRequest!=null){
//			return  Response.ok()
//					.entity(specialRequest)
//					.build();
//		}
//		return Response.status(Status.BAD_REQUEST).build();
		return specialRequest;
	}
	
	@GET
	@Path("/getSpecialInc")
	public  List<SpecialRequest> getSpecialRequest1(@QueryParam("npNumber")String npNumber){

	List<SpecialRequest> specialRequest = specialRequestService.getSpecialRequest1(npNumber);
	return specialRequest;
	}
	
	@SuppressWarnings("null")
	@GET
	@Path("/makeSpecialIncDone")
	public  Response makeSpecialIncDone(@QueryParam("special_request_id") int special_request_id){

	int result= specialRequestService.makeSpecialRequest1(special_request_id);
	SpecialRequest st=new SpecialRequest();
	st.setDone(result);
	st.setSpecial_request_id(special_request_id);

	return  Response.ok()
	.entity(st)
	.build();
	}
	
	
	
}