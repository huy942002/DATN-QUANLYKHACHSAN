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
public class Rooms implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false, precision = 10)
	private int id;

	@Column(name = "NOTE", length = 50)
	private String note;

	@Column(name = "IMG")
	private String img;

	@Column(name = "STATUS", nullable = false, precision = 10)
	private int status;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_KIND_OF_ROOM", nullable = false)
	private KindOfRoom kindOfRoom;

	@ManyToOne(optional = false)
	@JoinColumn(name = "ID_NUMBER_OF_FLOORS", nullable = false)
	private NumberOfFloors numberOfFloors;

	@OneToMany(mappedBy = "rooms")
	@JsonIgnore
	private Set<FacilitiesDetails> facilitiesDetails;

	@OneToMany(mappedBy = "rooms")
	@JsonIgnore
	private Set<DetailsInvoice> detailsInvoice;

}
