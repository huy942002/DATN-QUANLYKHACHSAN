package com.fpoly.entities;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "CUSTOMER_NAME", nullable = false, length = 255)
	private String name;

	@Column(name = "EMAIL", length = 255)
	private String email;

	@Column(name = "CITIZEN_ID_CODE", length = 12)
	private String citizenIdCode;

	@Column(name = "PHONE_NUMBER", length = 12)
	private String phoneNumber;

	@Column(name = "DATE_OF_HIRE", nullable = false)
	private LocalDate dateOfHire;

	@Column(name = "CHECK_OUT_DAY", nullable = false)
	private LocalDate checkOutDay;

	@Column(name = "TIME_IN", length = 15)
	private String timeIn;

	@Column(name = "TIME_OUT", length = 15)
	private String timeOut;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_BILL", nullable = false)
	private Bills bills;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_KIND_OF_ROOM", nullable = false)
	private KindOfRoom kindOfRoom;

}
