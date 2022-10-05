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
public class BillDetails implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BIDE_ID", unique = true, nullable = false, precision = 10)
	private int bideId;

	@Column(name = "NUMBER_OF_DAYS_OF_RENT")
	private LocalDateTime numberOfDaysOfRent;

	@Column(name = "NUMBER_OF_HOURS_TO_RENT", length = 10)
	private String numberOfHoursToRent;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@ManyToOne(optional = false)
	@JoinColumn(name = "BILLS_ID", nullable = false)
	private Bills bills;

	@OneToMany(mappedBy = "billDetails")
	@JsonIgnore
	private Set<ServiceDetails> serviceDetails;

	@OneToMany(mappedBy = "billDetails")
	@JsonIgnore
	private Set<ServiceAvailable> serviceAvailable;

	@ManyToOne(optional = false)
	@JoinColumn(name = "RENTAL_TYPE_ID", nullable = false)
	private RentalTypes rentalTypes;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ROOMS_ID", nullable = false)
	private Rooms rooms;

}
