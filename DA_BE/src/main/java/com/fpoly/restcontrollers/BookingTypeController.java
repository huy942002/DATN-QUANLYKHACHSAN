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

import com.fpoly.entities.BookingType;
import com.fpoly.repositories.irepo.IBookingTypeService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/booking-type")
public class BookingTypeController {

	@Autowired
	IBookingTypeService repository;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<BookingType>> getAllBookingType() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<BookingType> createNewBooking(@RequestBody BookingType bookingType) {
		return new ResponseEntity<>(repository.save(bookingType), HttpStatus.OK);
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<BookingType> getBookingType(@PathVariable Integer id) {
		Optional<BookingType> bookingTypeOptional = repository.findById(id);
		return bookingTypeOptional.map(bookingType -> new ResponseEntity<>(bookingType, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<BookingType> updateBookingType(@PathVariable Integer id, @RequestBody BookingType bookingType) {
		Optional<BookingType> bookingTypeOptional = repository.findById(id);
		return bookingTypeOptional.map(b -> {
			bookingType.setId(b.getId());
			return new ResponseEntity<>(repository.save(bookingType), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<BookingType> deleteBookingType(@PathVariable Integer id) {
		Optional<BookingType> bookingTypeOptional = repository.findById(id);
		return bookingTypeOptional.map(b -> {
			repository.remove(id);
			return new ResponseEntity<>(b, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
