package com.ecom.web.payment;

import java.util.Base64;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;



@Service
public class DarajaService {
    @Value("${consumer.key}")
    private String consumerKey;

    @Value("${consumer.secret}")
    private String consumerSecret;

    @Value("${bs.shortcode}")
    private Integer shortCode;

    @Value("${callback.url}")
    private String callbackUrl;

    @Value("${passkey}")
    private String passKey;

    public String getAccessToken(){
        String auth = consumerKey + ":" + consumerSecret;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedAuth);

        HttpEntity<String> request = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    HttpMethod.GET,
    request,
    new ParameterizedTypeReference<Map<String, Object>>() {}
);

return (String) response.getBody().get("access_token");

}  
}
