package com.scottlogic.GMSv2.jpa;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface PlayerRepository extends CrudRepository<Player, UUID> {

    List<Player> findAll();
}
