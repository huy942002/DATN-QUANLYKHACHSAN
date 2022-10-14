/**
 * 
 */
package com.fpoly.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpoly.entities.BookingType;
import com.fpoly.repositories.irepo.IBookingTypeService;
import com.fpoly.repositories.repo.BookingTypeRepository;

/**
 *
 * @author trucnv
 *
 */
@Service
public class IBookingTypeServiceImp implements IBookingTypeService {

	@Autowired
	private BookingTypeRepository bookingTypeRepo;

	@Override
	public Iterable<BookingType> findAll() {
		return bookingTypeRepo.findAll();
	}

	@Override
	public Optional<BookingType> findById(Integer id) {
		return bookingTypeRepo.findById(id);
	}

	@Override
	public BookingType save(BookingType t) {
		return bookingTypeRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		bookingTypeRepo.deleteById(id);
	}

}
