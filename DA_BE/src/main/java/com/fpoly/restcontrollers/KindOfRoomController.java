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

import com.fpoly.entities.KindOfRoom;
import com.fpoly.repositories.irepo.IKindOfRoomService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/kind-of-room")
public class KindOfRoomController {

	@Autowired
	IKindOfRoomService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<KindOfRoom>> getAllKindOfRoom() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<KindOfRoom> createNewKindOfRoom(@RequestBody KindOfRoom kind) {
		return new ResponseEntity<>(repository.save(kind), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<KindOfRoom> getKindOfRoom(@PathVariable Integer id) {
		Optional<KindOfRoom> kindOptional = repository.findById(id);
		return kindOptional.map(kind -> new ResponseEntity<>(kind, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<KindOfRoom> updateKindOfRoom(@PathVariable Integer id, @RequestBody KindOfRoom kind) {
		Optional<KindOfRoom> kindOptional = repository.findById(id);
		return kindOptional.map(k -> {
			kind.setId(k.getId());
			return new ResponseEntity<>(repository.save(kind), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<KindOfRoom> deleteKindOfRoom(@PathVariable Integer id) {
		Optional<KindOfRoom> kindOptional = repository.findById(id);
		return kindOptional.map(k -> {
			repository.remove(id);
			return new ResponseEntity<>(k, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
