/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Customer;

/**
 *
 * @author trucnv
 *
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
}
