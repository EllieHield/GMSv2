package com.scottlogic.GMSv2.jpa;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface TeamRepository extends CrudRepository<Team, UUID> {

  List<Team> findAll();
}
