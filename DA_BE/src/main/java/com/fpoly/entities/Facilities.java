package com.fpoly.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Facilities implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NAME", nullable = false, length = 255)
	private String name;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "facilities")
	@JsonIgnore
	private Set<FacilitiesDetails> facilitiesDetails;

}
