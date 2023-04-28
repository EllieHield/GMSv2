package com.scottlogic.GMSv2.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class GreetingController {

  @GetMapping("/helloworld")
  public String helloWorld() {
    return "Hello world!";
  }

}
