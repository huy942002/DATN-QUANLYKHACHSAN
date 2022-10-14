/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Booking;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{

}
