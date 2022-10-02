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

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "DETAILS_INVOICE")
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

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_BILL", nullable = false)
	private Bills bills;

	@OneToMany(mappedBy = "detailsInvoice")
	private Set<ServiceDetails> serviceDetails;

	@OneToMany(mappedBy = "detailsInvoice")
	private Set<ServiceAvailable> serviceAvailable;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_RENTAL_TYPES", nullable = false)
	private RentalTypes rentalTypes;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_ROOMS", nullable = false)
	private Rooms rooms;

}
