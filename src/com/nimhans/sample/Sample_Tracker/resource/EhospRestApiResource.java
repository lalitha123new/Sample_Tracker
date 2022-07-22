package com.nimhans.sample.Sample_Tracker.resource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import com.nimhans.sample.Sample_Tracker.model.NpUpload;
import com.nimhans.sample.Sample_Tracker.model.TestDetails;
import com.nimhans.sample.Sample_Tracker.service.AssetService;
import com.nimhans.sample.Sample_Tracker.service.RestApiService;


@Path("/ehosp")
public class EhospRestApiResource {
	@Context
	private ServletContext context;
	
	RestApiService rs1 = new RestApiService();
	AssetService  assetService = new AssetService();
	
	
	    //Patient DemographicBySampleId
	    @POST
	    @Path("/patientDemograophicBySampleId")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response patientBySampleId(String ps) throws IOException{
	    	
	    	int api_identifier_id = 3;
	    	
	    	String patientdata = rs1.ehospitalApiData(ps,api_identifier_id);
	    	
	    	System.out.println("Patient DemographicBySampleId----localresource");
	    	return Response.status(200).entity(patientdata).build(); 
		}
	    
	    
	  //Patient DemographicByUhid
	    @POST
	    @Path("/patientDemograophicByUhid")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response patientByUhid(String ps) throws IOException{
	    	
                 int api_identifier_id = 1;
	    	
                 String patientdata  = rs1.ehospitalApiData(ps,api_identifier_id);
	    	
	    	System.out.println("Patient DemographicBySampleId--localresource");
	    	return Response.status(200).entity(patientdata).build(); 
		}
	    
	  
	      
	    
	    //Report using Sample Id
	    @POST
	    @Path("/reportUsingSampleId")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response reportUsingSampleId(String ps) throws IOException, SQLException, JSONException{
	    	
	    	 int api_identifier_id = 2;
	    	
		    	
		    	String patientdata = rs1.ehospitalApiData1(ps,api_identifier_id);
		    	
		    	// System.out.println("Report using Sample Id--localresource"+patientdata);
		    	
		    	
		    	return Response.status(200).entity(patientdata).build();
		}
	    
	    
	    
	    
	    
	   //Test request details using sample id
	    @POST
	    @Path("/testRequestDetailsUsingSampleId")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response testDetailsBySampleID(String ps) throws IOException{
	    	
	    	 int api_identifier_id = 4;
		    	
	    	 String patientdata  = rs1.ehospitalApiData(ps,api_identifier_id);
		    	
		    	System.out.println("Test request details using sample id--localresource");
		    	return Response.status(200).entity(patientdata).build();
		}
	    
		
	  //Save external lab report
	    @POST
	    @Path("/saveExternalReport")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response SaveExternalReport(String ps) throws IOException, SQLException, JSONException{
	    	 int api_identifier_id = 6;
		    	
	    	 String patientdata  = rs1.ehospitalApiDataSaveReport(ps,api_identifier_id);
		    	
		    	System.out.println("Save external lab report--localresource");
		    	return Response.status(200).entity(patientdata).build();
		}
	    
	    
	    //Save external lab report as report_Draft
	    @POST
	    @Path("/saveExternalReportDraft")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response SaveExternalReportDraft(String ps) throws IOException, SQLException, JSONException{
	    	 int api_identifier_id = 6;
		    	
	    	 String patientdata  = rs1.ehospitalApiDataSaveReport_draft(ps,api_identifier_id);
		    	
		    	
		    	return Response.status(200).entity(patientdata).build();
		}
	    
	    
	    
