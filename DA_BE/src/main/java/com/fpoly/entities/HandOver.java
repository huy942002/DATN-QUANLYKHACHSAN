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
public class HandOver implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "RECEIVER", nullable = false, length = 255)
	private String receiver;

	@Column(name = "DATE_TIME_START", nullable = false)
	private LocalDateTime dateTimeStart;

	@Column(name = "DATE_TIME_END", nullable = false)
	private LocalDateTime dateTimeEnd;

	@Column(name = "TOTAL_MONEY", nullable = false, precision = 53)
	private double totalMoney;

	@Column(name = "TOTAL_MONEY_CARD", nullable = false, precision = 53)
	private double totalMoneyCard;

	@Column(name = "TOTAL_CASH", nullable = false, precision = 53)
	private double totalCash;

	@Column(name = "SURCHARGE", nullable = false, precision = 53)
	private double surcharge;
	
	@Column(name = "MONEY_REAL", nullable = false, precision = 53)
	private double moneyReal;
	
	@Column(name = "MONEY_FIRST", nullable = false, precision = 53)
	private double moneyFirst;

	@Column(name = "NOTE", length = 255)
	private String note;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_PERSONNEL", nullable = false)
	private Personnel personnel;

}