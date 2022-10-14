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

import com.fpoly.entities.ServiceAvailable;
import com.fpoly.repositories.irepo.IServiceAvailableService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/service-available")
public class ServiceAvailableController {

	@Autowired
	IServiceAvailableService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<ServiceAvailable>> getAllServiceAvailable() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<ServiceAvailable> createNewServiceAvailable(@RequestBody ServiceAvailable sva) {
		return new ResponseEntity<>(repository.save(sva), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<ServiceAvailable> getServiceAvailable(@PathVariable Integer id) {
		Optional<ServiceAvailable> svaOptional = repository.findById(id);
		return svaOptional.map(sva -> new ResponseEntity<>(sva, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<ServiceAvailable> updateServiceAvailable(@PathVariable Integer id, @RequestBody ServiceAvailable sva) {
		Optional<ServiceAvailable> svaOptional = repository.findById(id);
		return svaOptional.map(s -> {
			sva.setId(s.getId());
			return new ResponseEntity<>(repository.save(sva), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<ServiceAvailable> deleteServiceAvailable(@PathVariable Integer id) {
		Optional<ServiceAvailable> svaOptional = repository.findById(id);
		return svaOptional.map(s -> {
			repository.remove(id);
			return new ResponseEntity<>(s, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
