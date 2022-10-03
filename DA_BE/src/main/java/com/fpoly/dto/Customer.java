package com.fpoly.dto;

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
public class Customer implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

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

	@Column(name = "ADDRESS")
	private String address;

	@Column(name = "IMG")
	private String img;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "customer")
	@JsonIgnore
	private Set<Bills> bills;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_USER", nullable = false)
	private Users users;

}
