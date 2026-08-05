package com.siddesh.EdgeXSpringBootBackend.config;

import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        // Both SimpleClientHttpRequestFactory (buffering removed in 6.1+) and
        // JdkClientHttpRequestFactory (always chunks non-GET bodies) send request
        // bodies using chunked transfer encoding, which Judge0's Rack-based server
        // fails to parse correctly (silently treats the body as empty).
        // Apache HttpClient5 reliably buffers the body and sends a proper
        // Content-Length header instead.
        HttpComponentsClientHttpRequestFactory factory =
                new HttpComponentsClientHttpRequestFactory(HttpClients.createDefault());

        return new RestTemplate(factory);
    }
}