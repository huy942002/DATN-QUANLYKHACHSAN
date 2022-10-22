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
public class DetailsInvoice implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NUMBER_OF_DAYS_OF_RENT")
	private LocalDateTime numberOfDaysOfRent;

	@Column(name = "NUMBER_OF_HOURS_TO_RENT", length = 10)
	private String numberOfHoursToRent;

	@Column(name = "NUMBER_OF_PEOPLE", precision = 10)
	private int numberOfPeople;

	@Column(name = "TOTAL_CASH", precision = 53)
	private double totalCash;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_BILL", nullable = false)
	private Bills bills;

	@OneToMany(mappedBy = "detailsInvoice")
	@JsonIgnore
	private Set<ServiceDetails> serviceDetails;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_ROOMS", nullable = false)
	private Rooms rooms;

	@OneToMany(mappedBy = "detailsInvoice")
	@JsonIgnore
	private Set<DetailsOfRentalTypes> detailsOfRentalTypes;

}