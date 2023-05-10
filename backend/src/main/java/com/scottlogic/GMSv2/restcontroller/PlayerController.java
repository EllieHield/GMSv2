package com.scottlogic.GMSv2.restcontroller;

import com.scottlogic.GMSv2.jpa.Player;
import com.scottlogic.GMSv2.jpa.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "players")
@CrossOrigin(origins = "http://localhost:4200")
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepo;

    @GetMapping()
    public ResponseEntity<List<Player>> getAllPlayers() {
        return new ResponseEntity<>(playerRepo.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable(value = "id") UUID id) {
        Optional<Player> optionalPlayer = playerRepo.findById(id);
        if (optionalPlayer.isPresent()) {
            return new ResponseEntity<>(optionalPlayer.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Void> addPlayer(@RequestBody Player player) {
        playerRepo.save(player);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<Void> deletePlayer(@RequestParam(value = "id") UUID playerId) {
        playerRepo.deleteById(playerId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping()
    public ResponseEntity<Void> editPlayer(@RequestBody Player player) {
        playerRepo.deleteById(player.getId());
        playerRepo.save(player);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
