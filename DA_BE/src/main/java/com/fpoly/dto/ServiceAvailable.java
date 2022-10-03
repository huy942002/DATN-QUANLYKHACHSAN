package com.fpoly.dto;

import java.io.Serializable;

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
public class ServiceAvailable implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "QUANTILY", nullable = false, precision = 10)
	private int quantily;

	@Column(name = "TOTAL_CASH", nullable = false, precision = 53)
	private double totalCash;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_DETAILS_INVOICE", nullable = false)
	private DetailsInvoice detailsInvoice;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_SERVICE", nullable = false)
	private Servicess servicess;

}
