package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.nimhans.sample.Sample_Tracker.globals.Database;

public class NpBaseDao extends Database{
	
	public String getCurrentNpBase(int external){
		//Query Database and give the next possible Np Number
		external++;
		String responseQuery = "SELECT np_base from np_global where external="+external+";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next())
				 return rs.getString("np_base");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void setNpBase(String np_base,int external){
		external++;
		String responseQuery = "update np_global set np_base=\""+np_base+"\" where external = "+external+";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
