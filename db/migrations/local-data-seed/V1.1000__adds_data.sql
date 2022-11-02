INSERT INTO users (username, email, password, date_created) VALUES ('Gary Gygax', 'garygygax@aol.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','01/01/2022 22:00:00');
INSERT INTO users (username, email, password, date_created) VALUES ('Dave Walters', 'bdwalters@hotmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','02/03/2022 14:00:00');
INSERT INTO users (username, email, password, date_created) VALUES ('Brennan Mulligan', 'brennanlmulligan@gmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','04/04/2022 13:00:00');
INSERT INTO users (username, email, password, date_created) VALUES ('Matt Mercer', 'mattmercer@hotmail.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha','05/06/2022 21:00:00');
INSERT INTO users (username, email, password, date_created) VALUES ('Jason Carl', 'jcarl@msn.com', '$2b$10$y8loC0AJ9oTph74GYyfyHOmhKLQewnsEok1DShP72DoGrkOF5ASha', '07/08/2022 09:30:00');

INSERT INTO parties (party_name, party_level, date_created, date_modified) VALUES ('The Savage Six', 5, '07/08/2022 09:30:00', '');
INSERT INTO parties (party_name, party_level, date_created, date_modified) VALUES ('The Smiling Company', 3, '07/08/2022 09:30:00');
INSERT INTO parties (party_name, party_level, date_created, date_modified) VALUES ('The New Guys', 1, '02/07/2022 13:43:00');
INSERT INTO parties (party_name, party_level, date_created, date_modified) VALUES ('The Companions', 15, '02/07/2022 13:43:00');

INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed, date_modified) 
VALUES ('Drizzt DoUrden', 'Drow', 'Fighter', 'Battle Master', 15, 15,20,14,16,18,16, 145, 18, 40, '');
INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed, date_modified) 
VALUES ('Percy De Rolo', 'Human', 'Artificer', 'Gunsmith', 5, 12,14,12,18,16,12, 35, 16, 30, '');
INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed, date_modified) 
VALUES ('Helmut Longsteen', 'Half-Orc', 'Druid', 'Circle of the Moon', 3, 16,12,17,11,16,9, 22, 18, 35, '');
INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed, date_modified) 
VALUES ('Elrick Stormhand', 'Elf', 'Wizard', 'School of Evocation', 15, 9,11,14,20,16,13, 103, 14, 25, '');
INSERT INTO characters (name, race, char_class, sub_class, level, strength, dexterity, constitution, intelligence, wisdom, charisma, hit_points, armour_class, movement_speed, date_modified) 
VALUES ('Rookie', 'Kenku', 'Rogue', '', 1, 10,10,10,10,10,10, 8, 12, 30, '');

INSERT INTO campaigns (name, description, date_created, date_modified) VALUES ('Storm Kings Thunder', 'Battle the Giants', '02/07/2022 13:43:00');
INSERT INTO campaigns (name, date_created, date_modified) VALUES ('Menzoberranzan', '02/07/2022 13:43:00');

INSERT INTO user_characters (id) VALUES ((select min(id) from users));
INSERT INTO user_characters (id) VALUES ((select max(id) from users));

