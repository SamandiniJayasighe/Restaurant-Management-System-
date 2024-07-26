package com.example.menuservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MenuserviceSearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(MenuserviceSearchApplication.class, args);
	}

}
