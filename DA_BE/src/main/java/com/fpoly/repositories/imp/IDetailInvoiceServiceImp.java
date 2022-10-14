/**
 * 
 */
package com.fpoly.repositories.imp;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpoly.entities.DetailsInvoice;
import com.fpoly.repositories.irepo.IDetailInvoiceService;
import com.fpoly.repositories.repo.DetailInvoiceRepository;

/**
 *
 * @author trucnv
 *
 */
@Service
public class IDetailInvoiceServiceImp implements IDetailInvoiceService {

	@Autowired
	private DetailInvoiceRepository voiceRepo;

	@Override
	public Iterable<DetailsInvoice> findAll() {
		return voiceRepo.findAll();
	}

	@Override
	public Optional<DetailsInvoice> findById(Integer id) {
		return voiceRepo.findById(id);
	}

	@Override
	public DetailsInvoice save(DetailsInvoice t) {
		return voiceRepo.save(t);
	}

	@Override
	public void remove(Integer id) {
		voiceRepo.deleteById(id);
	}

}
