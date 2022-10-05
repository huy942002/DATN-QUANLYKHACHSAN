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
public class FacilitiesDetails implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FADE_ID", unique = true, nullable = false, precision = 10)
	private int fadeId;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@ManyToOne(optional = false)
	@JoinColumn(name = "FACILITIES_ID", nullable = false)
	private Facilities facilities;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ROOMS_ID", nullable = false)
	private Rooms rooms;

}
