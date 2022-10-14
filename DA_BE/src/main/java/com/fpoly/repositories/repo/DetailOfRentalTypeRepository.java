/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.DetailsOfRentalTypes;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface DetailOfRentalTypeRepository extends JpaRepository<DetailsOfRentalTypes, Integer>{

}
