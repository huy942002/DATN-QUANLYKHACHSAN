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

import com.fpoly.entities.Servicess;
import com.fpoly.repositories.irepo.IServiceService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/service")
public class ServiceController {

	@Autowired
	IServiceService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Servicess>> getAllService() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Servicess> createNewService(@RequestBody Servicess service) {
		return new ResponseEntity<>(repository.save(service), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Servicess> getService(@PathVariable Integer id) {
		Optional<Servicess> serviceOptional = repository.findById(id);
		return serviceOptional.map(service -> new ResponseEntity<>(service, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Servicess> updateService(@PathVariable Integer id, @RequestBody Servicess service) {
		Optional<Servicess> serviceOptional = repository.findById(id);
		return serviceOptional.map(s -> {
			service.setId(s.getId());
			return new ResponseEntity<>(repository.save(service), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Servicess> deleteService(@PathVariable Integer id) {
		Optional<Servicess> serviceOptional = repository.findById(id);
		return serviceOptional.map(s -> {
			repository.remove(id);
			return new ResponseEntity<>(s, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
