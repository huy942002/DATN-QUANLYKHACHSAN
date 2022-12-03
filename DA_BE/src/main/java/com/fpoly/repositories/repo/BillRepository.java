/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Bills;

import java.util.List;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface BillRepository extends JpaRepository<Bills, Integer>{
    List<Bills> findByStatus (Integer status);
}