	    @POST
		@Path("/uploadPdf")
		@Consumes(MediaType.MULTIPART_FORM_DATA)
		public Response uploadFile(
			@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail,
			@FormDataParam("np_base") String new_np,
			@FormDataParam("identifier_id") int identifier_id) {

			String  np_base= new_np.replace("/","@");
			System.out.println("step1-filepath- "+fileDetail.getFileName());
			String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
			System.out.println("step1-filepath- "+timeStamp);
			
			
			//String imge_path= "http://10.11.3.3:8080/Sample_Tracker/upload_pdf/";
	    	String filePath = context.getRealPath("upload_pdf/"); 
	    	//String filePath ="C:\\Users\\EHRC\\Desktop\\upload_reports_pdfs";
			
	    	System.out.println("step1-filepath- "+filePath);
			//String filePath = com.nimhans.sample.Sample_Tracker.globals.Path.uploadPdf;
			
	    	//String uploadedFileLocation = filePath+"/"+ fileDetail.getFileName();
	    	
	    	
	    	String uploadedFileLocation="";
	    	if(identifier_id == 1) {
	    		
	    		uploadedFileLocation = filePath+"/"+ np_base+".pdf";
	    		
	    	}else {
	    		
	    		//uploadedFileLocation = filePath+"/"+ fileDetail.getFileName();
	    		uploadedFileLocation = filePath+"/"+ timeStamp+"_"+fileDetail.getFileName();
	    		System.out.println("step5-filepath- "+uploadedFileLocation);
	    	}
	    	
	    	System.out.println("step2-uploadedFileLocation- "+uploadedFileLocation);
	    	
	    	String file_name =np_base+".pdf";
	    	//String uploadedFileLocation = imge_path+fileDetail.getFileName();
	    	
			//String sRootPath = new File("upload_pdf/").getAbsolutePath();
			
	    	System.out.println("step3-np_base- "+np_base);

			if(identifier_id == 1) {
				
				System.out.println("step3-np_232323233base- "+np_base);
				
				rs1.writeToFile(uploadedInputStream, uploadedFileLocation ,file_name,np_base,identifier_id);
				//rs1.writeToFile(uploadedInputStream, uploadedFileLocation ,fileDetail.getFileName(),np_base,identifier_id);
				
			}else {
				
				//fileDetail.getFileName()
				//rs1.writeToFile(uploadedInputStream, uploadedFileLocation ,fileDetail.getFileName(),np_base,identifier_id);
				rs1.writeToFile(uploadedInputStream, uploadedFileLocation ,timeStamp+"_"+fileDetail.getFileName(),np_base,identifier_id);
			}
			// save it
			

			String output = "File uploaded to : " + uploadedFileLocation;
			
			
			return Response.status(200).entity(output).build();
			//return output;

		}
	    
	    //send Pdf file
	    
	    @POST
		@Path("/sendPdf")
		@Consumes(MediaType.MULTIPART_FORM_DATA)
		public Response sendPdf(
			@FormDataParam("email") String email,
			@FormDataParam("npBase") String np_base) {
	    	
	    	System.out.println("email--"+email+"-- np_base--"+np_base);
	    	String rs2 = rs1.getSendPdf(np_base,email);
	    	
				return null;
	    }
	    
	    
	    //get report pdf
	    @POST
	    @Path("/getReportPdfPath")
	    @Consumes(MediaType.TEXT_PLAIN)
		public Response getReportPdfPath(String Np_base) throws IOException, SQLException, JSONException{
	    	 
	    	System.out.println("Path parm- "+Np_base);	
	    	
	    	 String report_pdf_path  = rs1.getReportPdfPath(Np_base);
		    	
		    	
		    	return Response.status(200).entity(report_pdf_path).build();
		}   
	    
	    
	    
	  //Save external lab report as report_Draft
	    @GET
	    @Path("/getTestDetails")
	    @Produces(MediaType.APPLICATION_JSON)
	   // @Consumes(MediaType.APPLICATION_JSON)
		public Response getTestDetails(@QueryParam("test_id")int test_id,@QueryParam("subtest_id")int subtest_id) throws IOException, SQLException, JSONException{
	    	
	    	TestDetails ts = rs1.getTestDetails(test_id,subtest_id);
	    	
	    	return Response.status(200).entity(ts).build();
		}
	      
	    
	  //get list of uploaded images
	    @GET
	    @Path("/deleteFile")
	    @Produces(MediaType.TEXT_PLAIN)
		public String deleteUploadfilefile(@QueryParam("np_upload_id") int np_upload_id) throws IOException {
	    	
	    	//System.out.println("npbase-- "+npbase);
	    	//List<NpUpload> ts = assetService.getlistofimage(npbase);
	    	
	    	return assetService.deleteUploadfilefile(np_upload_id);
			
		}
		
	    
	    
	   
}