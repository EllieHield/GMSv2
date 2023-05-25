-- CLUBS
INSERT INTO club (id, name, address, shortName) VALUES (1, 'Firebrands', 'Longwood, Clevedon Road, Failand, Bristol BS8 3TL', 'FHC');
INSERT INTO club (id, name, address, shortName) VALUES (2, 'Bristol City', 'Ashton Rd, Bristol BS3 2EJ', 'BCFC');
INSERT INTO club (id, name, address, shortName) VALUES (3, 'Liverpool Football Club', 'Ashton Rd, Bristol BS3 2EJ', 'LFC');
INSERT INTO club (id, name, address, shortName) VALUES (4, 'Beeston Hockey Club', 'Highfields Park, University Blvd, Nottingham NG7 2PS', 'BHC');

-- TEAMS
INSERT INTO team (id, name, league, gender, age_range, clubId) VALUES (1, 'First Team', 0, 0, 1, 1);
INSERT INTO team (id, name, league, gender, age_range, clubId) VALUES (2, 'Second Team', 1, 0, 1, 1);
INSERT INTO team (id, name, league, gender, age_range, clubId) VALUES (3, 'First Team', 0, 1, 1, 2);
INSERT INTO team (id, name, league, gender, age_range, clubId) VALUES (4, 'First Team', 0, 0, 1, 3);
INSERT INTO team (id, name, league, gender, age_range, clubId) VALUES (5, 'First Team', 0, 0, 1, 4);

-- PLAYERS
INSERT INTO player (id, name, address, email, teamId) VALUES (1, 'Ellie Hield', 'Awesome Road 1', 'ehield@scottlogic.com', 1);
INSERT INTO player (id, name, address, email, teamId) VALUES (2, 'Matt Smith', 'Eurovision Road 22', 'msmith@scottlogic.com', 1);
INSERT INTO player (id, name, address, email, teamId) VALUES (3, 'Daniel Lucas', 'Royal Oak Road 54', 'dalucas@scottlogic.com', 1);
INSERT INTO player (id, name, address, email, teamId) VALUES (4, 'Matt Cline', 'Kings Cross 99', 'mcline@scottlogic.com', 2);
INSERT INTO player (id, name, address, email, teamId) VALUES (5, 'Sarah Haswell', 'Castle Park 420', 'shaswell@scottlogic.com', 2);
INSERT INTO player (id, name, address, email, teamId) VALUES (6, 'Norman the Badger', 'River Avon 7', 'nbadger@scottlogic.com', 2);
INSERT INTO player (id, name, address, email, teamId) VALUES (7, 'John Doe', 'Maple Street 123', 'jdoe@example.com', 3);
INSERT INTO player (id, name, address, email, teamId) VALUES (8, 'Alice Johnson', 'Oak Avenue 456', 'ajohnson@example.com', 3);
INSERT INTO player (id, name, address, email, teamId) VALUES (9, 'Robert Williams', 'Pine Lane 789', 'rwilliams@example.com', 3);
INSERT INTO player (id, name, address, email, teamId) VALUES (10, 'Emily Brown', 'Cedar Road 987', 'ebrown@example.com', 4);
INSERT INTO player (id, name, address, email, teamId) VALUES (11, 'James Taylor', 'Willow Way 654', 'jtaylor@example.com', 4);
INSERT INTO player (id, name, address, email, teamId) VALUES (12, 'Olivia Davis', 'Birch Street 321', 'odavis@example.com', 4);
INSERT INTO player (id, name, address, email, teamId) VALUES (13, 'Liam Martinez', 'Elm Court 555', 'lmartinez@example.com', 5);
INSERT INTO player (id, name, address, email, teamId) VALUES (14, 'Sophia Anderson', 'Poplar Drive 777', 'sanderson@example.com', 5);
INSERT INTO player (id, name, address, email, teamId) VALUES (15, 'Benjamin Wilson', 'Sycamore Lane 222', 'bwilson@example.com', 5);
