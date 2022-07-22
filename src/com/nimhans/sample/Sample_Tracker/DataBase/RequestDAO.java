package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Patient;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.model.SearchDetails;
import com.nimhans.sample.Sample_Tracker.service.SoapService;

public class RequestDAO extends Database {
	public int genrateNpRequest(Request request) {
	
		String query = "insert into request(sample_request_id, np_base,uhid,patient_name,surgeon,patient_sex,patient_age,created,department_name,unit_name) values (?,?,?,?,?,?,?,now(),?,?);";
		PreparedStatement preparedStatement;
		
		System.out.println("CHECKING");
		System.out.println("GENDER--" + request.getPatientSex());
		try {
			preparedStatement = RequestDAO.conn.prepareStatement(query);
			preparedStatement.setString(1, request.getSampleRequestId());
			preparedStatement.setString(2, request.getNpBase());
			preparedStatement.setString(3, request.getUHID());
			preparedStatement.setString(4, request.getPatientName());
			preparedStatement.setString(5, request.getSurgeon());
			preparedStatement.setInt(6, request.getPatientSex());
			preparedStatement.setString(7, request.getPatientAge());
			preparedStatement.setString(8, request.getDepartment_name());
			preparedStatement.setString(9, request.getUnit_name());
			preparedStatement.execute();
			return getRequestId(request.getSampleRequestId());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
//return the request_id , that is the row number of the newly added resource
	}

	public int getRequestId(String sampleRequestId) {
		String responseQuery = "SELECT request_id from request where sample_request_id=\"" + sampleRequestId + "\";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next())
				return rs.getInt("request_id");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public int getRequestIdByUhid(String uhid) {
		String responseQuery = "SELECT request_id from request where uhid=\"" + uhid + "\";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next())
				return rs.getInt("request_id");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	public String getSampleRequestIdByNpNumber(String npNumber) {
		String responseQuery = "SELECT sample_request_id from request where np_base=\"" + npNumber + "\";";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next())
				return rs.getString("sample_request_id");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getNpBase(int requestId) {
		String responseQuery = "SELECT np_base from request where request_id=\"" + requestId + "\";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next())
				return rs.getString("np_base");
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Request getRequest(String npBase) {
		//String responseQuery = "SELECT * from request where np_base=\"" + npBase + "\";";
		String responseQuery="SELECT request.*, asset.* \n" + 
				"FROM request\n" + 
				"INNER JOIN asset ON (request.np_base = asset.np_number)   where request.np_base =\"" + npBase + "\";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next()) {
				Request request = new Request(rs.getString("sample_request_id"), rs.getString("np_base"),
						rs.getString("uhid"), rs.getString("surgeon"), rs.getString("patient_name"),
						rs.getInt("patient_sex"), rs.getString("patient_age"), rs.getInt("request_id"),
						rs.getString("created"), rs.getString("unit_name"), rs.getString("department_name"),rs.getInt("asset_id"),rs.getString("biopsy_type"),rs.getInt("current_state"),rs.getInt("next_state"));
				return request;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	

	public List<Request> getRequestWithpName(String pName) {
		List<Request> requests = new ArrayList<>();
		String responseQuery = "SELECT * from request where patient_name like '%" + pName + "%';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next()) {
				Request request = new Request(rs.getString("sample_request_id"), rs.getString("np_base"),
						rs.getString("uhid"), rs.getString("surgeon"), rs.getString("patient_name"),
						rs.getInt("patient_sex"), rs.getString("patient_age"), rs.getInt("request_id"),
						rs.getString("created"), rs.getString("unit_name"), rs.getString("department_name"));
				requests.add(request);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return requests;
	}

	public List<Request> getSearchRequestDetailsOfPatient(SearchDetails sd) {
// TODO Auto-generated method stub
//System.out.println(sd.getAge1()+" age11 "+sd.getAge2()+" age22 "+sd.getBiopsy()+" Biopy "+sd.getFinalImpression()+" FinalImpression ");
		List<Request> requests = new ArrayList<>();
//Npnumber based search
		if (sd.getFixative() != "" || sd.getBiopsy() != "" || sd.getSpecimen() != "" || sd.getStation_id() != "") {
			System.out.println("88" + sd.getFixative() + "88");
			String responseQuery1 = "SELECT * from asset where ";
			if (sd.getBiopsy() != "") {

				responseQuery1 += "biopsy_type = '" + sd.getBiopsy() + "'";
			}
			if (sd.getFixative() != "") {
				if (sd.getBiopsy() != "") {
					responseQuery1 += " AND fixative = '" + sd.getFixative() + "'";
				} else {
					responseQuery1 += " fixative = '" + sd.getFixative() + "'";
				}
			}
			if (sd.getSpecimen() != "") {
				if (sd.getBiopsy() == "" && sd.getFixative() == "") {
					responseQuery1 += " specimen = '" + sd.getSpecimen() + "'";
				} else {
					responseQuery1 += " AND specimen = '" + sd.getSpecimen() + "'";
				}
			}
			if (sd.getStation_id() != "") {
				if (sd.getBiopsy() == "" && sd.getFixative() == "" && sd.getStation_id() == "") {
					responseQuery1 += " current_state = '" + sd.getStation_id() + "'";
				} else {
					responseQuery1 += " AND current_state = '" + sd.getStation_id() + "'";
				}
			}
			System.out.println("sql-1--  " + responseQuery1);
			ArrayList<String> nparr = new ArrayList<>();
			Statement stmt1;
			try {
				stmt1 = conn.createStatement();
				ResultSet rs = stmt1.executeQuery(responseQuery1);
				while (rs.next()) {
// Request request = new Request(rs.getString("sample_request_id"),rs.getString("np_base"),rs.getString("uhid"),rs.getString("surgeon"), rs.getString("patient_name"),rs.getInt("patient_sex"),rs.getInt("patient_age"), rs.getInt("request_id"),rs.getString("created"));
// requests.add(request);
					nparr.add(rs.getString("np_number"));
//System.out.println(rs.getString("np_number"));
//System.out.println(rs.getString("np_number"));
					String npBase = rs.getString("np_number");
					String[] npBase1 = npBase.split(":");
					System.out.println(npBase1[0]);
					String re_sql = "SELECT * FROM `request` WHERE `np_base` LIKE '%" + npBase1[0] + "'";
					Statement stmt;
					try {
						stmt = conn.createStatement();
						ResultSet rs1 = stmt.executeQuery(re_sql);
						while (rs1.next()) {
							Request request = new Request(rs1.getString("sample_request_id"), rs1.getString("np_base"),
									rs1.getString("uhid"), rs1.getString("surgeon"), rs1.getString("patient_name"),
									rs1.getInt("patient_sex"), rs1.getString("patient_age"), rs1.getInt("request_id"),
									rs1.getString("created"), rs1.getString("unit_name"),
									rs1.getString("department_name"));
							requests.add(request);
						}
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			System.out.println(nparr.size());
		} else if (sd.getFinalImpression() != "") {
//finalImpressinon
			String responseQuery2 = "SELECT * FROM `report` WHERE `report_Details` like '%" + sd.getFinalImpression()
					+ "%'";
			System.out.println("sql2-finalimp-" + responseQuery2);
			Statement stmt2;
			try {
				stmt2 = conn.createStatement();
				ResultSet rs = stmt2.executeQuery(responseQuery2);
				while (rs.next()) {
					System.out.println(rs.getString("np_number"));
					String re_sql = "SELECT * FROM `request` WHERE `np_base` LIKE '%" + rs.getString("np_number")
							+ "%'";
					Statement stmt;
					try {
						stmt = conn.createStatement();
						ResultSet rs1 = stmt.executeQuery(re_sql);
						while (rs1.next()) {
							Request request = new Request(rs1.getString("sample_request_id"), rs1.getString("np_base"),
									rs1.getString("uhid"), rs1.getString("surgeon"), rs1.getString("patient_name"),
									rs1.getInt("patient_sex"), rs1.getString("patient_age"), rs1.getInt("request_id"),
									rs1.getString("created"), rs1.getString("unit_name"),
									rs1.getString("department_name"));
							requests.add(request);
						}
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else {
			System.out.println("else part");
			String responseQuery = "SELECT * from request where ";
//SELECT * FROM `request` WHERE `patient_name` LIKE "%ram%" AND `patient_age` BETWEEN 0 and 100 and `created` BETWEEN '2017-01-30 14:15:55' AND '2019-09-29 10:15:55'
			if (sd.getPatientName() != "") {
				responseQuery += " patient_name like '%" + sd.getPatientName() + "%'";
			}

			if (sd.getDoctorNmae() != "") {

				responseQuery += " surgeon like '%" + sd.getDoctorNmae() + "%'";

			}

			if (sd.getAge1() != 0 && sd.getAge2() != 0) {

				if (sd.getPatientName() == "") {
					responseQuery += " patient_age BETWEEN " + sd.getAge1() + " and " + sd.getAge2();

				} else {
					responseQuery += " AND  patient_age BETWEEN " + sd.getAge1() + " and " + sd.getAge2();

				}
//System.out.println();
			}
			if (sd.getGender() != 0) {
				responseQuery += " AND patient_sex = " + sd.getGender();
			}
			if (sd.getDate1() != "" && sd.getDate2() != "") {
				if (sd.getAge1() == 0 && sd.getAge2() == 0 && sd.getPatientName() == "") {
					String date1 = sd.getDate1() + " 00:00:00";
					String date2 = sd.getDate2() + " 00:00:00";
					responseQuery += "created between '" + date1 + "' and '" + date2 + "'";
				} else {
					String date1 = sd.getDate1() + " 00:00:00";
					String date2 = sd.getDate2() + " 00:00:00";
					responseQuery += " AND created between '" + date1 + "' and '" + date2 + "'";
				}
			}
//System.out.println(" date1 "+sd.getDate1()+" date2 "+sd.getDate2()+" age1 "+sd.getAge1()+" age2 "+sd.getAge2()+" gender "+sd.getGender()+" Biopsy "+sd.getBiopsy()+" specimen "+sd.getSpecimen()+" station_id"+sd.getStation_id());
			System.out.println("rm " + responseQuery);
			Statement stmt;
			try {
				stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(responseQuery);
				while (rs.next()) {
					Request request = new Request(rs.getString("sample_request_id"), rs.getString("np_base"),
							rs.getString("uhid"), rs.getString("surgeon"), rs.getString("patient_name"),
							rs.getInt("patient_sex"), rs.getString("patient_age"), rs.getInt("request_id"),
							rs.getString("created"), rs.getString("unit_name"), rs.getString("department_name"));
					requests.add(request);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		System.out.println("requests " + requests);
		return requests;
	}

	public List<Request> getRequestWithUhid(String uhid) {
		List<Request> requests = new ArrayList<>();
		String responseQuery = "SELECT * from request where uhid=\"" + uhid + "\";";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next()) {
				Request request = new Request(rs.getString("sample_request_id"), rs.getString("np_base"),
						rs.getString("uhid"), rs.getString("surgeon"), rs.getString("patient_name"),
						rs.getInt("patient_sex"), rs.getString("patient_age"), rs.getInt("request_id"),
						rs.getString("created"), rs.getString("unit_name"), rs.getString("department_name"));
				requests.add(request);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return requests;
	}

	public List<Request> getRequestForUnlinked() {
		List<Request> requests = new ArrayList<>();
		String responseQuery = "SELECT * from request where uhid=\"Unlinked\";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next()) {
				Request request = new Request(rs.getString("sample_request_id"), rs.getString("np_base"),
						rs.getString("uhid"), rs.getString("surgeon"), rs.getString("patient_name"),
						rs.getInt("patient_sex"), rs.getString("patient_age"), rs.getInt("request_id"),
						rs.getString("created"), rs.getString("unit_name"), rs.getString("department_name"));
				requests.add(request);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return requests;
	}

	public void updateRequest(Request request) {
//updates the request in linking
		String responseQuery = "update request set sample_request_id = '" + request.getSampleRequestId()
				+ "', surgeon='" + request.getSurgeon() + "', patient_name='" + request.getPatientName()
				+ "', patient_age='" + request.getPatientAge() + "', patient_sex='" + request.getPatientSex()
				+ "', uhid='" + request.getUHID() + "' where np_base ='" + request.getNpBase() + "';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public String deptUpdate(int min, int max) {
//List<String> samples=new ArrayList<>();
		String responseQuery = "SELECT `sample_request_id` FROM `request` WHERE `request_id` BETWEEN " + min + " and "
				+ max;
		Statement stmt;
		try {
			stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(responseQuery);
			while (rs.next()) {
				System.out.println("data-31- " + rs.getString("sample_request_id"));
				Patient patient = SoapService.test(rs.getString("sample_request_id"));
//UPDATE `request` SET `unit_id` = '2' WHERE `request`.`request_id` = 1;
//updates the request in linking
				String responseQuery1 = "update request set unit_id = '" + patient.getDepartmentName() + "', dept_id ='"
						+ patient.getUnitName() + "' where sample_request_id ='" + rs.getString("sample_request_id")
						+ "';";
				Statement stmt1;
				try {
					stmt1 = conn.createStatement();
					stmt1.execute(responseQuery1);
				} catch (SQLException e) {
					e.printStackTrace();
				}
				patient.getDepartmentName();
				patient.getUnitName();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "its upadeted";
	}
}
