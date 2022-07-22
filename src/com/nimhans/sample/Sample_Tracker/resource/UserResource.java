package com.nimhans.sample.Sample_Tracker.resource;

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
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.xml.bind.annotation.XmlRootElement;

import com.nimhans.sample.Sample_Tracker.DataBase.LoginDAO;
import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.globals.Functions;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Login;
import com.nimhans.sample.Sample_Tracker.model.Technician;
import com.nimhans.sample.Sample_Tracker.model.Unit;
import com.nimhans.sample.Sample_Tracker.service.AssetService;
import com.nimhans.sample.Sample_Tracker.service.UserService;


@Path("/users")
public class UserResource {
	
	UserService us = new UserService();
	
	
	//getAllUsers form database
	@GET
	@Path("/allusers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<Technician> getAllCases(){	
		return us.getAllUsers();
	}
	
	    //getAllUsers form database
		@POST
		@Path("/allusers")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Technician updateAllCases(Technician ts1) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException{
			Technician ts= us.setUpdateUser(ts1);
			
			return ts;
		}
		
		//getAllUsers form database
		@GET
		@Path("/delete/{technician_id}/{role}")
		public String deleteTechnician(@PathParam("technician_id") int technician_id,@PathParam("role") String role){
			
			String confirmString = us.deleteUser(technician_id,role);
			System.out.println(confirmString +" id is"+technician_id);
			return confirmString;	
		}
		
		//getAllunits form database
		@GET
		@Path("/allunits")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public List<Unit> allunits(){	
			return us.allunits();
		}
		
		
	
}