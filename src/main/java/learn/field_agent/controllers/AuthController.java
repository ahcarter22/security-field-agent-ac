package learn.field_agent.controllers;

import learn.field_agent.domain.AgentService;
import learn.field_agent.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
// RestController annotates spring into dependency
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api")

// endpoint for authenticating and getting a token
public class AuthController {

    AuthenticationManager authManager;
    JwtConverter converter;
    AgentService service;

    public AuthController(
            AuthenticationManager authManager,
            JwtConverter converter,
            AgentService service ){
        this.authManager = authManager;
        this.converter = converter;
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Map<String,String> credentials ){

        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken( credentials.get("username"), credentials.get("password") );

        try {
            Authentication authResult = authManager.authenticate(token);

            if( authResult.isAuthenticated() ){
                User toConvert = (User)authResult.getPrincipal();

                String jwt = converter.getTokenFromUser( toConvert );

                Map<String, String> tokenWrapper = new HashMap<>();
                tokenWrapper.put("jwt_token", jwt);

                return ResponseEntity.ok( tokenWrapper );
            }
        } catch ( AuthenticationException ex ){
            ex.printStackTrace(System.err);
        }


        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

}
