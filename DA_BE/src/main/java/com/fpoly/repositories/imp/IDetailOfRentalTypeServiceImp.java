/**
 * 
 */
package com.fpoly.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpoly.entities.DetailsOfRentalTypes;
import com.fpoly.repositories.irepo.IDetailOfRentalTypeService;
import com.fpoly.repositories.repo.DetailOfRentalTypeRepository;

/**
 *
 * @author trucnv
 *
 */
@Service
public class IDetailOfRentalTypeServiceImp implements IDetailOfRentalTypeService {

	@Autowired
	private DetailOfRentalTypeRepository detailTypeRepo;

	@Override
	public Iterable<DetailsOfRentalTypes> findAll() {
		return detailTypeRepo.findAll();
	}

	@Override
	public Optional<DetailsOfRentalTypes> findById(Integer id) {
		return detailTypeRepo.findById(id);
	}

	@Override
	public DetailsOfRentalTypes save(DetailsOfRentalTypes t) {
		return detailTypeRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		detailTypeRepo.deleteById(id);
	}

}
