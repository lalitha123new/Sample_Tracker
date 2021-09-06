package com.nimhans.sample.Sample_Tracker.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import com.nimhans.sample.Sample_Tracker.DataBase.LoginDAO;
import com.nimhans.sample.Sample_Tracker.model.Login;


public class LoginService {
	// final String iv = "0123456789@abcde"; // This has to be 16 characters
	String secretKey = "LongStringForExtraSecurity@#$!%^&*(*)1234567890";
    String key = "LongString@#$!%^&*(*)1234567890";
	LoginDAO loginDB = new LoginDAO();
	Login login = new Login();

	public Boolean validate(String username, String password) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, IOException {
		// Pass the password for encoding
		// String encryptedPass = Login.encrypt(password,secretKey);
		System.out.println("user password is "+ password);
		if(password == null){
			System.err.println("Can't go further \n password is null ");
			return false;
		}
		String encryptedPass = login.encrypt(password,key);
		//String decryptStr = login.decrypt(encryptedPass, key);
		//System.out.println("Dencrypted password " + decryptStr);

		boolean login = loginDB.loginValidate(username, encryptedPass);

		/*
		 * if(login.equals("correct login")){
		 * System.out.println("inside if of servicelogin"); return true; }
		 */
		if (login) {
			return true;
		} else {
			return false;
		}

	}
	
	
	public int validateDoctor(String username, String password,String role) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException, IOException {
		// Pass the password for encoding
		// String encryptedPass = Login.encrypt(password,secretKey);
		System.out.println("user password is "+ password);
		int technician_id =0;
		if(password == null){
			System.err.println("Can't go further \n password is null ");
			return technician_id;
		}
		String encryptedPass = login.encrypt(password,key);
		//String decryptStr = login.decrypt(encryptedPass, key);
		//System.out.println("Dencrypted password " + decryptStr);

		int login = loginDB.loginValidateDoctor(username, encryptedPass,role);

		/*
		 * if(login.equals("correct login")){
		 * System.out.println("inside if of servicelogin"); return true; }
		 */
		if (login != 0) {
			return login;
		} else {
			return technician_id;
		}

	}

}
