package com.fpoly.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Users implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "USERNAME", nullable = false, length = 30)
	private String username;

	@Column(name = "PASSWORD", nullable = false, length = 30)
	private String password;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(	name = "authority", 
				joinColumns = @JoinColumn(name = "id_user"), 
				inverseJoinColumns = @JoinColumn(name = "id_roles"))
	private Set<Roles> roles ;

	@OneToMany(mappedBy = "users")
	@JsonIgnore
	private Set<Customer> customer;

	@OneToMany(mappedBy = "users")
	@JsonIgnore
	private Set<Employees> employees;

}