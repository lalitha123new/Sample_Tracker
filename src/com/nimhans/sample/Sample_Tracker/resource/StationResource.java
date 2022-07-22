package com.nimhans.sample.Sample_Tracker.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;


import com.nimhans.sample.Sample_Tracker.service.StationService;


@Path("/station")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StationResource {

	StationService stationService=new StationService();
	List<Asset> tasks=new ArrayList<Asset>();
	
	public StationResource()
	{
		Database.run();
	}
	@GET
	@Path("/pending")
	public List<Asset> getAllPendingTasks(@QueryParam("stationId") int stationId)
	{
		return stationService.getAllPendingTasks(stationId);	
	}
	@GET
	@Path("/special")
	public List<Asset> getAllSpecialTasks(@QueryParam("stationId") int stationId)
	{
		return stationService.getAllSpecialTasks(stationId);	
	}
	
	@GET
	@Path("/ongoing")
	public List<Asset> getAllOngoingTasks(@QueryParam("stationId") int stationId)
	{
		return stationService.getAllOnGoingTasks(stationId);	
	}
	
	@GET
	@Path("/completed")
	public List<Asset> getAllCompletedTasks(@QueryParam("stationId") int stationId)
	{
		return stationService.getAllCompletedTasks(stationId);	
	}
}