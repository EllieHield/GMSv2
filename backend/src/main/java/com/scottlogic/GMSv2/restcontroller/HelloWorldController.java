package com.scottlogic.GMSv2.restcontroller;

import com.scottlogic.GMSv2.jpa.Club;
import com.scottlogic.GMSv2.jpa.ClubRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class GreetingController {

  @Autowired
  private ClubRepository clubRepo;

  @GetMapping("/helloworld")
  public String helloWorld() {
    return "Hello world! I know " + clubRepo.count() + " clubs.";
  }

}
