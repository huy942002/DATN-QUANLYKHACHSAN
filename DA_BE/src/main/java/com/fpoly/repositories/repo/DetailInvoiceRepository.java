/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.DetailsInvoice;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface DetailInvoiceRepository extends JpaRepository<DetailsInvoice, Integer>{

}
