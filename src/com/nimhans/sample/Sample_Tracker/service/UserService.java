package com.nimhans.sample.Sample_Tracker.service;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

/*import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
*/
import com.nimhans.sample.Sample_Tracker.DataBase.AssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.BlockDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.LoginDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.NcsAssetDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.RequestDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.SlideDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TechnicianDAO;
import com.nimhans.sample.Sample_Tracker.DataBase.TissueDAO;
import com.nimhans.sample.Sample_Tracker.globals.NPNumberGlobal;
import com.nimhans.sample.Sample_Tracker.model.Asset;
import com.nimhans.sample.Sample_Tracker.model.Login;
import com.nimhans.sample.Sample_Tracker.model.Request;
import com.nimhans.sample.Sample_Tracker.model.Technician;
import com.nimhans.sample.Sample_Tracker.model.Unit;

public class UserService {
	
	NcsAssetDAO ncsDB = new NcsAssetDAO();
	 String key = "LongString@#$!%^&*(*)1234567890";
	 LoginDAO loginDB = new LoginDAO();
	 Login login = new Login();
	
	
	
	public List<Technician> getAllUsers(){
		return ncsDB.getAllusers();
	}




	public Technician setUpdateUser(Technician ts1) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException {
		// TODO Auto-generated method stub
		
		System.out.println("check1");
		System.out.println("Ts--- "+ts1);
		
		String query2="";
		System.out.println("check2"+ts1.getRoles());
		if(ts1.getTechnician_id() != 0) {
			 query2="UPDATE `technician` SET `technician_name` = ?,`password` = ?,`roles`=? WHERE `technician_id` = ?";
		}else {
			 query2="INSERT INTO `technician` (`technician_name`, `password`, `roles`) VALUES (?,?,?)";
		}
		
		PreparedStatement preparedStatement2 = null;
		try {
			preparedStatement2 = RequestDAO.conn.prepareStatement(query2,preparedStatement2.RETURN_GENERATED_KEYS);
			preparedStatement2.setString(1,ts1.getTechnicianName());
			String encryptedPass = login.encrypt(ts1.getPassword(),key);
			preparedStatement2.setString(2,encryptedPass);
			preparedStatement2.setString(3, ts1.getRoles());
			if(ts1.getTechnician_id() != 0) {
			  preparedStatement2.setInt(4, ts1.getTechnician_id());
			}
			preparedStatement2.execute();
			
			
			//user unit mapping table
			if(ts1.getRoles().equals("nimhans_unit")) {
				
				if(ts1.getTechnician_id() != 0) {
					 query2="UPDATE `unit_user_mapping` SET `unit_id` = ?,`technician_id` = ? where `technician_id` = ?";
				}else {
					 query2="INSERT INTO `unit_user_mapping` (`unit_id`, `technician_id`) VALUES (?,?)";
				}
				PreparedStatement preparedStatement3;
				preparedStatement3 = RequestDAO.conn.prepareStatement(query2);
				preparedStatement3.setInt(1,ts1.getUnit_id());
				
				
				
				if(ts1.getTechnician_id() != 0) {
				  preparedStatement3.setInt(2,ts1.getTechnician_id());
				  preparedStatement3.setInt(3, ts1.getTechnician_id());
				}else {
				ResultSet rs= preparedStatement2.getGeneratedKeys();
					if(rs != null && rs.next()) {
					preparedStatement3.setInt(2,rs.getInt(1));
					}
					
				}
				
				preparedStatement3.execute();
				
			}
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		
		return ts1;
	}




	public String deleteUser(int technician_id,String role) {
		
//		if(role.equals("yes")) {
//		    String query2="DELETE FROM `technician` WHERE `technician`.`technician_id` = ?";
//			PreparedStatement preparedStatement2;
//			try {
//				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
//				preparedStatement2.setInt(1,technician_id);
//				preparedStatement2.execute();
//			} catch (SQLException e) {
//				e.printStackTrace();
//			}
//		}else {
		//}
					
			
			try {
				
				boolean isFound = role.indexOf("inactive") !=-1? true: false;
				
				String newrole="";
				String newrole1="";
				
				if(isFound) {
					 System.out.println("isfound-true-"+isFound);	
					 String[] temp;
				     temp = role.split("_");
				     newrole = temp[1];
				     newrole1 = temp[0];
				     System.out.println(temp[0]);
				    // newrole = temp[1];
				}
				 String query2="UPDATE `technician` SET `roles`=? WHERE `technician_id` = ?";	
				 PreparedStatement preparedStatement2;
				preparedStatement2 = RequestDAO.conn.prepareStatement(query2);
				if(newrole.equals("inactive")) {
					preparedStatement2.setString(1,newrole1);
				}else {	
					preparedStatement2.setString(1,role+"_inactive");
				}
				preparedStatement2.setInt(2, technician_id);
				preparedStatement2.execute();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		
				return "deleted";
			}




	public List<Unit> allunits() {
		// TODO Auto-generated method stub
		return ncsDB.getAllunits();
	}
	
}