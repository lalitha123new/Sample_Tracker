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
import com.nimhans.sample.Sample_Tracker.model.NpMessage;
import com.nimhans.sample.Sample_Tracker.model.SpecialRequest;
import com.nimhans.sample.Sample_Tracker.service.NpMessageService;
import com.nimhans.sample.Sample_Tracker.service.SpecialRequestService;

@Path("/npmessage")

public class NpMessageResource {
	
	NpMessageService npMessageService = new NpMessageService();
	
	public NpMessageResource(){
		Database.run();
	}

	@POST
	@Path("/postmessage")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response generateSpecialRequest(NpMessage npmessage){
			
		System.out.println(npmessage);
		
		npMessageService.addnpmessage(npmessage);
		
		
			return  Response.ok()
					.entity(npmessage)
					.build();
	}
	
	@GET
	@Path("/getmessage")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<NpMessage>  getnpmessages(@QueryParam("npNumber") String npNumber){
		
		List<NpMessage> npmessage = npMessageService.getAllnpmessages(npNumber);		
		
		
			return npmessage;
		
	}
	
	@GET
	@Path("/getAllmessage")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<NpMessage>  getAllnpmessages(@QueryParam("rec_station_id") int rec_station_id){
		
		List<NpMessage> npmessage = npMessageService.getAllnpmessages1(rec_station_id);		
		
		
			return npmessage;
		
	}
	

	@GET
	@Path("/getmessagebyblock")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<NpMessage>  getmessagebyblock(@QueryParam("npNumber") String npNumber,@QueryParam("stn_id") int stn_id){
		
		System.out.println("80--- "+stn_id);
		
		List<NpMessage> npmessage = npMessageService.getAllnpmessagesByAll(npNumber,stn_id);		
		
		
			return npmessage;
		
	}
	
	@SuppressWarnings("null")
	@GET
	@Path("/countofmessages")
	public  int makeSpecialIncDone(@QueryParam("station_id") int station_id){

	int result= npMessageService.getCountPsation(station_id);	
	return result;
	}
	
	
	@SuppressWarnings("null")
	@GET
	@Path("/makeReadmessage")
	public  int makeReadmessage(@QueryParam("np_message_id") int np_message_id){

	int result= npMessageService.makeReadmessage(np_message_id);
	return result;
	}
	
	
	
}