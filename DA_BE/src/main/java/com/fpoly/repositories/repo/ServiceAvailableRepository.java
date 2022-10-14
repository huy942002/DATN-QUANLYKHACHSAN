/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.ServiceAvailable;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface ServiceAvailableRepository extends JpaRepository<ServiceAvailable, Integer>{

}
