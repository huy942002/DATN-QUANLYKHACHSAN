/**
 * 
 */
package com.fpoly.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fpoly.dto.Roles;
import com.fpoly.dto.Users;
import com.fpoly.repositories.repo.UserRepository;

/**
 *
 * @author trucnv
 *
 */
@Service
public class SecurityUserDetails implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users user = userRepo.findByUsernameEquals(username);
		if (user == null) {
			throw new UsernameNotFoundException("Invalid username or password");
		}

		// add grantedAuthorities from roles
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		Roles roles = user.getRoles();
		grantedAuthorities.add(new SimpleGrantedAuthority(roles.getRoles()));

		return new User(user.getUsername(), user.getPass(), grantedAuthorities);
	}
}
