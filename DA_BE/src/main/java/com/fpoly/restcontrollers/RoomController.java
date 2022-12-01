/**
 * 
 */
package com.fpoly.restcontrollers;

import java.util.ArrayList;
import java.util.List;
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

import com.fpoly.entities.NumberOfFloors;
import com.fpoly.entities.Rooms;
import com.fpoly.repositories.irepo.INumberOfFloorService;
import com.fpoly.repositories.irepo.IRoomService;
import com.fpoly.repositories.repo.NumberOfFloorRepository;
import com.fpoly.repositories.repo.RoomRepository;

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

	@Autowired
	RoomRepository roomRepo;

	@Autowired
	INumberOfFloorService numberFloorrepository;

	@Autowired
	NumberOfFloorRepository numberOfFloorrepository;

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

	@PostMapping("/Option/{SLRoom}")
	public ResponseEntity<List<Rooms>> createOptionRoom(@RequestBody Rooms room, @PathVariable Integer SLRoom) {
		List<NumberOfFloors> n = numberOfFloorrepository.findAll();

		NumberOfFloors nbf = new NumberOfFloors();
		nbf.setNumberOfFloors(n.get(n.size() - 1).getNumberOfFloors() + 1);
		nbf.setStatus(1);

		numberFloorrepository.save(nbf);
		n = numberOfFloorrepository.findAll();
		ArrayList<Rooms> listRoom = new ArrayList<>();
		for (int i = 1; i < SLRoom + 1; i++) {
			Rooms r = new Rooms();
			r.setKindOfRoom(room.getKindOfRoom());
			r.setNote(room.getNote());
//				r.setImg(room.getImg());
// 				r.setImg1(room.getImg1());
// 				r.setImg2(room.getImg2());
// 				r.setImg3(room.getImg3());
			r.setStatus(1);
			r.setName(room.getName() + n.get(n.size() - 1).getNumberOfFloors() + "0" + i);
			r.setNumberOfFloors(n.get(n.size() - 1));
			listRoom.add(r);
		}
		return new ResponseEntity<>(roomRepo.saveAll((Iterable<Rooms>) listRoom), HttpStatus.OK);
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
			room.setId(r.getId());
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
