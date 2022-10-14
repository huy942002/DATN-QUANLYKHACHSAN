/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.BookingType;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface BookingTypeRepository extends JpaRepository<BookingType, Integer>{

}
