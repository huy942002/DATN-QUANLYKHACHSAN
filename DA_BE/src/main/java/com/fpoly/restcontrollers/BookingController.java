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

import com.fpoly.entities.Booking;
import com.fpoly.repositories.irepo.IBookingService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/booking")
public class BookingController {

	@Autowired
	IBookingService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Booking>> getAllBooking() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Booking> createNewBooking(@RequestBody Booking booking) {
		return new ResponseEntity<>(repository.save(booking), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Booking> getBooking(@PathVariable Integer id) {
		Optional<Booking> bookingOptional = repository.findById(id);
		return bookingOptional.map(booking -> new ResponseEntity<>(booking, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable Integer id, @RequestBody Booking booking) {
		Optional<Booking> bookingOptional = repository.findById(id);
		return bookingOptional.map(b -> {
			booking.setId(b.getId());
			return new ResponseEntity<>(repository.save(booking), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Booking> deleteBooking(@PathVariable Integer id) {
		Optional<Booking> bookingOptional = repository.findById(id);
		return bookingOptional.map(b -> {
			repository.remove(id);
			return new ResponseEntity<>(b, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
