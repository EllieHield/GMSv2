package com.scottlogic.GMSv2.restcontroller;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scottlogic.GMSv2.jpa.Club;
import com.scottlogic.GMSv2.jpa.ClubRepository;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
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

@RunWith(SpringRunner.class)
@WebMvcTest(ClubController.class)
public class ClubControllerTest {

  private MockMvc mockMvc;

  @Autowired
  private WebApplicationContext webApplicationContext;

  @MockBean
  private ClubRepository clubRepository;

  private final UUID clubAId = UUID.randomUUID();

  @BeforeEach
  void init() {
    Club clubA = new Club();
    clubA.setName("Club A");
    clubA.setId(clubAId);
    Club clubB = new Club();
    clubB.setName("Club B");
    List<Club> clubs = Arrays.asList(clubA, clubB);
    when(clubRepository.findAll()).thenReturn(clubs);
    when(clubRepository.findById(clubAId)).thenReturn(Optional.of(clubA));
    mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
  }

  @Test
  public void testGetAllClubs() throws Exception {
    mockMvc.perform(get("/clubs"))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
        .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Club A"))
        .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Club B"));
  }

  @Test
  public void testGetClubById() throws Exception {
    mockMvc.perform(get("/clubs/{id}", clubAId))
        .andExpect(status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(clubAId.toString()))
        .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Club A"));
  }

  @Test
  public void testAddClub() throws Exception {
    Club newClub = new Club();
    UUID clubCid = UUID.randomUUID();
    newClub.setId(clubCid);
    newClub.setName("Club C");
    when(clubRepository.existsById(clubCid)).thenReturn(true);

    mockMvc.perform(post("/clubs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(newClub)))
        .andExpect(status().isOk());

    assertTrue(clubRepository.existsById(newClub.getId()));

  }

  @Test
  public void testDeleteClub() throws Exception {
    mockMvc.perform(delete("/clubs").param("id", clubAId.toString()))
        .andExpect(status().isOk());

    assertFalse(clubRepository.existsById(clubAId));
  }

  @Test
  public void testEditClub() throws Exception {
    Club updatedClub = new Club();
    updatedClub.setId(clubAId);
    updatedClub.setName("Updated Club Name");

    mockMvc.perform(patch("/clubs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(updatedClub)))
        .andExpect(status().isOk());

    when(clubRepository.findById(clubAId)).thenReturn(Optional.of(updatedClub));
    Optional<Club> clubFromDb = clubRepository.findById(clubAId);
    assertTrue(clubFromDb.isPresent());
    assertEquals(updatedClub.getName(), clubFromDb.get().getName());
  }
}