package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.nimhans.sample.Sample_Tracker.globals.Database;

public class SlideDAO extends Database{

	public int addSlide(){
		//add new slide to slide table returns recently added slide_id
		String query = "insert into slide ()value();";
		Statement stmt;
			try {
				stmt = conn.createStatement();
				stmt.execute(query);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		return getLatestSlideId();
	}
	
	private int getLatestSlideId(){
		//return recently added slide_id
		String responseQuery = "select max(slide_id) from slide;";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next())
				 return rs.getInt("max(slide_id)");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public void deleteslide(int slideId) {
		// TODO Auto-generated method stub
		String responseQuery="DELETE from slide where slide_id="+slideId+";";
		Statement stmt;
		try{			
			stmt=conn.createStatement();
			stmt.execute(responseQuery);
		}
		catch(SQLException e){
			e.printStackTrace();
		}
	}

}

