package com.fpoly.dto;

import java.io.Serializable;
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
public class Servicess implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NAME_SERVICES", nullable = false, length = 20)
	private String nameServices;

	@Column(name = "PRICES", nullable = false, precision = 53)
	private double prices;

	@Column(name = "NOTE", length = 30)
	private String note;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@OneToMany(mappedBy = "servicess")
	@JsonIgnore
	private Set<ServiceDetails> serviceDetails;

	@OneToMany(mappedBy = "servicess")
	@JsonIgnore
	private Set<ServiceAvailable> serviceAvailable;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_SERVICE_TYPE", nullable = false)
	private ServiceType serviceType;

}
