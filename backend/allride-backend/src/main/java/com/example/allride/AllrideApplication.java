package com.example.allride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AllrideApplication {

    public static void main(String[] args) {
        SpringApplication.run(AllrideApplication.class, args);
    }

}
