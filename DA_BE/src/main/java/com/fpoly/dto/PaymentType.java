package com.fpoly.dto;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "PAYMENT_TYPE")
public class PaymentType implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NAME_PAYMENT_TYPE", nullable = false, length = 15)
	private String namePaymentType;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "paymentType")
	private Set<Bills> bills;

}
