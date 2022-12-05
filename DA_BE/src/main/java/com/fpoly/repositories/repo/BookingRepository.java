/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Booking;

import java.time.LocalDate;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{
    @Query("SELECT COUNT(*) FROM Booking WHERE (dateOfHire <=:dateOfHire AND checkOutDay >= :dateOfHire) OR (dateOfHire <= :checkOutDay AND checkOutDay >= :checkOutDay) AND status >:status")
    public Integer CountRoomByTimeBooking(@Param("dateOfHire") LocalDate dateOfHire, @Param("checkOutDay") LocalDate checkOutDay, @Param("status") int status);
}
