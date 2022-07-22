package com.nimhans.sample.Sample_Tracker.service;

import java.util.List;

import com.nimhans.sample.Sample_Tracker.DataBase.RequestDAO;
import com.nimhans.sample.Sample_Tracker.globals.NPNumberGlobal;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.model.SearchDetails;

public class RequestService {
RequestDAO requestDB = new RequestDAO();

NPNumberGlobal npNumberGlobal = new NPNumberGlobal();
TransactionService transactionService = new TransactionService();

public String requestExists(String sampleRequestId){
int requestId = requestDB.getRequestId(sampleRequestId);
if(requestId>0){
return requestDB.getNpBase(requestId);
}
return null;
}
public String requestExistsForUhid(String uhid){
int requestId = requestDB.getRequestIdByUhid(uhid);
if(requestId>0){
System.out.println("Hi iam inside requestExistsForUhid");
return requestDB.getNpBase(requestId);
}
return null;
}

public String getSampleRequestID(String npNumber){
System.out.println("I am here in GET SAM"+npNumber);
return requestDB.getSampleRequestIdByNpNumber(npNumber);
}

public String nextNpBase(int external){
//Generate new NPBase Suggestion
if(external==1) {
System.out.println("RequestService-if-"+external);
return npNumberGlobal.getNextExternalNpBase();


}else {
System.out.println("RequestService-else-"+external);
return npNumberGlobal.getNextNpBase();
}
}

public boolean validateNpBase(String npBase){
//Validates the NP Number Base
if(npNumberGlobal.validate(npBase))
return true;
return false;
}

public Request generateRequest(Request request){
//add a new Request, create mapping between hospital and NP Lab details in Request Table
npNumberGlobal.setNextNpBase(request.getNpBase());
int requestId = requestDB.genrateNpRequest(request);
request.setRequestId(requestId);
return request;
}

public Request getRequestDetails(String npBase){
return requestDB.getRequest(npBase);
}

public List<Request> getRequestDetailsOfPatient(String pName){
return requestDB.getRequestWithpName(pName);
}
public List<Request> getRequestDetailsOfPatientByUhid(String uhid){
return requestDB.getRequestWithUhid(uhid);
}
public List<Request> getRequestDetails(){
System.out.println("Hai i am in request service");
return requestDB.getRequestForUnlinked();
}
public Request updateRequest(Request request) {
requestDB.updateRequest(request);
return null;
}
public List<Request> getSearchRequestDetailsOfPatient(SearchDetails sd) {
// TODO Auto-generated method stub
return requestDB.getSearchRequestDetailsOfPatient(sd);
//return null;
}

public String updatedept(int min,int max){
System.out.println("Hai i am in request service");
 String Str1=requestDB.deptUpdate(min,max);
return Str1;
}

}