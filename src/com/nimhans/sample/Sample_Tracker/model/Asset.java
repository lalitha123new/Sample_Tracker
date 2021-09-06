package com.nimhans.sample.Sample_Tracker.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Asset {
	
	protected String npNumber;
	protected int currentState;
	protected int nextState;
	protected int done;
	protected int type;
	protected int type_id;
	protected int request_id;
	protected String specimen;
	protected String fixative;
	protected String biopsy;
	protected int assetId;
	protected String created;
	protected String review;
	protected String special_stain;
	protected String notes;
	protected String corrective;
	protected String preventive;
	protected String faculty;
	protected String ncsType;
	protected String ihc;
	 
	protected String technician_name;


	public String getTechnician_name() {
		return technician_name;
	}


	public void setTechnician_name(String technician_name) {
		this.technician_name = technician_name;
	}


	protected int ncs;
	protected int special;
	protected int em;
	
	protected int process_all;
	protected int process_more;
	
	


	protected String process_status;
	protected String stain_name;
	
	protected String block_others;
    protected String start_time;
	
	private String createdAt;
	
	private int quantity;
	
	


	public String getBlock_others() {
		return block_others;
	}


	public void setBlock_others(String block_others) {
		this.block_others = block_others;
	}


	
	
	




	


	public String getStart_time() {
		return start_time;
	}


	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}


	public String getStain_name() {
		return stain_name;
	}


	public void setStain_name(String stain_name) {
		this.stain_name = stain_name;
	}


	//CONSTRUCTORS
	public Asset(){}
	

	public Asset(String npNumber, int currentState, int nextState, int done, int type, int type_id, int request_id,
			String specimen, String fixative, String biopsy,String review,String process_status,String stain_name
			,String special_stain,String ihc,int em,int process_all,int process_more,String createdAt) {
		super();
		this.npNumber = npNumber;
		this.currentState = currentState;
		this.nextState = nextState;
		this.done = done;
		this.type = type;
		this.type_id = type_id;
		this.request_id = request_id;
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.createdAt = createdAt;
		this.review = review;
		this.process_status = process_status;
		this.stain_name = stain_name;
		this.special_stain =  special_stain;
		this.ihc = ihc;
		this.em = em;
		this.process_all = process_all;
		this.process_more = process_more;
	}
  
