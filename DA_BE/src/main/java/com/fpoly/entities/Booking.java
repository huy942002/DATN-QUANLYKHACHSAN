package com.fpoly.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "DATE_OF_HIRE", nullable = false)
	private LocalDateTime dateOfHire;

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
	@JoinColumn(name = "ID_BOOKING_TYPE", nullable = false)
	private BookingType bookingType;

}
