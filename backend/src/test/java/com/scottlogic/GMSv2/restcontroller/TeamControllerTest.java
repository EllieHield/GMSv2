package com.scottlogic.GMSv2.restcontroller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottlogic.GMSv2.jpa.Club;
import com.scottlogic.GMSv2.jpa.Team;
import com.scottlogic.GMSv2.jpa.TeamRepository;
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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(TeamController.class)
public class TeamControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private TeamRepository teamRepository;

  private final UUID teamAId = UUID.randomUUID();
  private final UUID clubAId = UUID.randomUUID();

  @BeforeEach
  void init() {
    Club clubA = new Club();
    clubA.setId(clubAId);
    Club clubB = new Club();
    clubB.setId(UUID.randomUUID());
    Team teamA = new Team();
    teamA.setName("Team A");
    teamA.setId(teamAId);
    teamA.setClubId(clubA.getId());
    Team teamB = new Team();
    teamB.setName("Team B");
    teamB.setClubId(clubB.getId());
    List<Team> teams = Arrays.asList(teamA, teamB);
    when(teamRepository.findAll()).thenReturn(teams);
    when(teamRepository.findById(teamAId)).thenReturn(Optional.of(teamA));
  }

  @Test
  public void testGetAllTeams() throws Exception {
    mockMvc.perform(get("/teams"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Team A"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Team B"));
  }

  @Test
  public void testGetTeamsByClub() throws Exception {
    mockMvc.perform(get("/teams?clubId=" + clubAId))
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Team A"));
  }

  @Test
  public void testGetTeamById() throws Exception {
    mockMvc.perform(get("/teams/{id}", teamAId))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(teamAId.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Team A"));
  }

  @Test
  public void testAddTeam() throws Exception {
    Team newTeam = new Team();
    UUID teamCid = UUID.randomUUID();
    newTeam.setId(teamCid);
    newTeam.setName("Team C");
    when(teamRepository.existsById(teamCid)).thenReturn(true);

    mockMvc.perform(post("/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(newTeam)))
        .andExpect(status().isOk());

    assertTrue(teamRepository.existsById(newTeam.getId()));

  }

  @Test
  public void testDeleteTeam() throws Exception {
    mockMvc.perform(delete("/teams").param("id", teamAId.toString()))
        .andExpect(status().isOk());

    assertFalse(teamRepository.existsById(teamAId));
  }

  @Test
  public void testEditTeam() throws Exception {
    Team updatedTeam = new Team();
    updatedTeam.setId(teamAId);
    updatedTeam.setName("Updated Team Name");

    mockMvc.perform(patch("/teams")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(updatedTeam)))
        .andExpect(status().isOk());

    when(teamRepository.findById(teamAId)).thenReturn(Optional.of(updatedTeam));
    Optional<Team> teamFromDb = teamRepository.findById(teamAId);
    assertTrue(teamFromDb.isPresent());
    assertEquals(updatedTeam.getName(), teamFromDb.get().getName());
  }
}