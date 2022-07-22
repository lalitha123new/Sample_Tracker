package com.nimhans.sample.Sample_Tracker.DataBase;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.nimhans.sample.Sample_Tracker.globals.Database;

public class TissueDAO extends Database{

	public int addTissue(){
		
		String query = "insert into tissue ()value();";
		Statement stmt;
			try {
				stmt = conn.createStatement();
				stmt.execute(query);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		return getLatestTissueId();
	}
	
	private int getLatestTissueId(){
		String responseQuery = "select max(tissue_id) from tissue;";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next())
				 return rs.getInt("max(tissue_id)");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}
	public void deleteTissue(int tissueId) {
		// TODO Auto-generated method stub
		String responseQuery="DELETE from tissue where tissue_id="+tissueId+";";
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
