package com.scottlogic.GMSv2.jpa;

import com.scottlogic.GMSv2.jpa.enums.AgeRange;
import com.scottlogic.GMSv2.jpa.enums.Gender;
import com.scottlogic.GMSv2.jpa.enums.League;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;
import org.springframework.lang.Nullable;

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

  public String getLeague() {
    if (league != null) {
      return league.getName();
    }
    return "";
  }

  public void setLeague(String league) {
    this.league = league == null || league.isEmpty() ? null : League.valueOf(league);
  }

  public String getGender() {
    if (gender != null) {
      return gender.getName();
    }
    return "";
  }

  public void setGender(String gender) {
    this.gender = gender == null || gender.isEmpty() ? null : Gender.valueOf(gender);
  }

  public String getAgeRange() {
    if (ageRange != null) {
      return ageRange.getName();
    }
    return "";
  }

  public void setAgeRange(String ageRange) {
    this.ageRange = ageRange == null || ageRange.isEmpty() ? null :  AgeRange.valueOf(ageRange);
  }
}
