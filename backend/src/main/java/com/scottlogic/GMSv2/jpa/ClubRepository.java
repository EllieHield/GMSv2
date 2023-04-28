package com.scottlogic.GMSv2.jpa;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ClubRepository extends CrudRepository<Club, Long> {

  Iterable<Club> findAll();
}
