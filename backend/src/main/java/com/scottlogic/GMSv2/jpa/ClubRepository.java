package com.scottlogic.GMSv2.jpa;

import java.util.List;
import java.util.UUID;
import org.springframework.data.repository.CrudRepository;

public interface ClubRepository extends CrudRepository<Club, UUID> {

  List<Club> findAll();
}
