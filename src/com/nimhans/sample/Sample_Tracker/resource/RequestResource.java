package com.nimhans.sample.Sample_Tracker.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.globals.Functions;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Patient;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.model.SearchDetails;
import com.nimhans.sample.Sample_Tracker.model.Transaction;
import com.nimhans.sample.Sample_Tracker.service.RequestService;
import com.nimhans.sample.Sample_Tracker.service.SoapService;
import com.nimhans.sample.Sample_Tracker.service.TransactionService;

@Path("/requests")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RequestResource {

	RequestService requestService = new RequestService();
	TransactionService transactionService = new TransactionService();

	public RequestResource() {
		Database.run();
	}

	/*
	 * @SuppressWarnings("unused")
	 */
	@GET
	@Path("/soap")
	public Response getpatientDetails(@QueryParam("samplerequestid") String sampleRequestId,
			@QueryParam("npNumber") String npNumberBase) {
		// In receiving Station and Grossing Station, After Scanning the bar code,
		// populate the table with the info from the soap call

		// Make call to SOAP E-Hospital Interface
		/*
		 * To test actual soap interface, uncomment below statement Comment the
		 * statement that creates a new Patient below it
		 *
		 */
		System.out.println("calling here");

		String sampleRequest = sampleRequestId;
		System.out.println(sampleRequest + "I am ");
		if (sampleRequest == null) {

			System.out.println(sampleRequest + "I am here");

			String np = Functions.convertNpForServer(npNumberBase);
			sampleRequest = requestService.getSampleRequestID(np);
			System.out.println("Hrer");

			System.out.println(sampleRequest + "I am here");
			sampleRequestId = sampleRequest;

		}

		// Patient patient = new Patient("EXT2016080600128", "Raja Ram Mohan Roy", 42,
		// "M", sampleRequest, "Dr. Suresh", "15-08-1947 12:00:02am ", "N12539",
		// "National Institute of Mental Health and NeuroSciences NS-I",
		// "Neuropathology","NS II");
		Patient patient = SoapService.test(sampleRequestId);
		if (patient == null) {
			return Response.status(Status.BAD_REQUEST).entity("Patient Data is unavailable").build();
		}
		// Check if NP Number already exits for given RequestID.
		String npNumber = requestService.requestExists(sampleRequestId);
		String uhid = patient.getUHID();
		String UniqueNpNumber = requestService.requestExistsForUhid(uhid);
		patient.setNpBase(npNumber);
		patient.setUniqueNpBase(UniqueNpNumber);
		System.out.println("UniqueNpNumber is " + UniqueNpNumber);
		return Response.ok().entity(patient).build();
	}

	@GET
	@Path("/next")
	@Consumes(MediaType.TEXT_HTML)
	@Produces(MediaType.TEXT_HTML)
	public Response getNpSuggestion(@QueryParam("external") int external) {

		/*
		 *
		 * Gives the suggestion for the next possible NP Number Base taking into
		 * consideration if its external or internal. This suggestion is used for
		 * creating new NP Number
		 *
		 */
		System.out.println("RequestResource--" + external);

		String nextNpNumberBase = requestService.nextNpBase(external);
		return Response.ok().entity(nextNpNumberBase).build();
	}

	@POST
	public Response generateNpBase(Request request) {

		/*
		 * Takes in a request. new Request entered in database with requestID.
		 */

		if (requestService.validateNpBase(request.getNpBase())) {
			Request generatedRequest = requestService.generateRequest(request);
			return Response.ok().entity(generatedRequest).build();
		}
		return Response.status(Status.BAD_REQUEST).entity("Requested NP Number cant be generated").build();
	}

	@PUT
	public Response updateRequest(Request request) {
		// Update in receiving Station so keeping # extra in function of generating NP
		// Number
		requestService.updateRequest(request);
		return Response.ok().entity("sucess").build();
	}

	@GET
	public Response getRequestDetails(@QueryParam("npbase") String npBase) {
		String convertedNpBase = Functions.convertNpForServer(npBase);
		Request request = requestService.getRequestDetails(convertedNpBase);
		return Response.ok().entity(request).build();
	}
	

	@GET
	@Path("/withpname")
	public List<Request> getRequestDetailsOfPatient(@QueryParam("pName") String pName) {
		System.out.println("Hi i am in withpname");
		return requestService.getRequestDetailsOfPatient(pName);

	}

	// to get patient details based on search parms
	@POST
	@Path("/withAllSearchDetails")
	public List<Request> getSearchPatientDetails(SearchDetails sd) {

		List<Request> l1 = requestService.getSearchRequestDetailsOfPatient(sd);

		return l1;

	}

	@GET
	@Path("/withUhid")
	public List<Request> getRequestDetailsOfPatientByUhid(@QueryParam("uhid") String uhid) {
		return requestService.getRequestDetailsOfPatientByUhid(uhid);

	}

	@GET
	@Path("/unlinked")
	public List<Request> getRequestDetails() {
		// List<Request> requests=new ArrayList<>();
		System.out.println("Hai i am in getrequest");
		// requests = requestService.getRequestDetails();
		return requestService.getRequestDetails();
		/*
		 * return Response.ok() .entity(requests) .build();
		 */
	}

	@GET
	@Path("/transactions")
	public List<Transaction> getAllTransactions(@QueryParam("npNumber") String npNumber,@QueryParam("year") String createdAt) {
		// List<Request> requests=new ArrayList<>();
		System.out.println("Hai i am in getTranz");
		// requests = requestService.getRequestDetails();
		return transactionService.getAllTransaction(npNumber,createdAt);
		/*
		 * return Response.ok() .entity(requests) .build();
		 */
	}

	@GET
	@Path("/getactivity")
	public List<Transaction> getNcsAssets(@QueryParam("stationId") int stationId,
			@QueryParam("technicianName") String techName, @QueryParam("assetType") int type,
			@QueryParam("startDate") String startDate, @QueryParam("endDate") String endDate) {
		System.out.println("inside search of  resource trans ");

		return transactionService.getActivitylogs(stationId, techName, type, startDate, endDate);
	}
	
	@GET
	@Path("/updateDept")
	public String updateDept(@QueryParam("min") int min, @QueryParam("max") int max) {
		
		
		String str1 = requestService.updatedept(min,max);
		
		return str1;
	}
	
	
}
