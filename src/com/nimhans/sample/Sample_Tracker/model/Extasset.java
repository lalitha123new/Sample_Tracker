package com.nimhans.sample.Sample_Tracker.model;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Extasset {
	
	
	private String specimen;
	


	private String fixative;
	private String sample_type;
	private String sample_site;
	private String ref_no;
	private int sample_quantity;
	
	
	
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

	public String getSample_type() {
		return sample_type;
	}


	public void setSample_type(String sample_type) {
		this.sample_type = sample_type;
	}


	public String getSample_site() {
		return sample_site;
	}


	public void setSample_site(String sample_site) {
		this.sample_site = sample_site;
	}


	public String getRef_no() {
		return ref_no;
	}


	public void setRef_no(String ref_no) {
		this.ref_no = ref_no;
	}


	public int getSample_quantity() {
		return sample_quantity;
	}


	public void setSample_quantity(int sample_quantity) {
		this.sample_quantity = sample_quantity;
	}
	
	//CONSTRUCTORS
		public Extasset(){}
		

		public Extasset(
				String specimen, String fixative, String sample_site,String ref_no,String sample_type,int sample_quantity) {
			super();
			
			this.specimen = specimen;
			this.fixative = fixative;
			this.sample_site = sample_site;
			this.sample_quantity = sample_quantity;
			this.ref_no = ref_no;
			this.sample_type = sample_type;
			
		}
	
}
