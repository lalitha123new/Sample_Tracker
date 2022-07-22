package com.nimhans.sample.Sample_Tracker.resource;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
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
import com.nimhans.sample.Sample_Tracker.globals.Functions;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Login;
import com.nimhans.sample.Sample_Tracker.model.Technician;
import com.nimhans.sample.Sample_Tracker.service.AssetService;
import com.nimhans.sample.Sample_Tracker.service.LoginService;


@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LoginResource {
	
	LoginService loginservice = new LoginService();
	AssetService assetservice = new AssetService();
	public LoginResource() {
		//Constructor called with path /assets runs the database
		Database.run();
	}
	
@POST
public Response getDetails(@QueryParam("username")String uname,@QueryParam("password")String pass) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, IOException{
	
	
	System.out.println("Inside Login Resource method ");
	boolean login = loginservice.validate(uname,pass);
	
	if(login == false){
		//return Response.status(Status.BAD_REQUEST).entity("Unable to Login").build();
		return Response.status(Response.Status.NOT_FOUND).entity("Error in username/password").build();
		
	}
	else
	return Response.ok().status(Status.ACCEPTED).entity(" Login Successfull !!").build();
	
	
}

//doctorNpTracker login
@POST
@Path("/doctor")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public Response getDetailsDoctor(@QueryParam("username")String uname,@QueryParam("password")String pass,@QueryParam("role")String role) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, IOException{
	
	
	System.out.println("Inside Login Resource method ");
	int login = loginservice.validateDoctor(uname,pass,role);
	String tech_id = Integer.toString(login);
	
	if(login == 0){
		//return Response.status(Status.BAD_REQUEST).entity("Unable to Login").build();
		return Response.status(Response.Status.NOT_FOUND).entity(tech_id).build();
		
	}
	else
	return Response.ok().status(Status.ACCEPTED).entity(tech_id).build();
	
	

}
	

}
