package com.example.demo.config;

import com.example.demo.filter.JwtFilter;
import com.example.demo.service.UserDetailsServiceImpl;
import com.example.demo.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private CustomPasswordEncoder customPasswordEncoder;

    @Autowired
    private JwtFilter jwtFilter;

    @Override @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(customPasswordEncoder.getPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http = http.csrf().disable().cors().disable();

        http = http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();

        http = http.exceptionHandling()
                    .authenticationEntryPoint((request, response, ex) -> {
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
                    }).and();

        http.authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .anyRequest()
                .authenticated();
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
