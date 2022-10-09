/**
 * 
 */
package com.fpoly.repositories.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpoly.entities.Rooms;

/**
 *
 * @author trucnv 
 *
 */
@Repository
public interface RoomRepository extends JpaRepository<Rooms, Integer>{

}
