package com.fpoly.restcontrollers;

import com.fpoly.dto.RoomDetailDTO;
import com.fpoly.dto.RoomPlanDTO;
import com.fpoly.entities.DetailsInvoice;
import com.fpoly.entities.FacilitiesDetails;
import com.fpoly.entities.Rooms;
import com.fpoly.entities.ServiceAvailable;
import com.fpoly.repositories.irepo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/room-rental-manage")
public class RoomRentalManageController {

    @Autowired IRoomService repoIRoomService;
    @Autowired IDetailInvoiceService repoIDetailInvoiceService;
    @Autowired IFacilityService repoIFacilityService;
    @Autowired IServiceAvailableService repoIServiceAvailableService;
    @Autowired IFacilityDetailService repoIFacilityDetailService;

    @Transactional
    @GetMapping("/get-room-plan")
    public ResponseEntity<?> getRoomPlan() {
        List<Rooms> rooms = (List<Rooms>) repoIRoomService.findAll();
//        List<RoomAndBillDto> roomAndBillArrayList = new ArrayList<>();
        List<RoomDetailDTO> roomDetailDTOList = new ArrayList<>();
        for (Rooms r : rooms) {
            RoomDetailDTO romDetailDTO = new RoomDetailDTO();
            romDetailDTO.setRooms(r);
            DetailsInvoice detailsInvoice = repoIDetailInvoiceService.findByRoomsAndStatus(r, 1);
            if (detailsInvoice != null) {
                romDetailDTO.setDetailsInvoice(detailsInvoice);
            } else {
                romDetailDTO.setDetailsInvoice(null);
            }
            List<FacilitiesDetails> facilitiesDetailsList = repoIFacilityDetailService.findByRoomsAndStatus(r, 1);
            if (facilitiesDetailsList != null) {
                romDetailDTO.setFacilitiesDetailsList(facilitiesDetailsList);
            } else {
                romDetailDTO.setFacilitiesDetailsList(null);
            }
            List<ServiceAvailable> serviceAvailableList = repoIServiceAvailableService.findByRoomsAndStatus(r, 1);
            if (serviceAvailableList != null) {
                romDetailDTO.setServiceAvailableList(serviceAvailableList);
            } else {
                romDetailDTO.setServiceAvailableList(null);
            }
            roomDetailDTOList.add(romDetailDTO);
//            DetailsInvoice detailsInvoice = repositoryIDetailInvoiceService.findByRoomsAndStatus(r, 0);
//            RoomAndBillDto roomAndBill = new RoomAndBillDto();
//            roomAndBill.setRooms(r);
//            if (detailsInvoice != null) {
//                roomAndBill.setDetailsInvoice(detailsInvoice);
//            } else {
//                roomAndBill.setDetailsInvoice(null);
//            }
//            roomAndBillArrayList.add(roomAndBill);
        }
        Map<Integer, List<RoomDetailDTO>> roomPlan = roomDetailDTOList.stream().collect(Collectors.groupingBy(r -> r.getRooms().getNumberOfFloors().getNumberOfFloors()));
        List<RoomPlanDTO> roomPlanDTOList = new ArrayList<>();
        for (Integer numberOfFloors : roomPlan.keySet()) {
            RoomPlanDTO r = new RoomPlanDTO();
            r.setNumberOfFloors(numberOfFloors);
            r.setListRoom(roomPlan.get(numberOfFloors));
            roomPlanDTOList.add(r);
        }
        return new ResponseEntity<>(roomPlanDTOList, HttpStatus.OK);
    }
}
