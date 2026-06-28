package com.example.allride.ai.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthSmokeController {

    @GetMapping("/api/v1/ai/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "service", "allride-ai-service");
    }
}
