package com.nimhans.sample.Sample_Tracker.service;
import java.util.StringTokenizer;

import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.*;

import com.nimhans.sample.Sample_Tracker.model.Patient;

import servicecontainer.*;

public class SoapService {

	public static String getSampleInfo1(String sampleId) {
		String response1 = "";
		NIMHANSServiceContainerExtra_Service ns = new NIMHANSServiceContainerExtra_Service();
		NIMHANSServiceContainerExtra np = ns.getNIMHANSServiceContainerExtraPort();
		try {
			response1 = np.getUHIDDetailsOfSampleBySampleNo("dG9rZW5Ad2ViQGFwcG9pbnQjbmlj", sampleId);
		} catch (Exception ex) {
			System.out.println("Error: possible bad sample id --" + ex);
			
		}
		return response1;
	}
	
	public static String getPatientInfo(String uhid) {
		String response = "";
		try {
			NIMHANSServiceContainerExtra_Service ns = new NIMHANSServiceContainerExtra_Service();
			NIMHANSServiceContainerExtra np = ns.getNIMHANSServiceContainerExtraPort();
			response = np.getPatDetailsByRegno("dG9rZW5Ad2ViQGFwcG9pbnQjbmlj", uhid, 0);
		} catch (Exception ex) {

			System.out.println("Error: possible bad UHID --" + ex);
		}
		return response;
	}

	public static Patient test(String sampleId) {
		String response = getSampleInfo1(sampleId);
		
		// extract UHID from this data and get Patient Info from that
		JSONParser parser = new JSONParser();
	    JSONObject obj = null;
		try {
			obj = (JSONObject) parser.parse(response);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JSONArray dataArray = (JSONArray)obj.get("data");
		JSONObject obj2 = (JSONObject)dataArray.get(0);
		
		String UHID = (String)obj2.get("reg_no");
		String patientInfo = getPatientInfo(UHID);
		JSONParser patientParser = new JSONParser();
	    JSONObject object = null;
		try {
			object = (JSONObject) patientParser.parse(patientInfo);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JSONArray dataArray2 = (JSONArray)object.get("data");
		JSONObject object2 = (JSONObject)dataArray2.get(0);
		
		StringTokenizer st = new StringTokenizer((String)object2.get("p_age")," ");  
	    int age = Integer.parseInt(st.nextToken());  
	
	    Patient patient = new Patient(UHID,(String)object2.get("p_name"),age,(String)object2.get("p_sex"),sampleId,(String)obj2.get("order_by_name"),(String)obj2.get("ent_time"),(String)object2.get("mrd_file_no"),(String)obj2.get("h_desc"),(String)object2.get("dept_name"),(String)object2.get("unit_name"));
		
	    if(patient.getUHID().startsWith("EXT"))
			patient.setExternal(1);
		//returns a patient with all required fields
		return patient;	
	}	
}
