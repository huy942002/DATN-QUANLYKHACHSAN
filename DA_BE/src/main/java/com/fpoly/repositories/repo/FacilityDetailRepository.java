/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.FacilitiesDetails;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface FacilityDetailRepository extends JpaRepository<FacilitiesDetails, Integer>{

}
