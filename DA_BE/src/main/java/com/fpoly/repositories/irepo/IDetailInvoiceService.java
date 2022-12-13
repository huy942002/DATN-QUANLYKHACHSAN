/**
 * 
 */
package com.fpoly.repositories.irepo;

import com.fpoly.entities.Bills;
import com.fpoly.entities.Rooms;
import org.springframework.stereotype.Service;

import com.fpoly.entities.DetailsInvoice;

import java.util.List;


/**
 *
 * @author trucnv 
 *
 */
@Service
public interface IDetailInvoiceService extends IGeneralService<DetailsInvoice>{
    DetailsInvoice findByRoomsAndStatus(Rooms rooms, int status);
    List<DetailsInvoice> findByBillsAndStatus(Bills bills, int status);
    List<DetailsInvoice> getListDetailInvoiceByDate(Integer roomId, String date);
}
