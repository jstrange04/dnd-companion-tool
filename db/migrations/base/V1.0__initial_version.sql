CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parties (
    id SERIAL PRIMARY KEY,
    party_name VARCHAR(250) NOT NULL,
    party_level INT,
    date_created TIMESTAMP NOT NULL DEFAULT NOW()
    date_modified TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    image VARCHAR,
    name VARCHAR(100) NOT NULL,
    race VARCHAR(50) NOT NULL,
    char_class VARCHAR(50) NOT NULL,
    sub_class VARCHAR(100),
    level INT NOT NULL,
    strength INT NOT NULL,
    dexterity INT NOT NULL,
    constitution INT NOT NULL,
    intelligence INT NOT NULL,
    wisdom INT NOT NULL,
    charisma INT NOT NULL,
    hit_points INT NOT NULL,
    armour_class INT NOT NULL,
    movement_speed INT NOT NULL,
    date_modified TIMESTAMP
);


CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    image VARCHAR,
    name VARCHAR(250) NOT NULL, 
    description VARCHAR(500),
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    date_modified TIMESTAMP,
);

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS monsters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, 
    description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS user_characters (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES users(id),
    FOREIGN KEY (id) REFERENCES characters(id)
);

CREATE TABLE IF NOT EXISTS party_characters (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES parties(id),
    FOREIGN KEY (id) REFERENCES characters(id)
);

CREATE TABLE IF NOT EXISTS campaign_parties (
    id INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES campaigns(id),
    FOREIGN KEY (id) REFERENCES parties(id)
);

CREATE TABLE IF NOT EXISTS game_monsters (
    id INT NOT NULL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES games(id),
    FOREIGN KEY (id) REFERENCES monsters(id)
);