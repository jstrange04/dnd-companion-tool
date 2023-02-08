INSERT INTO users (username, email, password, date_created) VALUES 
('Gary Gygax', 'garygygax@aol.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','01/01/2022 22:00:00'), 
('Dave Walters', 'bdwalters@hotmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','02/03/2022 14:00:00'), 
('Brennan Mulligan', 'brennanlmulligan@gmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','04/04/2022 13:00:00'), 
('Matt Mercer', 'mattmercer@hotmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','05/06/2022 21:00:00'), 
('Jason Carl', 'jcarl@msn.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha', '07/08/2022 09:30:00');

INSERT INTO parties (party_name, party_level, date_created) VALUES ('The Savage Six', 5, '07/08/2022 09:30:00'),
('The Smiling Company', 3, '07/08/2022 09:30:00'),
('The New Guys', 1, '02/07/2022 13:43:00'),
('The Companions', 15, '02/07/2022 13:43:00');

INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed ) VALUES 
('Drizzt DoUrden', 'Drow', 'Fighter', 'Battle Master', 15, 15,20,14,16,18,16, 145, 18, 40),
('Percy De Rolo', 'Human', 'Artificer', 'Gunsmith', 5, 12,14,12,18,16,12, 35, 16, 30),
('Helmut Longsteen', 'Half-Orc', 'Druid', 'Circle of the Moon', 3, 16,12,17,11,16,9, 22, 18, 35),
('Elrick Stormhand', 'Elf', 'Wizard', 'School of Evocation', 15, 9,11,14,20,16,13, 103, 14, 25),
('Rookie', 'Kenku', 'Rogue', null, 1, 10,10,10,10,10,10, 8, 12, 30);

INSERT INTO campaigns (name, description, date_created ) VALUES 
('Storm Kings Thunder', 'Battle the Giants', '02/07/2022 13:43:00'),
('Menzoberranzan', null, '02/07/2022 13:43:00');,
('Tyranny of Dragons', 'Stop the Queen of Dragons', '01/01/2023 12:01:00');,
('Rage of Demons', null, '02/07/2022 13:43:00');,
('Curse of Strahd', 'He is land. He is the lore', '02/07/2022 13:43:00');

INSERT INTO user_characters (user_id, character_id) VALUES
((select min(id) from users), (select min(id) from characters)),
((select max(id) from users), (select max(id) from characters)),
(5, 4),
(4, 2);

INSERT INTO party_characters (party_id, character_id) VALUES
((select min(id) from parties), (select min(id) from characters)),
((select max(id) from parties), (select max(id) from characters)),
(3, 2),
(3, 4);

INSERT INTO campaign_parties (campaign_id, party_id) VALUES
((select min(id) from campaigns), (select min(id) from parties)),
((select max(id) from campaigns), (select max(id) from parties));

