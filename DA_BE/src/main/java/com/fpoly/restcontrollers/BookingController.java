/**
 *
 */
package com.fpoly.restcontrollers;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.fpoly.entities.Bills;
import com.fpoly.entities.KindOfRoom;
import com.fpoly.entities.Rooms;
import com.fpoly.repositories.irepo.*;
import com.fpoly.repositories.repo.BillRepository;
import com.fpoly.repositories.repo.BookingRepository;
import com.fpoly.repositories.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
import com.fpoly.config.Config;

import javax.servlet.http.HttpServletRequest;

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
	IBillService repositoryBill;

	@Autowired
	BillRepository repositoryBill2;

	@Autowired
	IBookingService iBookingService;

	@Autowired
	BookingRepository bkr;

	@Autowired
	RoomRepository rr;

	@Autowired
	IKindOfRoomService repositoryKindOfRoom;

	@Autowired
	ICustomerService repositoryCTM;

	@Autowired
	IPaymentTypeService repositoryPT;

	@Autowired
	HttpServletRequest req;
	// getAll
//	@GetMapping
//	public ResponseEntity<Iterable<Booking>> getAllBooking() {
//		return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
//	}
//	@GetMapping("/status")
//	public ResponseEntity<Iterable<Booking>> getAllBookingByStatus() {
//		return new ResponseEntity<>(bkr.findByStatus(1), HttpStatus.OK);
//	}
//
//	@GetMapping("/{dateOfHire}/{checkOutDay}/{idKindOfRoom}/{id}")
//	public ResponseEntity<Iterable<Rooms>> SeachRoomBydateBooking(@PathVariable String dateOfHire, @PathVariable String checkOutDay, @PathVariable int idKindOfRoom,@PathVariable Integer id) {
//		Optional<KindOfRoom> kindOptional = repositoryKindOfRoom.findById(idKindOfRoom);
//		int countRoom = rr.CountRoomByKindOfRoom(kindOptional);
//		System.out.println(countRoom);
//		int countRoomBK = bkr.CountRoomByTimeBooking(LocalDate.parse(dateOfHire),LocalDate.parse(checkOutDay) ,0);
//
//		System.out.println(countRoomBK);
//		if (countRoomBK<countRoom){
//			Iterable<Rooms> rooms = rr.getRoomByBooking(LocalDate.parse(dateOfHire),LocalDate.parse(checkOutDay),kindOptional);
//			return new ResponseEntity<>(rooms,HttpStatus.OK);
//		}else {
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//		}
//	}
//
//	@GetMapping("add/{dateOfHire}/{checkOutDay}/{idKindOfRoom}/{id}/{name}/{number}/{email}/{citizenIdCode}/{Deposits}")
//	public ResponseEntity<Booking> createNewBookingByctm(@PathVariable String dateOfHire, @PathVariable String checkOutDay, @PathVariable int idKindOfRoom ,@PathVariable Integer id, @PathVariable String name, @PathVariable String number, @PathVariable String email, @PathVariable String citizenIdCode, @PathVariable String Deposits) {
//
//		Bills bill = new Bills();
//		bill.setDeposits(Double.parseDouble(Deposits));
//		bill.setCustomer(repositoryCTM.findById(id).get());
//		bill.setStatus(1);
//		bill.setPaymentType(repositoryPT.findById(1).get());
//		repositoryBill.save(bill);
//
//		List<Bills> listBill = repositoryBill2.getBillByCustomer(repositoryCTM.findById(id));
//
//		Optional<KindOfRoom> kindOptional = repositoryKindOfRoom.findById(idKindOfRoom);
//		Booking booking = new Booking();
//		booking.setName(name);
//		booking.setEmail(email);
//		booking.setPhoneNumber(number);
//		booking.setCitizenIdCode(citizenIdCode);
//		booking.setBills(listBill.get(listBill.size()-1));
//		booking.setDateOfHire(LocalDate.parse(dateOfHire));
//		booking.setCheckOutDay(LocalDate.parse(checkOutDay));
//		booking.setTimeIn("12h");
//		booking.setTimeOut("12h");
//		booking.setKindOfRoom(kindOptional.get());
//		booking.setStatus(1);
//		repository.save(booking);
//		return new ResponseEntity<>(HttpStatus.OK);
//	}
//
//	// add new
//	@PostMapping
//	public ResponseEntity<Booking> createNewBooking(@RequestBody Booking booking) {
//		return new ResponseEntity<>(repository.save(booking), HttpStatus.OK);
//	}
//
//	// getById
//	@GetMapping("/{id}")
//	public ResponseEntity<Booking> getBooking(@PathVariable Integer id) {
//		Optional<Booking> bookingOptional = repository.findById(id);
//		return bookingOptional.map(booking -> new ResponseEntity<>(booking, HttpStatus.OK))
//				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}
//
//	// update
//	@PutMapping("/{id}")
//	public ResponseEntity<Booking> updateBooking(@PathVariable Integer id, @RequestBody Booking booking) {
//		Optional<Booking> bookingOptional = repository.findById(id);
//		return bookingOptional.map(b -> {
//			booking.setId(b.getId());
//			return new ResponseEntity<>(repository.save(booking), HttpStatus.OK);
//		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}
//
//	// delete
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Booking> deleteBooking(@PathVariable Integer id) {
//		Optional<Booking> bookingOptional = repository.findById(id);
//		return bookingOptional.map(b -> {
//			repository.remove(id);
//			return new ResponseEntity<>(b, HttpStatus.OK);
//		}).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}

    @Transactional
    @GetMapping("/get-list-booking-paid")
    public ResponseEntity<?> getListBookingPaid() {
        return new ResponseEntity<>(iBookingService.findByStatusAndPaymentStatus(1, 2), HttpStatus.OK);
    }

}
