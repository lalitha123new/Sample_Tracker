package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.nimhans.sample.Sample_Tracker.globals.Database;

public class BlockDAO extends Database{

	public int addBlock(){
		String query = "insert into block ()value();";
		Statement stmt;
			try {
				stmt = conn.createStatement();
				stmt.execute(query);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		return getLatestBlockId();
	}
	
	private int getLatestBlockId(){
		String responseQuery = "select max(block_id) from block;";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next())
				 return rs.getInt("max(block_id)");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public void deleteBlock(int blockId) {
		// TODO Auto-generated method stub
		String responseQuery="DELETE from block where block_id="+blockId+";";
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

