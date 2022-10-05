/**
 * 
 */
package com.fpoly.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fpoly.services.SecurityUserDetails;

/**
 *
 * @author trucnv 
 *
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private SecurityUserDetails userDetailsService;
	
	/** Public URLs. */
	private static final String[] PUBLIC_MATCHERS = {
	        "/angularjs/**",
	        "/css/**",
	        "/font-awesome/**",
	        "/images/**",
	        "/js/**",
	        "/style/**"
	};
//	
//	@Autowired
//	private TokenAuthService tokenAuthenticationService;
//
//	@Autowired
//	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
//
//	@Autowired
//	private JwtRequestFilter jwtRequestFilter;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
		.antMatchers(PUBLIC_MATCHERS).permitAll()
		.antMatchers("/authenticate").permitAll()
		.antMatchers("/signup").permitAll()
		.antMatchers("/user/**").authenticated()
		.antMatchers("/admin/**").hasAnyAuthority("DIRECTOR","STAFF")
		.antMatchers("/api/**").permitAll()
//		.antMatchers("/api/**").hasAuthority("DIRECTOR")
		.anyRequest().authenticated();
//		.and()
//		
//		.formLogin().loginPage("/login")
//		.usernameParameter("username")
//		.passwordParameter("password")
//        .defaultSuccessUrl("/")
//        .failureUrl("/login?failed=true")
//		.permitAll();
				/**
				 * make sure we use stateless session; session won't be used to store user's
				 * state.
				 */
//				.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//		http.addFilterBefore(new StatelessLoginFilter("/auth/login", tokenAuthenticationService, userDetailsService,
//				authenticationManager()), UsernamePasswordAuthenticationFilter.class);
//		// Add a filter to validate the tokens with every request
//		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());

	}

}
