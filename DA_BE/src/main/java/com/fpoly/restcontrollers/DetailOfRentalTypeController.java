/**
 * 
 */
package com.fpoly.restcontrollers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpoly.entities.DetailsOfRentalTypes;
import com.fpoly.repositories.irepo.IDetailOfRentalTypeService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/detail-of-rental-type")
public class DetailOfRentalTypeController {

	@Autowired
	IDetailOfRentalTypeService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<DetailsOfRentalTypes>> getAllDetailOfRentalType() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<DetailsOfRentalTypes> createNewDetailRentalType(
			@RequestBody DetailsOfRentalTypes detailRentype) {
		return new ResponseEntity<>(repository.save(detailRentype), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<DetailsOfRentalTypes> getDetailOfRentalType(@PathVariable Integer id) {
		Optional<DetailsOfRentalTypes> detailRentypeOptional = repository.findById(id);
		return detailRentypeOptional.map(detailRentype -> new ResponseEntity<>(detailRentype, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<DetailsOfRentalTypes> updateDetailOfRentalType(@PathVariable Integer id,
			@RequestBody DetailsOfRentalTypes detailRentype) {
		Optional<DetailsOfRentalTypes> detailRentypeOptional = repository.findById(id);
		return detailRentypeOptional.map(r -> {
			detailRentype.setId(r.getId());
			return new ResponseEntity<>(repository.save(detailRentype), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<DetailsOfRentalTypes> deleteDetailOfRentalType(@PathVariable Integer id) {
		Optional<DetailsOfRentalTypes> detailRentypeOptional = repository.findById(id);
		return detailRentypeOptional.map(r -> {
			repository.remove(id);
			return new ResponseEntity<>(r, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
