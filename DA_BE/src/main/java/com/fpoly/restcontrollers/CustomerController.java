/**
 * 
 */
package com.fpoly.restcontrollers;

import java.util.Optional;

import com.fpoly.repositories.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpoly.entities.Customer;
import com.fpoly.repositories.irepo.ICustomerService;

/**
 *
 * @author trucnv
 *
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	ICustomerService repository;

	@Autowired
	CustomerRepository repository2;

	// getAll
	@GetMapping
	public ResponseEntity<Iterable<Customer>> getAllCustomer() {
		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
	}

	// add new
	@PostMapping
	public ResponseEntity<Customer> createNewCustomer(@RequestBody Customer customer) {
		Customer c = customer;
		c.getUsers().setPassword(BCrypt.hashpw(customer.getUsers().getPassword(), BCrypt.gensalt()));;
		return new ResponseEntity<>(repository.save(c), HttpStatus.OK);
	}

	@GetMapping("/nameUser/{username}")
	public ResponseEntity<Customer> getCustomerBynameUser(@PathVariable String username) {
		Optional<Customer> c = repository2.getCutomer(username);
		return c.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// getById
	@GetMapping("/{id}")
	public ResponseEntity<Customer> getCustomer(@PathVariable Integer id) {
		Optional<Customer> customerOptional = repository.findById(id);
		return customerOptional.map(customer -> new ResponseEntity<>(customer, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// update
	@PutMapping("/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
		Optional<Customer> customerOptional = repository.findById(id);
		return customerOptional.map(c -> {
			customer.setId(c.getId());
			return new ResponseEntity<>(repository.save(customer), HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	// delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Customer> deleteCustomer(@PathVariable Integer id) {
		Optional<Customer> customerOptional = repository.findById(id);
		return customerOptional.map(c -> {
			repository.remove(id);
			return new ResponseEntity<>(c, HttpStatus.OK);
		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
