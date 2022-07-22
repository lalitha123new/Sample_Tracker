package com.nimhans.sample.Sample_Tracker.model;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Slide extends Asset{
	int slide_id;

	public Slide() {
		super();
	}
}
