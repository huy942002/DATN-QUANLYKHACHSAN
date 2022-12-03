package com.fpoly.dto;

import com.fpoly.entities.Customer;
import com.fpoly.entities.PaymentType;
import com.fpoly.entities.Personnel;
import com.fpoly.entities.RoomRefundConditions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BillsDTO {
    private int id;
    private int numberOfAdults;
    private int numberOfKids;
    private String hireDate;
    private String checkOutDay;
    private double deposits;
    private String dateOfPayment;
    private double totalCash;
    private double totalCard;
    private int status;
    private Customer customer;
    private PaymentType paymentType;
    private Personnel personnel;
    private RoomRefundConditions roomRefundConditions;
}
