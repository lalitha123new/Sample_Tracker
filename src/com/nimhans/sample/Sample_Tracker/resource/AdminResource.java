package com.nimhans.sample.Sample_Tracker.resource;

import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlRootElement;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.nimhans.sample.Sample_Tracker.DataBase.AdminLoginDAO;
import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Admin;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.service.AdminLoginService;
import com.nimhans.sample.Sample_Tracker.service.DoctorService;


@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminResource {
	
	AdminLoginService als= new AdminLoginService();
	AdminLoginDAO ado=new AdminLoginDAO(); 
	public AdminResource() {
		// TODO Auto-generated constructor stub
		Database.run();
	}
	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/plain")
	@Path("/adminDetails")
	public int doctorDetails(Admin adminDetails)  throws JsonGenerationException, JsonMappingException, IOException{
		
		System.out.println("adminName- "+adminDetails.getadmin_name());
		boolean login1 = false;
		int num1=0;
		try {
			 login1 = als.validate(adminDetails.getadmin_name(), adminDetails.getPassword());
		} catch (InvalidKeyException | NoSuchAlgorithmException | InvalidKeySpecException | NoSuchPaddingException
				| InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		if(login1 == true) {
			num1 = 1;	
		}
		System.out.println("--12--- "+num1);
		return num1;
	}
	
	@GET
	@Path("/deleteNpnumber/{status}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/plain")
	public int deleteNpnumber(@PathParam("status") String status,@QueryParam("npnumber") String npnumber) {
		
		System.out.println(" npnumber- "+npnumber+"  status- "+status);
		int res1 =0;
		try {
			 res1 = ado.deleteNpNumber(npnumber);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return res1;
	}
	

}
