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
public class NumberOfFloors implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "NOF_ID", unique = true, nullable = false, precision = 10)
	private int nofId;

	@Column(name = "NUMBER_OF_FLOORS", nullable = false, precision = 10)
	private int numberOfFloors;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@OneToMany(mappedBy = "numberOfFloors")
	@JsonIgnore
	private Set<Rooms> rooms;

}