//	//search data with date
	public Asset(String npNumber, int currentState, int nextState, int done, int type, int type_id, int request_id,
			String specimen, String fixative, String biopsy , int assetid ,String review,int ncs,int special,String process_status, String stain_name,String start_time) {
		super();
		this.npNumber = npNumber;
		this.currentState = currentState;
		this.nextState = nextState;
		this.done = done;
		this.type = type;
		this.type_id = type_id;
		this.request_id = request_id;
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.assetId=assetid;
		this.created = "helo created4";
		this.review =review;
		this.ncs = ncs;
		this.special = special;
		this.process_status = process_status;
		this.stain_name = stain_name;
		this.start_time=start_time;
	}
  
	
	
	public Asset(int currentState){
		
		super();
		this.currentState = currentState;
	}
	
	//externalTraxcker 
	public Asset(String specimen, String fixative, String biopsy,String review,int quantity) {
		super();
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.quantity = quantity;
		this.review = review;
	}

	
	public Asset(String npNumber, int currentState, int nextState, int done, int type, int type_id, int request_id,
			String specimen, String fixative, String biopsy,String review,String special_stain,String notes,String ihc) {
		super();
		this.npNumber = npNumber;
		this.currentState = currentState;
		this.nextState = nextState;
		this.done = done;
		this.type = type;
		this.type_id = type_id;
		this.request_id = request_id;
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.created = "helo created5";
		this.review = review;
		this.special_stain = special_stain;
		this.notes = notes;
		this.ihc = ihc;
	}
	
	public Asset(String npNumber, int currentState, int nextState, int done, int type, int type_id, int request_id,
			String specimen, String fixative, String biopsy , int assetid ,String review,int ncs,int special,String process_status, String stain_name,
			String special_stain,String ihc,int em,int process_all,int process_more,String createdAt) {
		super();
		this.npNumber = npNumber;
		this.currentState = currentState;
		this.nextState = nextState;
		this.done = done;
		this.type = type;
		this.type_id = type_id;
		this.request_id = request_id;
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.assetId=assetid;
		this.created = "helo created1";
		this.review =review;
		this.ncs = ncs;
		this.special = special;
		this.process_status = process_status;
		this.stain_name = stain_name;
		this.special_stain =  special_stain;
		this.ihc = ihc;
		this.em = em;
		this.process_all = process_all;
		this.process_more = process_more;
		this.createdAt =createdAt;
	}
	
	public Asset(String npNumber,String corrective,String preventive,String faculty,String ncsType,String technician_name) {
		super();
		this.npNumber = npNumber;
		this.corrective = corrective;
		this.preventive = preventive;
		this.faculty = faculty;
		this.ncsType = ncsType;
		this.technician_name = technician_name;
		
	}
	public Asset(String specimen, String special_stain, int request_id, String ihc, String npNumber, int currentState,
			int nextState, String fixative,String biopsy, int type,String review, int special,int ncs, String process_status,
			String notes, int done, int process_all,int em){
		
		super();
		this.request_id= request_id;
		this.special_stain = special_stain;
		this.specimen = specimen;
		this.ihc= ihc;
		this.npNumber= npNumber;
		this.currentState=currentState;
		this.nextState=nextState;
		this.fixative=fixative;
		this.biopsy=biopsy;
		this.type=type;
		this.review=review;
		this.special=special;
		this.ncs=ncs;
		this.process_status=process_status;
		this.notes=notes;
		this.done=done;
		this.process_all=process_all;
		this.em=em;	
		
	}
	
	
	
	public Asset(String npNumber, int currentState, int nextState, int done, int type, int type_id, int request_id,
			String specimen, String fixative, String biopsy,String review,String special_stain,String notes,String ihc,int process_all,int em ,int process_more,String block_others,String createdAt) {
		super();
		this.npNumber = npNumber;
		this.currentState = currentState;
		this.nextState = nextState;
		this.done = done;
		this.type = type;
		this.type_id = type_id;
		this.request_id = request_id;
		this.specimen = specimen;
		this.fixative = fixative;
		this.biopsy = biopsy;
		this.created = "helo created2";
		this.review = review;
		this.special_stain = special_stain;
		this.notes = notes;
		this.ihc = ihc;
		this.process_all = process_all;
		this.em = em;
		this.process_more = process_more;
		this.block_others = block_others;
		this.createdAt = createdAt;
	}

	//GETTERS AND SETTERS


	


	public String getCreated() {
		return created;
	}


	public void setCreated(String created) {
		this.created = created;
	}
		
	public int getAssetId() {
		return assetId;
	}


	public void setAssetId(int assetId) {
		this.assetId = assetId;
	}
	public int getType_id() {
		return type_id;
	}
	public int getType() {
		return type;
	}
	public void setType_id(int type_id) {
		this.type_id = type_id;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getCurrentState() {
		return currentState;
	}
	public String getNpNumber() {
		return npNumber;
	}
	public void setNpNumber(String npNumber) {
		this.npNumber = npNumber;
	}
	public int getDone() {
		return done;
	}
	public void setDone(int done) {
		this.done = done;
	}
	public int getRequest_id() {
		return request_id;
	}
	public void setRequest_id(int request_id) {
		this.request_id = request_id;
	}
	public String getSpecimen() {
		return specimen;
	}
	public void setSpecimen(String specimen) {
		this.specimen = specimen;
	}
	public String getFixative() {
		return fixative;
	}
	public void setFixative(String fixative) {
		this.fixative = fixative;
	}
	public String getBiopsy() {
		return biopsy;
	}
	public void setBiopsy(String biopsy) {
		this.biopsy = biopsy;
	}
	public void setCurrentState(int currentState) {
		this.currentState = currentState;
	}
	public int getNextState() {
		return nextState;
	}
	public void setNextState(int nextState) {
		this.nextState = nextState;
	}
	public String getReview(){
		return review;
	}
	public void setReview(String review){
		this.review=review;
	}
	public String getSpecial_stain(){
		return special_stain;
	}
	public void setSpecial_stain(String special_stain){
		this.special_stain = special_stain;
	}
	public String getNotes(){
		return notes;
	}
	public void setNotes(String notes){
		this.notes = notes;
	}
	public String getCorrective(){
		return corrective;
	}
	public void setCorrective(String corrective){
		this.corrective = corrective;
	}
	public String getPreventive(){
		return preventive;
	}
	public void setPreventive(String preventive){
		this.preventive = preventive;
	}
	public String getFaculty(){
		return faculty;
	}
	public void setFaculty(String faculty){
		this.faculty = faculty;
	}
	public String getNcsType(){
		return ncsType;
	}
	public void setNcsType(String ncsType){
		this.ncsType = ncsType;
	}
	public String getIhc(){
		return ihc;
	}
	public void setIhc(String ihc){
		this.ihc = ihc;
	}
	public int getNcs(){
		return ncs;
	}
	public void setNcs(int ncs){
		this.ncs = ncs;
	}
	public int getSpecial(){
		return special;
	}
	public void setSpecial(int special){
		this.special = special;
	}
	public String getProcess_status() {
		return process_status;
	}
	public void setProcess_status(String process_status) {
		this.process_status = process_status;
	}

	public int getEm() {
		return em;
	}


	public void setEm(int em) {
		this.em = em;
	}


	public int getProcess_all() {
		return process_all;
	}


	public void setProcess_all(int process_all) {
		this.process_all = process_all;
	}
	
	public int getProcess_more() {
		return process_more;
	}


	public void setProcess_more(int process_more) {
		this.process_more = process_more;
	}
	
	public String getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
