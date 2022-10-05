package com.fpoly.entities;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ServiceType implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SERTY_ID", unique = true, nullable = false, precision = 10)
	private int sertyId;

	@Column(name = "SERVICES_TYPE", nullable = false, length = 20)
	private String servicesType;

	@Column(name = "NOTE", length = 30)
	private String note;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@OneToMany(mappedBy = "serviceType")
	@JsonIgnore
	private Set<Servicess> servicess;

}
