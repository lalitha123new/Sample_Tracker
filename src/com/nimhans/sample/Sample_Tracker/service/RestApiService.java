package com.nimhans.sample.Sample_Tracker.service;
import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.globals.Path;
import com.nimhans.sample.Sample_Tracker.model.NpUpload;
import com.nimhans.sample.Sample_Tracker.model.TestDetails;

import java.io.BufferedReader;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.ws.rs.core.Response;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.nimhans.sample.Sample_Tracker.DataBase.RequestDAO;


public class RestApiService extends Database {
	
	public static Connection conn;
	
	private final String REST_API_PATH = Path.restApiPath;

	public String ehospitalApiData(String ps,int api_identifier_id) throws IOException {
		
		try {
				
			if(api_identifier_id == 2) {
				
			}
			
		// TODO Auto-generated method stub
		String url1 = REST_API_PATH+"eHosp/patientDemograophic/"+api_identifier_id;
		//String url1 = "http://localhost:8080/EhospitalRest/rest/eHosp/patientDemograophic/"+api_identifier_id;
		String contentype = "text/plain";
		URL url = new URL(url1);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", contentype);
	
		// Send post request
		conn.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
		wr.writeBytes(ps);
		wr.flush();
		wr.close();
		BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String output;
		StringBuffer response = new StringBuffer();

		while ((output = in.readLine()) != null) {
			//response.append(output);
			return output;
		}
		in.close();

		conn.disconnect();

	} catch (MalformedURLException e) {

		e.printStackTrace();
	} catch (IOException e) {

		e.printStackTrace();

	}

	String output1 = null;

	return output1;
		
		
}
	
	
//RestApi call get Reporting	
public String ehospitalApiData1(String ps,int api_identifier_id) throws IOException, SQLException, JSONException {
	
		try {
			String JSON = ps;
			JSONObject jsonObject = new JSONObject(JSON);
			
			
			//System.out.println("sample_id1 "+sample_id);
			
		String sample_id= returnSampelRequestId(jsonObject.get("parm2").toString());
			
		System.out.println("sample_id2--enter-- "+sample_id);
			
			//String report_draft_str= null;
			
			//String query="SELECT * FROM `report` WHERE `np_number`=";
			String query = "SELECT `report_Details`,`report_draft` FROM `report` WHERE `sample_id` like '"+sample_id+"'";
			System.out.println("sample_id --- "+sample_id);
			Statement stmt = RequestDAO.conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			if(rs.next()){
				
				System.out.println("request_id"+rs.getString("report_draft"));
				
				String	report_draft_str = rs.getString("report_draft");
				String report_str = rs.getString("report_Details");
				System.out.println(" outreport_draft_str  "+report_draft_str+" outreport_str "+report_str);
				
				if((report_draft_str != null) && (report_str == null)) {
					
					
					System.out.print("--------report_draft_str NOT NULLL-----");
				   System.out.println("report_draft_str-1--  "+report_draft_str);
//					
//					//String query2 = "INSERT INTO `report` (`report_Details`, `np_number`, `sample_id`) VALUES (?,?,?)";
//					String query2 = "UPDATE `report` SET `report_Details` = ? ,`np_number` = ? WHERE `sample_id` = ?";
//					PreparedStatement preparedStatement2;
//					try {
//						preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
//						preparedStatement2.setString(1, report_draft_str);
//						preparedStatement2.setString(2,jsonObject.get("parm2").toString());
//						preparedStatement2.setString(3, sample_id);
//						preparedStatement2.execute();
//					} catch (SQLException e) {
//						e.printStackTrace();
//					}
//					///return 
//					
//				}else{
				
					
					return report_draft_str;
					
				}else if((report_draft_str == null) && (report_str != null)){
					System.out.print("--------report_str NOT NULLL-----");
					
					return report_str;
					
				}else if((report_draft_str != null) && (report_str != null)){
					
					
					
					System.out.print("______BOTH NOT NULLL-----");
					//String sample_id= returnSampelRequestId(jsonObject.get("parm2").toString());
					
					String JSON1 = ps;
					JSONObject jsonObject1 = new JSONObject(JSON1);
					jsonObject1.put("parm1", "14");
					jsonObject1.put("parm2", sample_id);
					
					
					System.out.print("new json --"+jsonObject1.toString());
					
					// TODO Auto-generated method stub
					//String url1 = "http://localhost:8080/EhospitalRest/rest/eHosp/patientDemograophic/"+api_identifier_id;
					String url1 = REST_API_PATH+"eHosp/patientDemograophic/"+api_identifier_id;
					String contentype = "text/plain";
					URL url = new URL(url1);
					HttpURLConnection conn1 = (HttpURLConnection) url.openConnection();
					conn1.setRequestMethod("POST");
					conn1.setRequestProperty("Content-Type", contentype);
				
					// Send post request
					conn1.setDoOutput(true);
					DataOutputStream wr = new DataOutputStream(conn1.getOutputStream());
					wr.writeBytes(jsonObject1.toString());
					wr.flush();
					wr.close();
					BufferedReader in = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
					String output;
					StringBuffer response = new StringBuffer();

					while ((output = in.readLine()) != null) {
						//response.append(output);
						//return Response.status(200).entity(output).build();
				 System.out.println("inside output loop");
							
							//String query2 = "INSERT INTO `report` (`report_Details`, `np_number`, `sample_id`) VALUES (?,?,?)";
						    String query2 ="UPDATE `report` SET `np_number` = ? WHERE `sample_id` = ?";
							PreparedStatement preparedStatement2;
							try {
								preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
								//preparedStatement2.setString(1, output);
								preparedStatement2.setString(1,jsonObject.get("parm2").toString());
								preparedStatement2.setString(2, jsonObject1.get("parm2").toString());
								preparedStatement2.execute();
							} catch (SQLException e) {
								e.printStackTrace();
							}
							
						
							 System.out.println("inside output loop---"+output);
						
						//return output;
							 //this is bug we should fatch saved data from database we have to cehck with ehosp team.
							 return report_draft_str;
					}
					in.close();

					conn1.disconnect();
					
					
					
				}
		
				
				
				
			}else {
				
				//String sample_id= returnSampelRequestId(jsonObject.get("parm2").toString());
				
				String JSON1 = ps;
				JSONObject jsonObject1 = new JSONObject(JSON1);
				jsonObject1.put("parm1", "14");
				jsonObject1.put("parm2", sample_id);
				
				
				System.out.print("new json --"+jsonObject1.toString());
				
				
				
				// TODO Auto-generated method stub
				//String url1 = "http://localhost:8080/EhospitalRest/rest/eHosp/patientDemograophic/"+api_identifier_id;
				String url1 = REST_API_PATH+"eHosp/patientDemograophic/"+api_identifier_id;
				String contentype = "text/plain";
				URL url = new URL(url1);
				HttpURLConnection conn1 = (HttpURLConnection) url.openConnection();
				conn1.setRequestMethod("POST");
				conn1.setRequestProperty("Content-Type", contentype);
			
				// Send post request
				conn1.setDoOutput(true);
				DataOutputStream wr = new DataOutputStream(conn1.getOutputStream());
				wr.writeBytes(jsonObject1.toString());
				wr.flush();
				wr.close();
				BufferedReader in = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
				String output;
				StringBuffer response = new StringBuffer();

				while ((output = in.readLine()) != null) {
					//response.append(output);
					//return Response.status(200).entity(output).build();
					
						
						String query2 = "INSERT INTO `report` (`report_Details`, `np_number`, `sample_id`) VALUES (?,?,?)";
						PreparedStatement preparedStatement2;
						try {
							preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
							preparedStatement2.setString(1, output);
							preparedStatement2.setString(2,jsonObject.get("parm2").toString());
							preparedStatement2.setString(3, jsonObject1.get("parm2").toString());
							preparedStatement2.execute();
						} catch (SQLException e) {
							e.printStackTrace();
						}
						
					
					
					
					
					
					return output;
				}
				in.close();

				conn1.disconnect();
				
				
			}
		
			
			
		

	} catch (MalformedURLException e) {

		e.printStackTrace();
	} catch (IOException e) {

		e.printStackTrace();

	}

	String output = null;

	return output;
		
		
}


//RestApi call Save Reporting	
public String ehospitalApiDataSaveReport(String ps,int api_identifier_id) throws IOException, SQLException, JSONException {
	
		try {
			String JSON = ps;
			JSONObject jsonObject = new JSONObject(JSON);
			
			
			String query2 ="UPDATE `report` SET `report_draft` = ? WHERE `sample_id` = ?";
			PreparedStatement preparedStatement2;
			try {
				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
				preparedStatement2.setString(1, jsonObject.get("parm9").toString());
				preparedStatement2.setString(2, jsonObject.get("parm8").toString());
				preparedStatement2.execute();
			} catch (SQLException e) {
				e.printStackTrace();
			}
				
//				String sample_id= returnSampelRequestId(jsonObject.get("parm2").toString());
//				
//				String JSON1 = ps;
//				JSONObject jsonObject1 = new JSONObject(JSON1);
//				jsonObject1.put("parm1", "14");
//				jsonObject1.put("parm2", sample_id);
				
				
				//System.out.print("new json --"+jsonObject1.toString());
				
				// TODO Auto-generated method stub
				//String url1 = "http://localhost:8080/EhospitalRest/rest/eHosp/saveExternalReport";
				String url1 = REST_API_PATH+"eHosp/saveExternalReport";
				String contentype = "text/plain";
				URL url = new URL(url1);
				HttpURLConnection conn1 = (HttpURLConnection) url.openConnection();
				conn1.setRequestMethod("POST");
				conn1.setRequestProperty("Content-Type", contentype);
			
				// Send post request
				conn1.setDoOutput(true);
				DataOutputStream wr = new DataOutputStream(conn1.getOutputStream());
				wr.writeBytes(jsonObject.toString());
				wr.flush();
				wr.close();
				BufferedReader in = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
				String output;
				//StringBuffer response = new StringBuffer();

				while ((output = in.readLine()) != null) {
					//response.append(output);
					//return Response.status(200).entity(output).build();
					//String query2 = "INSERT INTO `report` (`report_draft`,`sample_id`) VALUES (?,?)";
					//changes according to sir's new requirement
				/*	String query2 ="UPDATE `report` SET `report_Details` = ? WHERE `sample_id` = ?";
					PreparedStatement preparedStatement2;
					try {
						preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
						preparedStatement2.setString(1, jsonObject.get("parm9").toString());
						preparedStatement2.setString(2, jsonObject.get("parm8").toString());
						preparedStatement2.execute();
					} catch (SQLException e) {
						e.printStackTrace();
					}*/
					
					
					return output;
				}
				in.close();

				conn1.disconnect();
					

	} catch (MalformedURLException e) {

		e.printStackTrace();
	} catch (IOException e) {

		e.printStackTrace();

	}

	String output = null;

	return output;
		
		
}



//RestApi call Save Reporting_Draft	
public String ehospitalApiDataSaveReport_draft(String ps,int api_identifier_id) throws IOException, SQLException, JSONException {
	
	
	
			        String JSON = ps;
			        JSONObject jsonObject = new JSONObject(JSON);
			        String query = "SELECT  *FROM `report` WHERE `sample_id` like '"+jsonObject.get("parm8").toString()+"'";
					Statement stmt = RequestDAO.conn.createStatement();
					ResultSet rs= stmt.executeQuery(query);
					
                    if(rs.next()){
	
                    	
                    	String query2 ="UPDATE `report` SET `report_draft` = ? WHERE `sample_id` = ?";
            			PreparedStatement preparedStatement2;
            			try {
            				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
            				preparedStatement2.setString(1, jsonObject.get("parm9").toString());
            				preparedStatement2.setString(2, jsonObject.get("parm8").toString());
            				preparedStatement2.execute();
            			} catch (SQLException e) {
            				e.printStackTrace();
            			}
	
                       }else {
                    	   
                    	   String query2 = "INSERT INTO `report` (`report_draft`,`sample_id`) VALUES (?,?)";
       					PreparedStatement preparedStatement2;
       					try {
       						preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
       						preparedStatement2.setString(1, jsonObject.get("parm9").toString());
       						preparedStatement2.setString(2, jsonObject.get("parm8").toString());
       						preparedStatement2.execute();
       					} catch (SQLException e) {
       						e.printStackTrace();
       					}
                    	   
                       }
			      
					
					return jsonObject.get("parm9").toString();	
}



//Restcall for uploda pdf

@SuppressWarnings("unused")
public void writeToFile(InputStream uploadedInputStream,
		String uploadedFileLocation ,String file_name, String new_npBase,int identifier_id) {

	String np_base= new_npBase.replace("@","/");
	
	System.out.println(file_name+"---"+file_name);
	
	String sample_id= returnSampelRequestId(np_base);
	
		try {
			OutputStream out = new FileOutputStream(new File(
					uploadedFileLocation));
			int read = 0;
			byte[] bytes = new byte[1024];

			out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			out.close();
		} catch (IOException e) {

			e.printStackTrace();
		}
		
		try {
			if(identifier_id == 1) {
				
		String query = "SELECT  *FROM `report` WHERE `np_number` like '"+np_base+"'";
		
		Statement stmt = RequestDAO.conn.createStatement();
		ResultSet rs= stmt.executeQuery(query);
		if(rs.next()){
			System.out.println("SSSSSSSS/upload_pdf/"+file_name);
			String query2 = "UPDATE `report` SET `report_pdf_path` = ? ,`np_number` = ? WHERE `sample_id` = ?";
			PreparedStatement preparedStatement2;
			
				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
				preparedStatement2.setString(1, "/upload_pdf/"+file_name);
				preparedStatement2.setString(2,np_base);
				preparedStatement2.setString(3, sample_id);
				preparedStatement2.execute();
			
			
		}else {
			
			String query2 = "INSERT INTO `report` (`report_pdf_path`, `np_number`, `sample_id`) VALUES (?,?,?);";
			PreparedStatement preparedStatement2;
			
				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
				preparedStatement2.setString(1, "/upload_pdf/"+file_name);
				preparedStatement2.setString(2, np_base);
				preparedStatement2.setString(3, sample_id);
				preparedStatement2.execute();
			
			
		}
		
		
		   //else part to store image from grossing and recving station
			} else {
				
				System.out.println("hello upload recving station pics");
				
				String q1="INSERT INTO `np_upload` (`np_base`, `upload_path`) VALUES (?, ?)";
				PreparedStatement preparedStatement2;
				preparedStatement2 = RequestDAO.conn.prepareStatement(q1);
				preparedStatement2.setString(1, np_base);
				preparedStatement2.setString(2, "/upload_pdf/"+file_name);
				preparedStatement2.execute();
			}
		
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		

	}



public String getReportPdfPath(String np_base) throws JSONException {
	// TODO Auto-generated method stub
	
	String report_pdf_path="";
	
	
	
	try {
		String JSON = np_base;
		JSONObject jsonObject = new JSONObject(JSON);
		 String np_base1 = jsonObject.get("Np_base").toString();
		
		String query = "SELECT  `report_pdf_path` FROM `report` WHERE `np_number` like '"+np_base1+"'";
		Statement stmt;
		stmt = RequestDAO.conn.createStatement();
		ResultSet rs= stmt.executeQuery(query);
		if(rs.next()){
			
			report_pdf_path =rs.getString("report_pdf_path");
			
			return report_pdf_path;
			
		}
		
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return report_pdf_path;
}



	
public String returnSampelRequestId(String Np_number) {
	
	try {
		
			String sample_id = "";
			String sql = "SELECT `sample_request_id` FROM `request` where `np_base` like '"+Np_number+"%';";
			//System.out.println(Np_number);
			PreparedStatement pstatement;
			pstatement = RequestDAO.conn.prepareStatement(sql);
			//pstatement.setString(1, Np_number);
			ResultSet result = pstatement.executeQuery();
			if(result.next()) {
				sample_id =result.getString("sample_request_id");		
			}
			return sample_id;
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return "hello";
	
}


class SMTPAuthenticator extends javax.mail.Authenticator {

	 public PasswordAuthentication getPasswordAuthentication() {
	  String d_email = "nimhansneuropathology@gmail.com";
		 //String d_email = "neuropathology2008@gmail.com";
	            String d_password = "neuropath029";
	  return new PasswordAuthentication(d_email, d_password);
	 }
	}

//adding multiple files as attachments
private static void addAttachment(Multipart multipart, String filename) throws MessagingException
{
   DataSource source = new FileDataSource(filename);
   BodyPart messageBodyPart = new MimeBodyPart();        
   messageBodyPart.setDataHandler(new DataHandler(source));
   messageBodyPart.setFileName(filename);
   multipart.addBodyPart(messageBodyPart);
}


public String getSendPdf(String np_base, String email)  {
	
	String pdfpath = "";
	String patientName = "";
	System.out.println(np_base);
	
	
	try {
		
		System.out.println(np_base);
		String sql = "SELECT `report_pdf_path` FROM `report` where `np_number` like '"+np_base+"%';";
		//System.out.println(Np_number);
		PreparedStatement pstatement;
		pstatement = RequestDAO.conn.prepareStatement(sql);
		//pstatement.setString(1, Np_number);
		ResultSet result = pstatement.executeQuery();
		if(result.next()) {
			pdfpath =result.getString("report_pdf_path");		
		}
		
		System.out.println(pdfpath);
		String sql1 = "SELECT `patient_name` FROM `request` where `np_base` like '"+np_base+"%';";
		//System.out.println(Np_number);
		PreparedStatement pstatement1;
		pstatement1 = RequestDAO.conn.prepareStatement(sql1);
		//pstatement.setString(1, Np_number);
		ResultSet result1 = pstatement1.executeQuery();
		if(result1.next()) {
			patientName =result1.getString("patient_name");		
		}
		
} catch (SQLException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
	
	
	
	String to=email;
	 // Sender's email ID needs to be mentioned
   String from = "nimhansneuropathology@gmail.com";
	// String from = "neuropathology2008@gmail.com";

   final String username = "nimhansneuropathology@gmail.com";//change accordingly
	// final String username = "neuropathology2008@gmail.com";//change accordingly
   final String password = "neuropath029";//change accordingly

   // Assuming you are sending email through relay.jangosmtp.net
   String host =  "smtp.gmail.com";

     Properties props = new Properties();
     props.put("mail.smtp.user", to);
     props.put("mail.smtp.host", host);
     props.put("mail.smtp.port", "465");
     props.put("mail.smtp.starttls.enable", "true");
     props.put("mail.smtp.auth", "true");
     props.put("mail.smtp.socketFactory.port", "465");
     props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
     props.put("mail.smtp.socketFactory.fallback", "false");

   // Get the Session object.
   Session session = Session.getInstance(props,
      new javax.mail.Authenticator() {
         protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
         }
      });
	
	
	
	 try {
         // Create a default MimeMessage object.
         Message message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.setRecipients(Message.RecipientType.TO,
            InternetAddress.parse(to));

         // Set Subject: header field
         message.setSubject("Report of "+patientName);

         // Create the message part
         BodyPart messageBodyPart = new MimeBodyPart();

         // Now set the actual message
        // messageBodyPart.setText("Hi,\r\n" +
         messageBodyPart.setText("Dear Doctor,\r\n" +
           "\r\n" +
           "Please find attached report of "+patientName+"(Ref No: "+np_base+")"+
           "\r\n \r\n" +
           "Thank You"+
           "\r\n" +
           "Department of Neuropathology"+
           "\r\n" +
           "NIMHANS"
           );

         // Create a multipar message
         Multipart multipart = new MimeMultipart();

         // Set text message part
         multipart.addBodyPart(messageBodyPart);

         // Part two 
        // addAttachment(multipart, "C:\\Users\\admin\\Downloads\\699_20.pdf");
         //nimhans server path
         addAttachment(multipart,Path.project_path+pdfpath);
         System.out.println("PROJECT PATH IS "+pdfpath);
        

         // Send the complete message parts
         message.setContent(multipart);

         // Send message
         Transport.send(message);

         //System.out.println("Sent message successfully with Attachments....");
  
      } catch (MessagingException e) {
      // System.exit(0);
         throw new RuntimeException(e);
        
      } finally {
      
       //System.out.println("finally block");
      }

	
	
	
	return null;
	
	
}


public TestDetails getTestDetails(int test_id, int subtest_id) {
	
	try {
		//String query="SELECT * FROM `test_details` WHERE `test_id` = ? AND `subtest_id` = ? ";
		String query="SELECT * FROM `test_details` WHERE `test_id` = "+test_id+" AND `subtest_id` = "+subtest_id+" ";
		//PreparedStatement stmt = (PreparedStatement) conn.createStatement();
//		PreparedStatement stmt;
//		stmt = conn.prepareStatement(query);
//		stmt.setInt(1, test_id);
//		stmt.setInt(2, subtest_id);
//		Statement stmt;
//		stmt = conn.createStatement();
//		ResultSet rs= stmt.executeQuery(query);
		
		PreparedStatement pstatement;
		pstatement = RequestDAO.conn.prepareStatement(query);
		//pstatement.setString(1, Np_number);
		ResultSet rs = pstatement.executeQuery();
		
		if(rs.next()){
			
			//System.out.println("---- "+rs.getString("fixative"));
			TestDetails ts = new TestDetails(rs.getString("fixative"),rs.getString("testname"),rs.getInt("test_details_id"),
					              rs.getInt("test_id"),rs.getInt("subtest_id"),
					              rs.getString("biopsy_type"),rs.getString("specimen"));
			
			return ts;
			
		}
	}
		catch (SQLException e) {
			e.printStackTrace();
		}
	
	
	return null;	
}






	
	
	
	}