package com.nimhans.sample.Sample_Tracker.globals;

import javax.ws.rs.ext.Provider;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter; 


@Provider
public class ResponseCorsFilter implements ContainerResponseFilter {
 
 /* @Override
    public ContainerResponse filter(ContainerRequest req, ContainerResponse contResp) {
 
        ResponseBuilder resp = Response.fromResponse(contResp.getResponse());
        resp.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
 
        String reqHead = req.getHeaderValue("Access-Control-Request-Headers");
 
        if(null != reqHead && !reqHead.equals("")){
            resp.header("Access-Control-Allow-Headers", reqHead);
        }
 
        contResp.setResponse(resp.build());
            return contResp;
    }*/

	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
			throws IOException {
		// TODO Auto-generated method stub
		//System.out.println("hii");
		responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
		String reqHead = requestContext.getHeaderString("Access-Control-Request-Headers");
	       if(null != reqHead && !reqHead.equals("")){
	            responseContext.getHeaders().add("Access-Control-Allow-Headers", reqHead);
	       }
	 	 responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	}
 
}
