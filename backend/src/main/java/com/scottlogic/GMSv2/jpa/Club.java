package com.scottlogic.GMSv2.jpa;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Club {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "BINARY(16)")
  private UUID id;
  private String name;
  private String address;
  @Column(name = "SHORTNAME")
  private String shortName;

  public Club() {
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
}
