package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Transaction;

public class TransactionDAO extends Database {

	public void addTransaction(Transaction transaction){
		String query = "insert into transaction(technician_id,station_id,asset_id,np_number,assistant_id,start_time) values  (?,?,?,?,?,now());";
		PreparedStatement preparedStatement;
		try {
			preparedStatement = RequestDAO.conn.prepareStatement(query);
			preparedStatement.setInt(1,transaction.getTechnicianId());
	 		preparedStatement.setInt(2, transaction.getStationId());
			preparedStatement.setInt(3,transaction.getAssetId());
			preparedStatement.setString(4, transaction.getNpNumber());
			preparedStatement.setInt(5, transaction.getAssistantId());
			preparedStatement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public List<Transaction> getAllTransaction(String npBaseNumber,String createdAt){
		List<Transaction> transactions=new ArrayList<>();
		try {
			String query="select * from transaction where np_number like '"+npBaseNumber+"%' and start_time  like '"+createdAt+"%' and end_time  like '"+createdAt+"%' order by end_time desc ;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Transaction transaction= new Transaction(rs.getInt("technician_id"), rs.getInt("station_id"), rs.getString("np_number"),rs.getInt("assistant_id"),rs.getString("start_time"), rs.getString("end_time"));	
				transactions.add(transaction);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return transactions;
	}
	/*public int getTransactionId(int station_id, int asset_id){
		// StationId and assetID make unique transaction
		String responseQuery = "select transaction_id from transaction where station_id="+station_id+" and asset_id="+asset_id+";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(responseQuery);
			while(rs.next())
				 return rs.getInt("transaction_id");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}*/
	public void endTranaction(int station_id, String npNumber){
		//updates the end time in a transaction based on asset and station is unique
		String responseQuery = "update transaction set end_time = now() where station_id="+station_id+" and np_number = '"+npNumber+"';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public List<Transaction> getActivitylogs(int stationId, int techId,int asset_type, String startDate, String endDate) {

		List<Transaction> transactions = new ArrayList<>();
		
		Object station_Id;
		Object tech;
		Object type;
		tech = techId == 0 ? "%" : techId;
		station_Id = stationId == 0 ? "%" : stationId;
		type = asset_type == 0 ? "%" : asset_type;

		try {

			String query = "select * from transaction LEFT JOIN asset ON  transaction.np_number=asset.np_number where station_id like '"
					+ station_Id + "' and technician_id like '" + tech + "' and asset_type like '" + type + "' and end_time >='" + startDate
					+ " ' and end_time <='" + endDate + "' order by end_time desc;";

			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			while (rs.next()) {
				Transaction transaction = new Transaction(rs.getString("np_number"), rs.getString("end_time"),
						rs.getString("start_time"), rs.getInt("ncs"), rs.getInt("special"),rs.getInt("technician_id"),rs.getInt("assistant_id"),rs.getInt("station_id"),rs.getString("biopsy_type"),rs.getInt("asset_type"),rs.getString("process_status"));
				transactions.add(transaction);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return transactions;
	}
}