/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Personnel;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Integer>{

}
