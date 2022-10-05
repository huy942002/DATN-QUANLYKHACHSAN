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
	@Column(name = "BILLS_ID", unique = true, nullable = false, precision = 10)
	private int billsId;

	@Column(name = "HIRE_DATE", nullable = false)
	private LocalDateTime hireDate;

	@Column(name = "CHECK_OUT_DAY", nullable = false)
	private LocalDateTime checkOutDay;

	@Column(name = "NUMBER_OF_PEOPLE", nullable = false, precision = 10)
	private int numberOfPeople;

	@Column(name = "DATE_OF_PAYMENT", nullable = false)
	private LocalDateTime dateOfPayment;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@OneToMany(mappedBy = "bills")
	@JsonIgnore
	private Set<Booking> booking;

	@OneToMany(mappedBy = "bills")
	@JsonIgnore
	private Set<BillDetails> billDetails;

	@ManyToOne(optional = false)
	@JoinColumn(name = "CUSTOMERS_ID", nullable = false)
	private Customer customer;

	@ManyToOne(optional = false)
	@JoinColumn(name = "EMPLOYEES_ID", nullable = false)
	private Employees employees;

	@ManyToOne(optional = false)
	@JoinColumn(name = "PAYMENT_TYPE_ID", nullable = false)
	private PaymentType paymentType;

}