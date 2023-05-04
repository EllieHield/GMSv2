package com.scottlogic.GMSv2.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Team {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "BINARY(16)")
  private UUID id;
  @Column
  private String name;
  private String address;
  private String shortName;
  @Column(name = "CLUBID")
  private UUID clubId;

  public Team() {
  }

  public UUID getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getAddress() {
    return address;
  }

  public String getShortName() {
    return shortName;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }
  public void setClubId(UUID clubId) {
    this.clubId = clubId;
  }

  public UUID getClubId() {
    return this.clubId;
  }
}
