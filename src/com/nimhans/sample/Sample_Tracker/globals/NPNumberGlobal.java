package com.nimhans.sample.Sample_Tracker.globals;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.StringTokenizer;

import com.nimhans.sample.Sample_Tracker.DataBase.NpBaseDao;

public class NPNumberGlobal extends Database{
	
	NpBaseDao npBaseDb = new NpBaseDao();
	
	//Generate next NP Base interacting with DAO depending on internal or external
	public String getNextNpBase(){	
		
		System.out.println("npNumberGlobel-internal-");
		//Next internal Suggestion
		StringTokenizer st = new StringTokenizer(npBaseDb.getCurrentNpBase(0),"/");  
	    int next = Integer.parseInt(st.nextToken());  
		next++;
		
		//Year handling 
		String year = st.nextToken();
		Calendar now=Calendar.getInstance();
		String currentYear = String.valueOf(now.get(Calendar.YEAR)).substring(2, 4);
		
		if(year.equals(currentYear))
		    return String.valueOf(next)+"/"+year;
		else
			return "1/"+currentYear;
	}
	
	public String getNextExternalNpBase(){
		//Next External Suggestion.
		System.out.println("npNumberGlobel-External-");
		String currentExternalNpBase = npBaseDb.getCurrentNpBase(1).replace("X","");
		StringTokenizer st = new StringTokenizer(currentExternalNpBase,"/");  
	    int next = Integer.parseInt(st.nextToken());  
		next++;
		System.out.println("Next:"+next);
		//Year handling 
		String year = st.nextToken();
		Calendar now=Calendar.getInstance();
		String currentYear = String.valueOf(now.get(Calendar.YEAR)).substring(2,4);
		
		if(year.equals(currentYear))
			return "X"+String.valueOf(next)+"/"+year;
		else
			return "X1/"+currentYear;
	}
	
	public void setNextNpBase(String npBase){
		//updates the NPBase value assuming validation is taken care in Client
		if(npBase.startsWith("X")){
			String postedExternalNpBase = npBase.replace("X","");
			StringTokenizer st = new StringTokenizer(postedExternalNpBase,"/");  
		    int posted = Integer.parseInt(st.nextToken());
			String currentExternalNpBase = getNextExternalNpBase().replace("X","");
			StringTokenizer suggested = new StringTokenizer(currentExternalNpBase,"/");  
		    int suggestedInt = Integer.parseInt(suggested.nextToken());
			if (suggestedInt<=posted)
			npBaseDb.setNpBase(npBase,1);
		}
		else{
			StringTokenizer st = new StringTokenizer(npBase,"/");  
			int posted = Integer.parseInt(st.nextToken());
			String currentNpBase = getNextNpBase();
			StringTokenizer suggested = new StringTokenizer(currentNpBase,"/");  
			int suggestedInt = Integer.parseInt(suggested.nextToken()); 
			if (suggestedInt<=posted)
			npBaseDb.setNpBase(npBase,0);
		}
	}
	
	public boolean validate(String npBase){
		if(npBase.startsWith("X")){
			String postedExternalNpBase = npBase.replace("X","");
			StringTokenizer st = new StringTokenizer(postedExternalNpBase,"/");  
		    int posted = Integer.parseInt(st.nextToken());  
		    String currentExternalNpBase = getNextExternalNpBase().replace("X","");
			StringTokenizer suggested = new StringTokenizer(currentExternalNpBase,"/");  
		    int suggestedInt = Integer.parseInt(suggested.nextToken());  
		   /* if(suggestedInt<=posted)
				return true;
			return false;*/
		    try {
				String query="select np_base from request where np_base ='"+npBase+"';";
				Statement stmt = conn.createStatement();
				ResultSet rs= stmt.executeQuery(query);
				System.out.println("validate query"+rs);
				if(suggestedInt<=posted||!rs.next() )
					return true;
				return false;
		    }
			catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
		StringTokenizer st = new StringTokenizer(npBase,"/");  
		int posted = Integer.parseInt(st.nextToken());
		String currentNpBase = getNextNpBase();
		StringTokenizer suggested = new StringTokenizer(currentNpBase,"/");  
		int suggestedInt = Integer.parseInt(suggested.nextToken()); 
		/*if(suggestedInt<=posted)
			return true;
		return false;*/
		try {
		String query="select np_base from request where np_base ='"+npBase+"';";
		Statement stmt = conn.createStatement();
		ResultSet rs= stmt.executeQuery(query);
		System.out.println("validate query"+rs);
		if(suggestedInt<=posted||!rs.next())
			{
			System.out.println("inside validate2 "+!rs.isBeforeFirst());
			return true;
			}
		return false;
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return false;
		}
}
