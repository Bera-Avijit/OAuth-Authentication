package com.avijit.Backend.Controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @GetMapping("/current-user")
    public Map<String, Object> getCurrentUser(Authentication authentication){
        Map<String, Object> response = new HashMap<>();
        if(authentication != null && authentication.isAuthenticated()){
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String registrationId = getProviderName(authentication);

            response.put("authenticated", true);
            response.put("provider", registrationId);

            if(Objects.equals(registrationId, "google")){
                response.put("name", oAuth2User.getAttribute("name"));
                response.put("email", oAuth2User.getAttribute("email"));
                response.put("picture", oAuth2User.getAttribute("picture"));
            }
            else if(Objects.equals(registrationId, "github")) {
                response.put("name", oAuth2User.getAttribute("login"));
                response.put("email", oAuth2User.getAttribute("email"));
                response.put("picture", oAuth2User.getAttribute("avatar_url"));
                response.put("username", oAuth2User.getAttribute("login"));
                response.put("bio", oAuth2User.getAttribute("bio"));
                response.put("location", oAuth2User.getAttribute("location"));
                response.put("company", oAuth2User.getAttribute("company"));
                response.put("blog", oAuth2User.getAttribute("blog"));
                response.put("public_repos", oAuth2User.getAttribute("public_repos"));
                response.put("followers", oAuth2User.getAttribute("followers"));
                response.put("following", oAuth2User.getAttribute("following"));
            }
        }
        else
        {
            response.put("authenticated", false);
        }
        return response;
    }

    private String getProviderName(Authentication authentication) {
        if (authentication instanceof OAuth2AuthenticationToken authToken) {
            return authToken.getAuthorizedClientRegistrationId();
        }
        return null;
    }


    @PostMapping("/logout")
    public Map<String, String> logout() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout successful");
        return response;
    }
}
