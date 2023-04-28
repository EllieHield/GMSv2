package com.scottlogic.GMSv2.jpa;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Club {

  @Id
  private Long id;
  private String name;

  public Club() {
  }
}
