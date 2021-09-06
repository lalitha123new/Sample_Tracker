package com.nimhans.sample.Sample_Tracker.DataBase;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import com.nimhans.sample.Sample_Tracker.globals.Database;
import com.nimhans.sample.Sample_Tracker.globals.Functions;
import com.nimhans.sample.Sample_Tracker.globals.Path;
import com.nimhans.sample.Sample_Tracker.model.Asset;


public class AssetDAO extends Database {
	
	
	static String sp=":";//seperator
	public String getAssetNpNumber(String npBaseNumber, int asset_type){
		//Get new NP Number for newly created asset
		//NpBaseNumber is immediate parent np
		System.out.println("++++org_npnumber+++"+npBaseNumber);
		String maxNp="";
		try {
			String query="select max(np_number) from asset where np_number like '"+npBaseNumber+"%' and asset_type = "+asset_type+";";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				maxNp=rs.getString("max(np_number)");
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		if(asset_type==1){
			if(maxNp==null)
				return npBaseNumber+sp+"A";  //when no tissue exists at all
			else
				return suggestTissueNp(maxNp);
		}
		else if(asset_type==2){
			
			if(maxNp==null)
				return npBaseNumber+sp+"01";  //when no block exists at all
			else
				return suggestBlockNp(maxNp);
		}
		else{
			System.out.println(maxNp +"  is maxNP");
			if(maxNp==null) {
				return npBaseNumber+sp+"S01";  //when no slides exists at all
			}else {
				return suggestSlideNp(maxNp);
			}
		}
	}
	
	private String suggestTissueNp(String npBaseNumber){
		//npBaseNumber is the maximum of np numbers present till now.
		String external="";
		String required = npBaseNumber;
		if(npBaseNumber.startsWith("X")){
			required= npBaseNumber.replace("X","");
			external="X";                  //If external add this in end
		}
		
		StringTokenizer st1 = new StringTokenizer(required,sp);
		String npPart = st1.nextToken();
		StringTokenizer st = new StringTokenizer(npPart,"/");  
		int base = Integer.parseInt(st.nextToken()); //Base
		int year = Integer.parseInt(st.nextToken()); //Year
		
		/*int tissue=Integer.parseInt(st1.nextToken());//tissue
		tissue++;
		if(tissue<10)
		{
			return external+base+"/"+year+sp+"0"+tissue;  //return new Tissue Np
		}
		return external+base+"/"+year+sp+tissue;  //return new Tissue Np
		*/
		char tissue= st1.nextToken().charAt(0);   //convert into Int ASCII
		int ascii = (int) tissue;
		ascii++;           //increment the int
		tissue = (char) ascii;   //Convert int to char
		return external+base+"/"+year+sp+tissue;  //return new Tissue Np
	}
	
	private String suggestBlockNp(String npBaseNumber){
		//npBaseNumber is the maximum of np numbers present till now.
		String external="";
		String required = npBaseNumber;
		if(npBaseNumber.startsWith("X")){
			required= npBaseNumber.replace("X","");
			System.out.println("Here I am in External"+npBaseNumber+ required);
			external="X";                  //If external add this is added in return statement
		}
		StringTokenizer st = new StringTokenizer(required,sp);
		
		String npPart = st.nextToken();
		
		StringTokenizer st1 = new StringTokenizer(npPart,"/");  
		
		int base = Integer.parseInt(st1.nextToken()); //Base
		int year = Integer.parseInt(st1.nextToken()); //Year
		
		String tissue= st.nextToken();               //Tissue
		
		/*char block= st.nextToken().charAt(0);   //convert into Int ASCII
		int ascii = (int) block;
		ascii++;           //increment the int
		block = (char) ascii;   //Convert int to char
		
		System.out.println(external+base+"/"+year+sp+tissue+sp+block);
		return external+base+"/"+year+sp+tissue+sp+block;  //return new Block Np
		*/
		int block = Integer.parseInt(st.nextToken()); //Block
		block++;           //increment the integer
		if(block<10)
		{
			return external+base+"/"+year+sp+tissue+sp+"0"+block;  //return new Block Np
		}
		System.out.println(external+base+"/"+year+sp+tissue+sp+block);
		return external+base+"/"+year+sp+tissue+sp+block;  //return new Block Np
	}

	private synchronized String suggestSlideNp(String npBaseNumber){
		//npBaseNumber is the maximum of np numbers present till now.
		String external="";
		String required = npBaseNumber;
		if(npBaseNumber.startsWith("X")){
			required= npBaseNumber.replace("X","");
			System.out.println("Here I am in External"+npBaseNumber+ required);
			external="X";                  //If external add this is added in return statement
		}
		StringTokenizer st = new StringTokenizer(required,sp);  
		String npPart = st.nextToken();
		StringTokenizer st1 = new StringTokenizer(npPart,"/");
		
		int base = Integer.parseInt(st1.nextToken()); //Base
		int year = Integer.parseInt(st1.nextToken()); //Year
		String tissue= st.nextToken();               //Tissue
		String block = st.nextToken(); //Block
		String slide = st.nextToken().replace("S", ""); //Slide string.
		int slideNumber = Integer.parseInt(slide); //parse to get current slide number
		slideNumber++;
		if(slideNumber<10)
		{
			return external+base+"/"+year+sp+tissue+sp+block+sp+"S0"+slideNumber;  //return new Slide Np
		}
		System.out.println("external---------"+external+base+"/"+year+sp+tissue+sp+block+sp+"S"+slideNumber);
		return external+base+"/"+year+sp+tissue+sp+block+sp+"S"+slideNumber;  //return new Slide Np
	}
	
	public void addAsset(Asset asset,String npBase)
	{
		//get np number
		String[] arrSplit = asset.getNpNumber().split(":S");
		System.out.println("======split======"+arrSplit[0]);
		String real_npnumber =getAssetNpNumber(arrSplit[0],3);
		//System.out.println("======real_npnumber======"+real_npnumber+"  asset_generated_key  "+asset_generated_key);
		String convertedNp = "";
		String query1 = "";
		String query = "insert into asset(np_number, current_state,next_state,done,request_id,specimen,fixative ,biopsy_type ,asset_type, type_id,review,ncs,stain_name) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
		if(npBase != null) {
			 convertedNp = Functions.convertNpForServer(npBase);
			 query1 = "update  asset set specimen = '"+asset.getSpecimen()+"',fixative = '"+asset.getFixative()+"',biopsy_type = '"+asset.getBiopsy()+"' where np_number='"+convertedNp+"';";
				
			}
		Statement stmt;
		System.out.println(query);
		PreparedStatement preparedStatement;
		try {
			preparedStatement = RequestDAO.conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
			preparedStatement.setString(1,asset.getNpNumber());
			System.out.println("np number "+asset.getNpNumber());
			preparedStatement.setInt(2, asset.getCurrentState());
			preparedStatement.setInt(3,asset.getNextState());
			preparedStatement.setInt(4,asset.getDone());
			preparedStatement.setInt(5, asset.getRequest_id());
			preparedStatement.setString(6, asset.getSpecimen());
			preparedStatement.setString(7, asset.getFixative());
			preparedStatement.setString(8, asset.getBiopsy());
			preparedStatement.setInt(9, asset.getType());
			preparedStatement.setInt(10, asset.getType_id());
			preparedStatement.setString(11,asset.getReview());
			preparedStatement.setInt(12, asset.getNcs());
			preparedStatement.setString(13, asset.getStain_name());
			preparedStatement.execute();
			if(query1 != "") {
			stmt = conn.createStatement();
			stmt.execute(query1);
			}
			
//			ResultSet rs = preparedStatement.getGeneratedKeys();
//
//			if (rs.next()) {
//				//path.asset_generated_key = rs.getLong(1);
//			    System.out.println("generated key--- "+rs.getLong(1));
//			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	
	public  void addBulkAsset(Asset asset,String spcial_request_arr)
	{
		//get np number
		//String[] arrSplit = asset.getNpNumber().split(":S");
	System.out.println("======realARRAY======"+spcial_request_arr);
//		String real_npnumber =getAssetNpNumber(arrSplit[0],3);
		String[] arrSplit1 = spcial_request_arr.split("##");
		
		 int asset_generated_key=0;
		 String	new_np = "";
		 
		for(int i=1;i <= (arrSplit1.length-1);i++){
			
//			System.out.println("SINGAM--- "+arrSplit1[i]);
//			System.out.println("newNpNumber--- "+new_np);
//			System.out.println("generated key--- "+asset_generated_key);
			
			if (asset_generated_key > 0) {
				try {
					
					String query1 = "SELECT `np_number` FROM `asset` WHERE `asset_id` =" + asset_generated_key;
					Statement stmt;
					stmt = conn.createStatement();
					ResultSet rs1 = stmt.executeQuery(query1);
					
					if (rs1.next()) {
						new_np = rs1.getString("np_number");
						System.out.println("newNpNumber1-494/20:A:01:S28-- "+new_np);
						String[] npArr = new_np.split(":S");
						int n1=Integer.parseInt(npArr[1]);
						System.out.println("firstPart-- "+(n1+1));
						//System.out.println("newNpNumber1-494/20:A:01:S28-- "+new_np);
						asset.setNpNumber(npArr[0]+":S"+(n1+1));
					}
					
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				// System.out.println(query);
			}
			
			String query = "insert into asset(np_number, current_state,next_state,done,request_id,specimen,fixative ,biopsy_type ,asset_type, type_id,review,ncs,stain_name) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
			System.out.println(query);
			PreparedStatement preparedStatement;
			try {
				preparedStatement = RequestDAO.conn.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS);
				preparedStatement.setString(1,asset.getNpNumber());
				System.out.println("Stroring{}}{}{}{}{  np number "+asset.getNpNumber());
				preparedStatement.setInt(2, asset.getCurrentState());
				preparedStatement.setInt(3,asset.getNextState());
				preparedStatement.setInt(4,asset.getDone());
				preparedStatement.setInt(5, asset.getRequest_id());
				preparedStatement.setString(6, asset.getSpecimen());
				preparedStatement.setString(7, asset.getFixative());
				preparedStatement.setString(8, asset.getBiopsy());
				preparedStatement.setInt(9, asset.getType());
				preparedStatement.setInt(10, asset.getType_id());
				preparedStatement.setString(11,asset.getReview());
				preparedStatement.setInt(12, asset.getNcs());
				//preparedStatement.setString(13, asset.getStain_name());
				
				String st1= arrSplit1[i].replace("\"", "");
				String st2= st1.replace("}", "");
			
				preparedStatement.setString(13, st2);
				
				preparedStatement.execute();
				
				ResultSet rs = preparedStatement.getGeneratedKeys();
	
				if (rs.next()) {
					
					asset_generated_key = (int)rs.getLong(1);
					
					
				    
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
			
		}
		
		
		
		
		
	}
	
	
	
	
	public void addSpecialTagToAsset(int assetId){
		//updates the done status in asset
		String responseQuery = "update asset set special = 1 where asset_id ="+assetId+";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void removeSpecialTagToAsset(int assetId){
		//updates the done status in asset
		String responseQuery = "update asset set special = 0 where asset_id ="+assetId+";";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public  Asset getAsset(String npNumber){
	//return AssetId from npNumber
		try {
			
			String query="select * from asset where np_number ='"+npNumber+"';";
			Statement stmt = conn.createStatement();
			System.out.println("AssetDAO"+query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				String query1="SELECT `special_stain`,`ihc` FROM `special_request` WHERE `np_number`= '"+npNumber+"';";
				Statement stmt1 = conn.createStatement();
				//System.out.println("AssetDAO"+query1);
				ResultSet rs1= stmt1.executeQuery(query1);
				String spl_stain="";
				String iht_str="";
				while(rs1.next()){
					
					spl_stain =rs1.getString("special_stain");
					iht_str =rs1.getString("ihc");
				}
				
				return new Asset(npNumber,rs.getInt("current_state"),rs.getInt("next_state"), rs.getInt("done"),rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
					rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getInt("asset_id"),rs.getString("review"),rs.getInt("ncs"),
					rs.getInt("special"),rs.getString("process_status"),rs.getString("stain_name"),spl_stain,iht_str,0,0,0,rs.getString("createdAt"));
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	//getAllrelated block related to npnumber
	public  List<Asset>  getAssetforReport(String npNumber){
		//return AssetId from npNumber
		List<Asset> assets=new ArrayList<>();
			try {
				
				String query="select * from asset where `asset_type`=2 and np_number like '"+npNumber+"%';";
				Statement stmt = conn.createStatement();
				System.out.println("AssetDAO2 - "+query);
				ResultSet rs= stmt.executeQuery(query);
				while(rs.next()){
					System.out.println(rs. getString("asset_id"));
					
					String query1="SELECT `special_stain`,`ihc`,`np_number` FROM `special_request` WHERE `asset_id` = '"+rs.getString("asset_id")+"';";
					Statement stmt1 = conn.createStatement();
					System.out.println("AssetDAO"+query1);
					ResultSet rs1= stmt1.executeQuery(query1);
					String spl_stain="";
					String iht_str="";
					String newNpnumber="";
					while(rs1.next()){
						System.out.println(rs1.getString("np_number"));
						spl_stain =rs1.getString("special_stain");
						iht_str =rs1.getString("ihc");
						newNpnumber =rs1.getString("np_number");
						Asset asset= new Asset(newNpnumber,rs.getInt("current_state"),rs.getInt("next_state"), rs.getInt("done"),rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
								rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getInt("asset_id"),rs.getString("review"),rs.getInt("ncs"),
								rs.getInt("special"),rs.getString("process_status"),rs.getString("stain_name"),spl_stain,iht_str,0,0,0,rs.getString("createdAt"));
							assets.add(asset);
					}

					
					
				}
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
			return assets;
		}
	
	
	//getAllrelated block related to npnumber tissue
			public  List<Asset>  getAssetDetailsTissueForReport(String npNumber){
				//return AssetId from npNumber
				List<Asset> assets=new ArrayList<>();
					try {
						
						String query="select * from asset where `asset_type`=1 and np_number like '"+npNumber+"%';";
						Statement stmt = conn.createStatement();
						System.out.println("AssetDAO2 - "+query);
						ResultSet rs= stmt.executeQuery(query);
						while(rs.next()){
							System.out.println(rs. getString("asset_id"));
							
							String query1="SELECT *FROM `special_request` WHERE `asset_id` = '"+rs.getString("asset_id")+"';";
							Statement stmt1 = conn.createStatement();
							System.out.println("AssetDAO"+query1);
							ResultSet rs1= stmt1.executeQuery(query1);
							
							if(rs1.next()){
								
								Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"),
								                       rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
								                       rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),
								                       rs.getString("review"),rs1.getString("special_stain"),rs1.getString("notes"),
								                       rs1.getString("ihc"),rs1.getInt("process_all"),rs1.getInt("em"),rs1.getInt("process_more"),
								                       rs1.getString("block_others"),rs.getString("createdAt"));
								
									assets.add(asset);
							}
							
							
						}
					}
					catch (SQLException e) {
						e.printStackTrace();
					}
					return assets;
				}
	
	
	
	
	public String getStatus(String npBase){
		//System.out.println(npBase);
		String next_state;
		try {
			
			String query = "select MAX(next_state) from asset where np_number LIKE '"+npBase+"%';";
			Statement stmt = conn.createStatement();
			//System.out.println(query);
			ResultSet rs = stmt.executeQuery(query);
			
			while(rs.next()){
				
				next_state = rs.getString("MAX(next_state)");		
				//System.out.println("currentState"+next_state);
				    return next_state;
			}		
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return null;
	}
	
	public Asset getAssetById(int assetId){
	//return asset AssetId
		try {
			String query="select * from asset where asset_id ="+assetId+";";
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				return new Asset(rs.getString("np_number"),rs.getInt("current_state"),rs.getInt("next_state"), rs.getInt("done"),rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
					rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getInt("asset_id"),rs.getString("review"),rs.getInt("ncs"),rs.getInt("special"),rs.getString("process_status"),rs.getString("stain_name"),"","",0,0,0,rs.getString("createdAt"));
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getNpNumber(int assetId){
		//return npNumber from assetID
			try {
				String query="select np_number from asset where asset_id ="+assetId+";";
				Statement stmt = conn.createStatement();
				ResultSet rs= stmt.executeQuery(query);
				while(rs.next()){
					return rs.getString("np_number");
				}
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
			return null;
	}

	
	public void updateDone(String npNumber){
		//updates the done status in asset
		String responseQuery = "update asset set done = 1 where np_number ='"+npNumber+"';";
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	

	public void updateAsset(String npNumber, String biopsy , String fixative){
		//updates the asset in recv. station
		String responseQuery = "update asset set fixative = '"+ fixative+"', biopsy_type='"+biopsy+"' where np_number ='"+npNumber+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public  List<Asset> getAllAssets(String npBaseNumber,String year){
		List<Asset> assets=new ArrayList<>();
		try {
			
			System.out.println("YEAR"+year);
			String query = "";
			if(year == null) {
				
				 query="SELECT asset.*, transaction.start_time \n" + 
				"FROM asset\n" + 
				"INNER JOIN transaction ON (asset.np_number = transaction.np_number  and asset.current_state = transaction.station_id) where asset.np_number like '"+npBaseNumber+"%' ";
				
		
			}else {
			
					//String query="select * from asset where np_number like '"+npBaseNumber+"%';";
					 query="SELECT asset.*, transaction.start_time \n" + 
					"FROM asset\n" + 
					"INNER JOIN transaction ON (asset.np_number = transaction.np_number  and asset.current_state = transaction.station_id) where (asset.np_number like '"+npBaseNumber+"%' and asset.createdAt like '"+year+"-"+"%') ";
					
			}
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			
			while(rs.next()){
				
//				System.out.println("check");
////				//String query1="SELECT `station_id`,`start_time` FROM `transaction` WHERE `np_number` LIKE '"+npBaseNumber+"%' and `station_id`="+rs.getInt("current_state");
//				String query1="SELECT `station_id`,`start_time` FROM `transaction` WHERE `np_number` LIKE '"+npBaseNumber+"%' and `station_id`="+rs.getInt("current_state");
//				Statement stmt1 = conn.createStatement();
//				System.out.println(query1);
//				ResultSet rs1= stmt1.executeQuery(query1);
//				String start_time="";
//				if(rs1.next()) {
//					
//					start_time=rs1.getString("start_time");
//				}
//				
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), 
						rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),
						rs.getInt("asset_id"),rs.getString("review"),rs.getInt("ncs"),rs.getInt("special"),
						rs.getString("process_status"),rs.getString("stain_name"),rs.getString("start_time"));
				
				
				assets.add(asset);
				
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}
	
	public List<Asset> getAllBlocks(String npBaseNumber){
		System.out.println("BLOCK");
		List<Asset> assets=new ArrayList<>();
		try {
			String query="select * from asset where np_number like '"+npBaseNumber+"%' and asset_type = 2 ;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				String query1="SELECT `process_all`,`em`,`process_more` FROM `special_request` WHERE `np_number`='"+npBaseNumber+"';";
				Statement stmt1 = conn.createStatement();
				//System.out.println("AssetDAO"+query1);
				ResultSet rs1= stmt1.executeQuery(query1);
				int process_all=0;
				int em=0;
				int process_more=0;
				
				while(rs1.next()){
					
					em =rs1.getInt("em");
					process_all =rs1.getInt("process_all");
					process_more =rs1.getInt("process_more");
				}
				
				
				
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getString("review"),rs.getString("process_status"),rs.getString("stain_name"),"","",em,process_all,process_more,rs.getString("createdAt"));	
				assets.add(asset);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}
	
	public List<Asset> getAllSlides(String npBaseNumber){
		List<Asset> assets=new ArrayList<>();
		try {
			String query="select * from asset where np_number like '"+npBaseNumber+"%' and asset_type = 3 ;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				
				String query1="SELECT `special_stain`,`ihc` FROM `special_request` WHERE `np_number`= '"+npBaseNumber+"';";
				Statement stmt1 = conn.createStatement();
				//System.out.println("AssetDAO"+query1);
				ResultSet rs1= stmt1.executeQuery(query1);
				String spl_stain="";
				String iht_str="";
				
				while(rs1.next()){
					
					spl_stain =rs1.getString("special_stain");
					iht_str =rs1.getString("ihc");
				}
				
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getString("review"),rs.getString("process_status"),rs.getString("stain_name"),spl_stain,iht_str,0,0,0,rs.getString("createdAt"));	
				assets.add(asset);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}
	public void deleteAsset(int assetId){
			//delete asset from assetTable
		String responseQuery = "delete from asset where asset_id = '"+assetId+"';";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}


	public List<Asset> getCompletedTasks(int stationId) {
		List<Asset> assets=new ArrayList<>();
		try {
			String query;
			if(stationId==2)
				query ="select * from asset where  current_state= 2 and asset_type=1 and done=1;";
			else if(stationId==4)
				query ="select * from asset where  current_state= 4 and asset_type=2 and done=1;";
			else
				query="select * from asset where  current_state= "+stationId+" and done=1 ;";
			
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getString("review"),rs.getString("process_status"),rs.getString("stain_name"),"","",0,0,0,rs.getString("createdAt"));	
				assets.add(asset);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}

	public List<Asset> getOnGoingTasks(int stationId) {
		List<Asset> assets=new ArrayList<>();
		try {
			String query="select * from asset where  current_state= "+stationId+" and done=0 ;";
			Statement stmt = conn.createStatement();
			System.out.println(query);
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getString("review"),rs.getString("process_status"),rs.getString("stain_name"),"","",0,0,0,rs.getString("createdAt"));	
				assets.add(asset);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
		}

	public List<Asset> getAllPendingTasks(int stationId) {
		
		List<Asset> assets=new ArrayList<>();
		try {
			String query="select * from asset where next_state= "+stationId+" and done=1 ;";
			
			System.out.println(query);
			Statement stmt = conn.createStatement();
			ResultSet rs= stmt.executeQuery(query);
			while(rs.next()){
				Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"), rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
						rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),rs.getString("review"),rs.getString("process_status"),rs.getString("stain_name"),"","",0,0,0,rs.getString("createdAt"));	
				if(asset.getCurrentState()!=asset.getNextState())
					assets.add(asset);
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		return assets;
	}
	public List<Asset> getAllSpecialTasks(int stationId) {
			
			List<Asset> assets=new ArrayList<>();
			try {
	
				String query= "select * from asset,special_request where asset.asset_id=special_request.asset_id and asset.special=1 and asset.next_state="+stationId+"  ORDER BY `special_request`.`asset_id` DESC,`special_request`.`np_number` DESC;";
						 //,`special_request`.`np_number` DESC;";
				
				System.out.println(query);
				Statement stmt = conn.createStatement();
				ResultSet rs= stmt.executeQuery(query);
				while(rs.next()){
					Asset asset= new Asset(rs.getString("np_number"), rs.getInt("current_state"), rs.getInt("next_state"),rs.getInt("done"),
							rs.getInt("asset_type"), rs.getInt("type_id"), rs.getInt("request_id"),
							rs.getString("specimen"),rs.getString("fixative"), rs.getString("biopsy_type"),
							rs.getString("review"),rs.getString("special_stain"),rs.getString("notes"),
							rs.getString("ihc"),rs.getInt("process_all"),rs.getInt("em"),rs.getInt("process_more"),rs.getString("block_others"),rs.getString("createdAt"));	
					
					System.out.println(asset.getProcess_all());
					if(asset.getCurrentState()!=asset.getNextState())
						assets.add(asset);
				}
			}
			catch (SQLException e) {
				e.printStackTrace();
			}
			return assets;
		}

	public void changeStation(int nextState,int nextStation,String npNumber, int type) {
		//Tissue end lifeCycle at 2Station, Blocks end lifecycle at 4Station
		if((nextState== 2 && type==1)||(nextState ==4 && type==2))
		{
			 
			System.out.println("nextState- "+nextState+" nextState "+nextState+"npNumber "+npNumber);
			
			if((nextState ==4 && type==2)) {
				
				System.out.println("to update nextstation to 4 please click on mark button");
				
			}else {
			
				String responseQuery = "update asset set current_state = "+nextState +" , done =0 where np_number = '"+npNumber+"';";
				System.out.println(responseQuery);
				Statement stmt;
				try {
					stmt = conn.createStatement();
					stmt.execute(responseQuery);
					}catch (SQLException e) {
					e.printStackTrace();
					}
			}
		}
		else{
		//	nextStation= nextState+1;
			String responseQuery = "update asset set current_state = "+nextState +" , next_state="+nextStation+" where np_number ='"+npNumber+"';";
			System.out.println(responseQuery);
			Statement stmt;
			try {
				stmt = conn.createStatement();
				stmt.execute(responseQuery);
				}catch (SQLException e) {
				e.printStackTrace();
				}
			}
	}
	
	
	//sectionstation
		public void changeStationForSection(int nextState,int nextStation,String npNumber, int type) {
			
			if((nextState ==4 && type==2)) {
				
				String responseQuery = "update asset set current_state = "+nextState +" , done =0 where np_number = '"+npNumber+"';";
				System.out.println(responseQuery);
				Statement stmt;
				try {
					stmt = conn.createStatement();
					stmt.execute(responseQuery);
					}catch (SQLException e) {
					e.printStackTrace();
					}
			}
			
		}
	
	
	
	public void setprocessStatus(int assetId,String pStatus){
		//updates the done status in asset
		System.out.println("*** KJKJJK YUUY MNNM progrogress"+pStatus);
		System.out.println("*** CHECK CHECK CHECK"+assetId);
		
		String responseQuery = "update asset set process_status = '"+pStatus+"' where asset_id ="+assetId+";";
		System.out.println(responseQuery);
		Statement stmt;
		try {
			stmt = conn.createStatement();
			stmt.execute(responseQuery);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public String getNextState(String convertedNp) {
		// TODO Auto-generated method stub

		try {
		String sht= "'Sheet'";
		
		//String query="SELECT `next_state`,`current_state` FROM `asset`WHERE `np_number` like "+convertedNp+" and `specimen` ="+sht;
		String query="SELECT `next_state`,`current_state` FROM `asset`WHERE `np_number` like "+convertedNp+" and `asset_type` =0";

		System.out.println(query);
		Statement stmt = conn.createStatement();
		ResultSet rs= stmt.executeQuery(query);

		if(rs.next()){

		return "curent_state:"+rs.getInt("current_state")+" __ "+"next_state:"+rs.getInt("next_state");
		}
		}
		catch (SQLException e) {
		e.printStackTrace();
		}
		return "null";

		}
}
