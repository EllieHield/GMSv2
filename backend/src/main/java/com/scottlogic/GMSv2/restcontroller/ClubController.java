package com.scottlogic.GMSv2.restcontroller;

import com.scottlogic.GMSv2.jpa.Club;
import com.scottlogic.GMSv2.jpa.ClubRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "clubs")
@CrossOrigin(origins = "http://localhost:4200")
public class ClubController {

  @Autowired
  private ClubRepository clubRepo;

  @GetMapping()
  public ResponseEntity<List<Club>> getAllClubs() {
    return new ResponseEntity<>(clubRepo.findAll(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Club> getClubById(@PathVariable(value="id") UUID id) {
    Optional<Club> optionalClub = clubRepo.findById(id);
    if (optionalClub.isPresent()){
      return new ResponseEntity<>(optionalClub.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping()
  public ResponseEntity<Void> addClub(@RequestBody Club club) {
    clubRepo.save(club);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping()
  public ResponseEntity<Void> deleteClub(@RequestParam(name = "id") UUID clubId) {
    clubRepo.deleteById(clubId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PatchMapping()
  public ResponseEntity<Void> editClub(@RequestBody Club club) {
    clubRepo.deleteById(club.getId());
    clubRepo.save(club);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
