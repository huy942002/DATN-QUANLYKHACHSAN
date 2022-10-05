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
public class KindOfRoom implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "KOR_ID", unique = true, nullable = false, precision = 10)
	private int korId;

	@Column(name = "ROOM_TYPE_NAME", nullable = false, length = 30)
	private String roomTypeName;

	@Column(name = "NOTE", nullable = false, length = 30)
	private String note;

	@Column(name = "STATUSS", nullable = false, precision = 10)
	private int statuss;

	@OneToMany(mappedBy = "kindOfRoom")
	@JsonIgnore
	private Set<Rooms> rooms;

}
