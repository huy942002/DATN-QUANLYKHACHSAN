/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.ServiceDetails;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface ServiceDetailRepository extends JpaRepository<ServiceDetails, Integer>{

}
