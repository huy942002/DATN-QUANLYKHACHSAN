package com.fpoly.entities;

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
public class ServiceDetails implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SERDE_ID", unique = true, nullable = false, precision = 10)
	private int serdeId;

	@Column(name = "QUANTITY", nullable = false, precision = 10)
	private int quantity;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@ManyToOne(optional = false)
	@JoinColumn(name = "BILL_DETAILS_ID", nullable = false)
	private BillDetails billDetails;

	@ManyToOne(optional = false)
	@JoinColumn(name = "SERVICE_ID", nullable = false)
	private Servicess servicess;

}
