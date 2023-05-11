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
  private League league;
  private Gender gender;
  private AgeRange ageRange;
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

  public void setId(UUID id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setClubId(UUID clubId) {
    this.clubId = clubId;
  }

  public UUID getClubId() {
    return this.clubId;
  }

  public League getLeague() {
    return league;
  }

  public void setLeague(League league) {
    this.league = league;
  }

  public Gender getGender() {
    return gender;
  }

  public void setGender(Gender gender) {
    this.gender = gender;
  }

  public AgeRange getAgeRange() {
    return ageRange;
  }

  public void setAgeRange(AgeRange ageRange) {
    this.ageRange = ageRange;
  }
}
