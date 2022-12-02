/**
 * 
 */
package com.fpoly.repositories.repo;

import com.fpoly.entities.Bills;
import com.fpoly.entities.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.DetailsInvoice;

import java.util.List;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface DetailInvoiceRepository extends JpaRepository<DetailsInvoice, Integer>{
    DetailsInvoice findByRoomsAndStatus(Rooms rooms, int status);
    List<DetailsInvoice> findByBillsAndStatus(Bills bills, int status);
}
