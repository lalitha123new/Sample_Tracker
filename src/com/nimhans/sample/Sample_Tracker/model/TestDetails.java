package com.nimhans.sample.Sample_Tracker.model;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TestDetails {
	
	
	private String fixative;
	private String testname;
	private int test_details_id;
	private int test_id;
	private int subtest_id;
	private String biopsy_type;
	private String specimen;
	
	
	
	

	public TestDetails(){
		super();
	}
	
	
	public String getFixative() {
		return fixative;
	}
	
	public void setFixative(String fixative) {
		this.fixative = fixative;
	}
	public String getTestname() {
		return testname;
	}
	public void setTestname(String testname) {
		this.testname = testname;
	}
	public int getTest_details_id() {
		return test_details_id;
	}
	public void setTest_details_id(int test_details_id) {
		this.test_details_id = test_details_id;
	}
	public int getTest_id() {
		return test_id;
	}
	public void setTest_id(int test_id) {
		this.test_id = test_id;
	}
	public int getSubtest_id() {
		return subtest_id;
	}
	public void setSubtest_id(int subtest_id) {
		this.subtest_id = subtest_id;
	}
	public String getBiopsy_type() {
		return biopsy_type;
	}
	public void setBiopsy_type(String biopsy_type) {
		this.biopsy_type = biopsy_type;
	}
	public String getSpecimen() {
		return specimen;
	}
	public void setSpecimen(String specimen) {
		this.specimen = specimen;
	}	
	
	
	
	public TestDetails( String fixative,
	 String testname,
	 int test_details_id,
	 int test_id,
	 int subtest_id,
	 String biopsy_type,
	 String specimen) {
		super();
		this.fixative = fixative;
		this.testname = testname;
		this.test_details_id = test_details_id;
		this.subtest_id = subtest_id;
		this.test_id = test_id;
		this.biopsy_type = biopsy_type;
		this.specimen = specimen;
	}
	
	
	
}
