/**
 *
 */
package com.fpoly.restcontrollers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fpoly.dto.RoomManageDTO;
import com.fpoly.entities.*;
import com.fpoly.repositories.repo.FacilityDetailRepository;
import com.fpoly.repositories.repo.ServiceAvailableRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
	NumberOfFloorRepository numberOfFloorrepository;

	@Autowired
	FacilityDetailRepository facilityDetailRepository;

	@Autowired
	ServiceAvailableRepository serviceAvailableRepository;

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
	@Transactional
	public ResponseEntity<?> createOptionRoom(@RequestBody RoomManageDTO room, @PathVariable Integer SLRoom) {
		List<NumberOfFloors> n = numberOfFloorrepository.findAll();
		System.out.println(room.getRooms().getName()+"///////");
		List<Rooms> listRoom = new ArrayList<>();
		for (int i = 1; i < SLRoom + 1; i++) {
			Rooms r = new Rooms();
			r.setKindOfRoom(room.getRooms().getKindOfRoom());
			r.setNote(room.getRooms().getNote());
//				r.setImg(room.getImg());
// 				r.setImg1(room.getImg1());
// 				r.setImg2(room.getImg2());
// 				r.setImg3(room.getImg3());
			r.setStatus(1);
			r.setName(room.getRooms().getName() + n.get(n.size() - 1).getNumberOfFloors() + "0" + i);
			r.setNumberOfFloors(n.get(n.size() - 1));
			listRoom.add(r);
		}
		roomRepo.saveAll(listRoom);

		List<Rooms> listRoomnew = roomRepo.findAll();
		List<FacilitiesDetails> facilitiesDetailsList = new ArrayList<>();
		for (int i = 1; i < SLRoom + 2; i++) {
			for (FacilitiesDetails facilitiesDetailsDTO : room.getFacilitiesDetailsList()){
				System.out.println(listRoomnew.get(listRoomnew.size()-i).getId()+"???????????????????????????");
				facilitiesDetailsDTO.setRooms(listRoomnew.get(listRoomnew.size()-i));
				facilitiesDetailsList.add(facilitiesDetailsDTO);
			}

		}
		for (FacilitiesDetails ff :
				facilitiesDetailsList) {
			System.out.println(ff);
		}
		facilityDetailRepository.saveAll(facilitiesDetailsList);
		List<ServiceAvailable> serviceAvailableList = new ArrayList<>();
		for (int i = 1; i < SLRoom + 2; i++) {

			for (ServiceAvailable serviceAvailableDTO : room.getServiceAvailableList()){
//				serviceAvailableDTO.setId();
				System.out.println(listRoomnew.get(listRoomnew.size()-i).getId()+"???????????????????????????");
				serviceAvailableDTO.setRooms(listRoomnew.get(listRoomnew.size()-i));
				serviceAvailableList.add(serviceAvailableDTO);
			}

		}
		for (ServiceAvailable ss :
				serviceAvailableList) {
			System.out.println(ss);
		}
		serviceAvailableRepository.saveAll(serviceAvailableList);
		return new ResponseEntity<>(HttpStatus.OK);
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
