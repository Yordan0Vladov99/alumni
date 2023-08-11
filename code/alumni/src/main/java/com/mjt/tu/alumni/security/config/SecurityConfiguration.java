package com.mjt.tu.alumni.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((x) -> x.disable())
                .authorizeHttpRequests((x) -> x.requestMatchers("/users/register")
                        .permitAll()
                        .requestMatchers("/photos/getTopPhotos")
                        .permitAll()
                        .requestMatchers("/groups/getSelectedGroups")
                        .permitAll()
                        .requestMatchers("/groups/getGroup")
                        .permitAll()
                        .requestMatchers("/users/getUser")
                        .permitAll()
                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")
                        .requestMatchers("/groups/select")
                        .hasRole("ADMIN")
                        .requestMatchers("/item/change")
                        .hasAnyRole("ADMIN", "PHOTOGRAPHER")
                        .requestMatchers("/users/authenticate")
                        .permitAll()
                        .requestMatchers("/v1/demo-controller")
                        .permitAll()
                        .requestMatchers("/uploads/**")
                        .permitAll()
                        .requestMatchers("/**")
                        .authenticated()
                        .anyRequest()
                        .authenticated())
                .sessionManagement((x) -> x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
