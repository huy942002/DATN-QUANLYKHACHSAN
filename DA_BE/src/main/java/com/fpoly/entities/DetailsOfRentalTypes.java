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
public class DetailsOfRentalTypes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "DAY_IN")
	private LocalDateTime dayIn;

	@Column(name = "DAY_OUT")
	private LocalDateTime dayOut;

	@Column(name = "TIME_IN", length = 12)
	private String timeIn;

	@Column(name = "TIME_OUT", length = 12)
	private String timeOut;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_RENTAL_TYPES", nullable = false)
	private RentalTypes rentalTypes;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_DETAILS_INVOICE", nullable = false)
	private DetailsInvoice detailsInvoice;

}
