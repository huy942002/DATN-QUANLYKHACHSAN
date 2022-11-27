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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Bills implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NUMBER_OF_ADULTS", nullable = false, precision = 10)
	private int numberOfAdults;

	@Column(name = "NUMBER_OF_KIDS", nullable = false, precision = 10)
	private int numberOfKids;

	@Column(name = "HIRE_DATE", nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime hireDate;

	@Column(name = "CHECK_OUT_DAY")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime checkOutDay;

	@Column(name = "DEPOSITS", precision = 53)
	private double deposits;

	@Column(name = "DATE_OF_PAYMENT")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime dateOfPayment;

	@Column(name = "TOTAL_CASH", precision = 53)
	private double totalCash;

	@Column(name = "TOTAL_CARD", precision = 53)
	private double totalCard;

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

	@ManyToOne
	@JoinColumn(name = "ID_ROOM_REFUND_CONDITIONS")
	private RoomRefundConditions roomRefundConditions;

}
