package com.ecom.web.service;

import com.paypal.sdk.Environment;
import com.paypal.sdk.PaypalServerSdkClient;
import com.paypal.sdk.authentication.ClientCredentialsAuthModel;
import com.paypal.sdk.exceptions.ApiException;
import com.paypal.sdk.http.response.ApiResponse;
import com.paypal.sdk.models.OAuthToken;
import java.io.IOException;
import org.slf4j.event.Level;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PayPalService {

    @Value("${paypal.client.id}")
	private String PAYPAL_CLIENT_ID;


	@Value("${paypal.client.secret}")
	private String PAYPAL_CLIENT_SECRET;


    public PaypalServerSdkClient paypalClient() {
        return new PaypalServerSdkClient.Builder()
                .loggingConfig(builder -> builder
                        .level(Level.DEBUG)
                        .requestConfig(logConfigBuilder -> logConfigBuilder.body(true))
                        .responseConfig(logConfigBuilder -> logConfigBuilder.headers(true)))
                .httpClientConfig(configBuilder -> configBuilder
                        .timeout(0))
                .environment(Environment.SANDBOX)
                .clientCredentialsAuth(new ClientCredentialsAuthModel.Builder(
                        PAYPAL_CLIENT_ID, 
                        PAYPAL_CLIENT_SECRET)
                        .build())
                .build();
    }

}
