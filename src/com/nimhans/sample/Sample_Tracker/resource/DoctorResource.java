package com.nimhans.sample.Sample_Tracker.resource;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.service.DoctorService;


@Path("/doctor")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DoctorResource {
	
	DoctorService doctorservice = new DoctorService();
	public DoctorResource() {
		// TODO Auto-generated constructor stub
		Database.run();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/doctorlist")
	public Response doctorList() throws JsonGenerationException, JsonMappingException, IOException{
		//System.out.println("aaaaaaaaaaaaaa"+doctorservice.doctorList());
		ObjectMapper objectMapper = new ObjectMapper();
		String list = objectMapper.writeValueAsString(doctorservice.doctorList());
		return Response.status(200).entity(list).type(MediaType.APPLICATION_JSON).build();
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/unitlist")
	public Response unitList() throws JsonGenerationException, JsonMappingException, IOException{
		//System.out.println("aaaaaaaaaaaaaa"+doctorservice.doctorList());
		ObjectMapper objectMapper = new ObjectMapper();
		String list = objectMapper.writeValueAsString(doctorservice.unitList());
		return Response.status(200).entity(list).type(MediaType.APPLICATION_JSON).build();
	}
	
	@GET
	@Path("/doctordetails")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Request> doctorDetails(@QueryParam("doctorname")String doctorname) throws JsonGenerationException, JsonMappingException, IOException{
//		ObjectMapper objectMapper = new ObjectMapper();
//		String list = objectMapper.writeValueAsString(doctorservice.doctorDetails(doctorname));	
//        return Response.status(200).entity(list).type(MediaType.APPLICATION_JSON).build();
		
		return doctorservice.doctorDetails(doctorname);
		
	}
	
	//unitDetails
	@GET
	@Path("/unitDetails")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Request> unitDetails(@QueryParam("unitName")String unit_id) throws JsonGenerationException, JsonMappingException, IOException{
//		ObjectMapper objectMapper = new ObjectMapper();
//		String list = objectMapper.writeValueAsString(doctorservice.doctorDetails(doctorname));	
//        return Response.status(200).entity(list).type(MediaType.APPLICATION_JSON).build();
		
		return doctorservice.unitDetails(unit_id);
		
	}

}
