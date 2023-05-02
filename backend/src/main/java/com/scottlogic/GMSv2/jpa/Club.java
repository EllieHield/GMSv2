package com.scottlogic.GMSv2.jpa;

import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Club {

  @Id
  @GeneratedValue
  private UUID id;
  private String name;
  private String adress;
  private String shortName;
  //@OneToMany(mappedBy = "club")
  //private List<Team> teams;

  public Club() {
  }

  public UUID getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getAdress() {
    return adress;
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

  public void setAdress(String adress) {
    this.adress = adress;
  }

  public void setShortName(String shortName) {
    this.shortName = shortName;
  }
}
