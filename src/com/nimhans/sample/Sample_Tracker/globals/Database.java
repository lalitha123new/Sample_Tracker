package com.nimhans.sample.Sample_Tracker.globals;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;


public class Database{

	/** The name of the MySQL account to use (or empty for anonymous) */
	private static final String userName = "root";

	/** The password for the MySQL account (or empty for anonymous) */
	
	//local db
	private static final String password = "";
	
	
	//NIMHANS DB
	//private static final String password = "thanks@123";
	//NIMHANS DB-thanks@123
	//simhaDB-AWSCV19@rt
	
	//private static final String password = "";
	//private static final String password = "nilay";
	//private static final String password = "root"

	/** The name of the computer running MySQL */
	private static final String serverName = "localhost";

	/** The port of the MySQL server (default is 3306) */
	private static final int portNumber = 3306;

	/** The name of the database we are testing with (this default is installed with MySQL) */
	//local db
	
	private static final String dbName = "sampletracker_test";
	
	//NIMHANS db
	//private static final String dbName = "sampleTrackerDB";
	
	
	public static Connection conn= null;

	protected static Connection getConnection() throws SQLException {
		Connection conn1 = null;
		Properties connectionProps = new Properties();
		connectionProps.put("user",userName);
		connectionProps.put("password", password);
		connectionProps.put("useSSL", "false");
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		conn1 = DriverManager.getConnection("jdbc:mysql://"
				+ serverName + ":" + portNumber + "/" + dbName,
				connectionProps);
		if(conn1==null)
			throw new SQLException();
		return conn1;
	}

	public static void run() {
		// CONNECT to MySQL
		try {
			if(conn==null)
				conn = getConnection();
			
			if(conn.isClosed()){
				conn=getConnection();
				System.out.println("Database connected again");		
			}	
			
			System.out.println("Connected to database");
		} catch (SQLException e) {
			System.out.println("This ERROR: Could not connect to the database");
			e.printStackTrace();
			return;
		}
	}
	public static boolean connected() {
		return (conn!=null);
	}
	public  static void main(String []ww){
	}
}
