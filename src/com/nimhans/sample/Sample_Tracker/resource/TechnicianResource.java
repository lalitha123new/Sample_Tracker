package com.nimhans.sample.Sample_Tracker.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Technician;
import com.nimhans.sample.Sample_Tracker.service.TechnicianService;

@Path("/technicians")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TechnicianResource {
	
	TechnicianService  technicianService = new TechnicianService();
	public TechnicianResource() {
		Database.run();
	}

	@GET
	public List<Technician> getAllTechnicians() {
		return technicianService.getAllTechnicians();
	}
	@GET
	@Path("/withstation")
	public List<Technician> getTechnicians(@QueryParam("stationId")int stationId) {
		System.out.println("inside get technician "+stationId);
		
		return technicianService.getTechnicians(stationId);
	}
	
	@GET
	@Path("/withrole")
	public List<Technician> getResidentByRole(@QueryParam("role")String role){
		System.out.println("inside get technician by role reosurce ");
		return technicianService.getResidentByRole(role);
	}
}
