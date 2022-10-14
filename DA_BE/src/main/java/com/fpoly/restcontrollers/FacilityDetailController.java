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

import com.fpoly.entities.FacilitiesDetails;
import com.fpoly.repositories.irepo.IFacilityDetailService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/facility-detail")
public class FacilityDetailController {

	@Autowired
	IFacilityDetailService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<FacilitiesDetails>> getAllFacilityDetail() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<FacilitiesDetails> createNewFacilityDetail(@RequestBody FacilitiesDetails facilityDetail) {
		return new ResponseEntity<>(repository.save(facilityDetail), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<FacilitiesDetails> getFacilityDetail(@PathVariable Integer id) {
		Optional<FacilitiesDetails> facilityDetailOptional = repository.findById(id);
		return facilityDetailOptional.map(facilityDetail -> new ResponseEntity<>(facilityDetail, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<FacilitiesDetails> updateFacilityDetail(@PathVariable Integer id, @RequestBody FacilitiesDetails facilityDetail) {
		Optional<FacilitiesDetails> facilityDetailOptional = repository.findById(id);
		return facilityDetailOptional.map(f -> {
			facilityDetail.setId(f.getId());
			return new ResponseEntity<>(repository.save(facilityDetail), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<FacilitiesDetails> deleteFacilityDetail(@PathVariable Integer id) {
		Optional<FacilitiesDetails> facilityDetailOptional = repository.findById(id);
		return facilityDetailOptional.map(f -> {
			repository.remove(id);
			return new ResponseEntity<>(f, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
