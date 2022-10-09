/**
 * 
 */
package com.fpoly.controllers;

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

import com.fpoly.entities.Rooms;
import com.fpoly.repositories.irepo.IRoomService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/room")
public class RoomController {

	@Autowired
	IRoomService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Rooms>> getAllRoom() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Rooms> createNewRoom(@RequestBody Rooms room) {
		return new ResponseEntity<>(repository.save(room), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Rooms> getRoom(@PathVariable Integer id) {
		Optional<Rooms> roomOptional = repository.findById(id);
		return roomOptional.map(room -> new ResponseEntity<>(room, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Rooms> updateRoom(@PathVariable Integer id, @RequestBody Rooms room) {
		Optional<Rooms> roomOptional = repository.findById(id);
		return roomOptional.map(r -> {
			room.setRoomsId(r.getRoomsId());
			return new ResponseEntity<>(repository.save(room), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Rooms> deleteRoom(@PathVariable Integer id) {
		Optional<Rooms> roomOptional = repository.findById(id);
		return roomOptional.map(r -> {
			repository.remove(id);
			return new ResponseEntity<>(r, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
