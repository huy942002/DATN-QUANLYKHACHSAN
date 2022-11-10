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
public class Bills implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "HIRE_DATE", nullable = false)
	private LocalDateTime hireDate;

	@Column(name = "CHECK_OUT_DAY")
	private LocalDateTime checkOutDay;

	@Column(name = "NUMBER_OF_ROOM", precision = 10)
	private Integer numberOfRoom;

	@Column(name = "NUMBER_OF_PEOPLE", precision = 10)
	private Integer numberOfPeople;

	@Column(name = "DATE_OF_PAYMENT")
	private LocalDateTime dateOfPayment;

	@Column(name = "TOTAL_CASH", precision = 53)
	private Double totalCash;
	
	@Column(name = "TOTAL_CARD", precision = 53)
	private Double totalCard;

	@Column(name = "DEPOSITS", precision = 53)
	private Double deposits;
	
	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "bills")
	@JsonIgnore
	private Set<Booking> booking;

	@OneToMany(mappedBy = "bills")
	@JsonIgnore
	private Set<DetailsInvoice> detailsInvoice;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_CUSTOMER", nullable = false)
	private Customer customer;
	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_PAYMENT_TYPE", nullable = false)
	private PaymentType paymentType;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_PERSONNEL", nullable = false)
	private Personnel personnel;

}
