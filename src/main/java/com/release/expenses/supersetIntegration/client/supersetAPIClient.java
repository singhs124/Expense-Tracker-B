package com.release.expenses.supersetIntegration.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.release.expenses.supersetIntegration.dto.GuestTokenRequestBody;
import com.release.expenses.supersetIntegration.dto.LoginRequestBody;
import com.release.expenses.supersetIntegration.dto.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class supersetAPIClient {
    private final WebClient webClient;
    private Map<String, Object> user;

    public Mono<LoginResponse> getJwtToken(String username, String pass){
        LoginRequestBody loginRequestBody = new LoginRequestBody(username,pass,true,"db");
        return webClient.post()
                .uri("/api/v1/security/login")
                .bodyValue(loginRequestBody)
                .header("Content-Type","application/json")
                .exchangeToMono(response -> {
                    Mono<JsonNode> bodyMono = response.bodyToMono(JsonNode.class);
                    List<String> cookies = response.headers().header(HttpHeaders.SET_COOKIE);
                    String sessionCookie = cookies.stream()
                            .filter(cookie ->cookie.startsWith("session="))
                            .findFirst()
                            .orElseThrow();
                    return bodyMono.map(jsonNode -> {
                        String accessToken = jsonNode.get("access_token").asText();
                        return new LoginResponse(accessToken,sessionCookie);
                    });
                });
    }

    public Mono<String> getGuestToken(String jwt, String dashboardId){
        Map<String,Object> user = new HashMap<>();
        user.put("first_name","");
        user.put("last_name","");
        user.put("username","");

        Map<String,Object> res = new HashMap<>();
        res.put("id",dashboardId);
        res.put("type","dashboard");

        List<Map<String,Object>> rls = Collections.emptyList();
        GuestTokenRequestBody guestTokenRequestBody = new GuestTokenRequestBody(Collections.singletonList(res),user,rls);

        return webClient.post()
                .uri("/api/v1/security/guest_token/")
                .bodyValue(guestTokenRequestBody)
                .header("Authorization","Bearer "+jwt)
                .header("Content-Type","application/json")
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> jsonNode.get("token").asText());
    }

    public Mono<String> getCSRFToken(String jwt){
        return webClient.get()
                .uri("/api/v1/security/csrf_token/")
                .header("Authorization","Bearer "+ jwt)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> jsonNode.get("result").asText());
    }
}
