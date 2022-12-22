/**
 * 
 */
package com.fpoly.repositories.repo;

import com.fpoly.entities.Bills;
import com.fpoly.entities.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query(value = "select * from DETAILS_INVOICE where ID_ROOMS = :roomId AND (STATUS = 3 OR STATUS = 1) AND CONVERT(DATE,:date) >= CONVERT(DATE, HIRE_DATE) AND CONVERT(DATE,:date) <= CONVERT(DATE, CHECK_OUT_DAY)", nativeQuery = true)
    List<DetailsInvoice> getListDetailInvoiceByDate(@Param("roomId") Integer roomId,@Param("date") String date);

    @Query(value = "select * from DETAILS_INVOICE where ID_ROOMS = :roomId AND (STATUS = 3 OR STATUS = 1)", nativeQuery = true)
    List<DetailsInvoice> getAllDetailInvoiceByRoomAndStatus(@Param("roomId") Integer roomId);

    @Query("select d from DetailsInvoice d where d.bills.id = :idBill")
    List<DetailsInvoice> getDetailInvoiceByIdBill(@Param("idBill") Integer idBill);

}
