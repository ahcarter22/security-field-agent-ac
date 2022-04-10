package learn.field_agent.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers( HttpMethod.GET, "/api/agency").permitAll()
                .antMatchers( HttpMethod.GET, "/api/agency/*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/agency").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/agency/*").permitAll()

                .antMatchers( HttpMethod.GET, "/api/agent").permitAll()
                .antMatchers( HttpMethod.GET, "/api/agent/*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/agent").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/agent/*").permitAll()

                .antMatchers( HttpMethod.GET, "/api/agency/agent").permitAll()
                .antMatchers( HttpMethod.GET, "/api/agency/agent/*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/agency/agent").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/agency/agent/*").permitAll()

                .antMatchers( HttpMethod.GET, "/api/location").permitAll()
                .antMatchers( HttpMethod.GET, "/api/location*").permitAll()
                .antMatchers( HttpMethod.POST, "/api/location").permitAll()
                .antMatchers( HttpMethod.DELETE, "/api/location/*").permitAll()

                // require authentication for any request...
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("*");
            }
        };
    }
}
