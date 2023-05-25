package com.scottlogic.GMSv2.restcontroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottlogic.GMSv2.jpa.Player;
import com.scottlogic.GMSv2.jpa.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(PlayerController.class)
public class PlayerControllerTest {

  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext webApplicationContext;

  @MockBean
  private PlayerRepository playerRepository;

  private final UUID playerId = UUID.randomUUID();

  @BeforeEach
  void init() {
    Player playerA = new Player();
    playerA.setId(playerId);
    playerA.setName("Player A");
    Player playerB = new Player();
    playerB.setId(UUID.randomUUID());
    playerB.setName("Player B");
    List<Player> players = Arrays.asList(playerA, playerB);
    when(playerRepository.findAll()).thenReturn(players);
    when(playerRepository.findById(playerId)).thenReturn(Optional.of(playerA));
    mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
  }

  @Test
  public void testGetAllPlayers() throws Exception {
    mockMvc.perform(get("/players"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Player A"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Player B"));
  }

  @Test
  public void testGetAllPlayersByTeamId() throws Exception {
    UUID teamId = UUID.randomUUID();
    Player playerA = new Player();
    playerA.setId(playerId);
    playerA.setName("Player A");
    playerA.setTeamId(teamId);
    Player playerB = new Player();
    playerB.setId(UUID.randomUUID());
    playerB.setName("Player B");
    playerB.setTeamId(UUID.randomUUID());
    List<Player> players = Arrays.asList(playerA, playerB);
    when(playerRepository.findAll()).thenReturn(players);

    mockMvc.perform(get("/players/team/{teamId}", teamId.toString()))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Player A"));
  }

  @Test
  public void testGetPlayerById() throws Exception {
    mockMvc.perform(get("/players/{id}", playerId))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(playerId.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Player A"));
  }

  @Test
  public void testAddPlayer() throws Exception {
    Player newPlayer = new Player();
    UUID newPlayerId = UUID.randomUUID();
    newPlayer.setId(newPlayerId);
    newPlayer.setName("New Player");

    mockMvc.perform(post("/players")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(newPlayer)))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeletePlayer() throws Exception {
    mockMvc.perform(delete("/players").param("id", playerId.toString()))
        .andExpect(status().isOk());
  }

  @Test
  public void testEditPlayer() throws Exception {
    Player updatedPlayer = new Player();
    updatedPlayer.setId(playerId);
    updatedPlayer.setName("Updated Player Name");

    mockMvc.perform(patch("/players")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(updatedPlayer)))
        .andExpect(status().isOk());
  }
}