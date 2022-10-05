package com.fpoly.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Employees implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EMPLOYEES_ID", unique = true, nullable = false, precision = 10)
	private int employeesId;

	@Column(name = "FULLNAME", nullable = false, length = 50)
	private String fullname;

	@Column(name = "EMAIL", nullable = false, length = 50)
	private String email;

	@Column(name = "GENDER", nullable = false, length = 3)
	private String gender;

	@Column(name = "DATE_OF_BIRTH", nullable = false)
	private LocalDateTime dateOfBirth;

	@Column(name = "PHONE_NUMBER", nullable = false, length = 12)
	private String phoneNumber;

	@Column(name = "ADDRESSS")
	private String addresss;

	@Column(name = "IMG")
	private String img;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "USERS_ID", nullable = false)
	private Users users;

	@OneToMany(mappedBy = "employees")
	@JsonIgnore
	private Set<Bills> bills;

}
