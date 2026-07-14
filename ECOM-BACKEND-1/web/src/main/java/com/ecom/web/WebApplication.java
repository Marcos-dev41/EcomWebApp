package com.ecom.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebApplication.class, args);}

		@Bean
    public CommandLineRunner debugEnv(
            @Value("${spring.datasource.url:NOT_FOUND}") String dbUrl,
            @Value("${spring.datasource.username:NOT_FOUND}") String dbUsername) {
        return args -> {
            System.out.println("=========================================");
            System.out.println("DEBUG - DB URL: " + dbUrl);
            System.out.println("DEBUG - DB USERNAME: " + dbUsername);
            System.out.println("=========================================");};

			}}
