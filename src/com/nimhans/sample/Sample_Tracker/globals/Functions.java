package com.nimhans.sample.Sample_Tracker.globals;

public class Functions {
	public static String convertNpForServer(String npNumber){
		String requiredFormat = npNumber;
		//requiredFormat = requiredFormat.replace("/", "|");
		System.out.println(" REPLACING / "+ requiredFormat);
		requiredFormat = requiredFormat.replaceAll(" ", "|");
		System.out.println("replacing Space "+ requiredFormat);
		requiredFormat = requiredFormat.replaceAll("-",  "#");
		return requiredFormat;
	}
}
