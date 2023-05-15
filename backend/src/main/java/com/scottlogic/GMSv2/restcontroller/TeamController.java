package com.scottlogic.GMSv2.restcontroller;

import com.scottlogic.GMSv2.jpa.Club;
import com.scottlogic.GMSv2.jpa.ClubRepository;
import com.scottlogic.GMSv2.jpa.Team;
import com.scottlogic.GMSv2.jpa.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "teams")
@CrossOrigin(origins = "http://localhost:4200")
public class TeamController {
  @Autowired
  private TeamRepository teamRepo;

  @Autowired
  private ClubRepository clubRepo;


  @GetMapping("/{id}")
  public ResponseEntity<Team> getTeamById(@PathVariable(value="id") UUID id) {
    Optional<Team> optionalTeam = teamRepo.findById(id);
    return optionalTeam
            .map(team -> new ResponseEntity<>(team, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  @GetMapping("/{id}/club")
  public ResponseEntity<Club> getClubByTeamId(@PathVariable(value="id") UUID teamId) {
    Optional<Team> optionalTeam = teamRepo.findById(teamId);

    if (optionalTeam.isPresent()) {
      Optional<Club> optionalClub = clubRepo.findById(optionalTeam.get().getClubId());

      if (optionalClub.isPresent()) {
        return new ResponseEntity<>(optionalClub.get(), HttpStatus.OK);
      }
    }

    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }


  @GetMapping()
  public ResponseEntity<List<Team>> getTeams() {
    return new ResponseEntity<>(teamRepo.findAll(), HttpStatus.OK);
  }

  @GetMapping(
          params = "clubId"
  )
  public ResponseEntity<List<Team>> getTeams(@RequestParam("clubId") UUID clubId) {
    return new ResponseEntity<>(teamRepo.findAll().stream()
            .filter(team -> team.getClubId().equals(clubId))
            .collect(Collectors.toList()), HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<Void> addTeam(@RequestBody Team team) {
    teamRepo.save(team);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping()
  public ResponseEntity<Void> deleteTeam(@RequestParam(name = "id") UUID teamId) {
    teamRepo.deleteById(teamId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PatchMapping()
  public ResponseEntity<Void> editTeam(@RequestBody Team team) {
    teamRepo.deleteById(team.getId());
    teamRepo.save(team);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
