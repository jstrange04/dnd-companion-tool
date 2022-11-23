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
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
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
    date_modified TIMESTAMP
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
    id SERIAL CONSTRAINT user_characters_pk PRIMARY KEY,
    user_id INT CONSTRAINT user_characters_user_id_fk REFERENCES users ON DELETE CASCADE NOT NULL,
    character_id INT CONSTRAINT user_characters_character_id_fk REFERENCES characters ON DELETE CASCADE NOT NULL 
);

CREATE TABLE IF NOT EXISTS party_characters (
    id SERIAL PRIMARY KEY,
    party_id INT CONSTRAINT party_characters_parties_party_id_fk REFERENCES parties ON DELETE CASCADE NOT NULL,
    character_id INT CONSTRAINT party_characters_characters_character_id_fk REFERENCES characters ON DELETE CASCADE NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign_parties (
    id SERIAL PRIMARY KEY,
    campaign_id INT CONSTRAINT campaign_parties_campaigns_campaign_id_fk REFERENCES campaigns ON DELETE CASCADE NOT NULL,
    party_id INT CONSTRAINT campaign_parties_parties_party_id_fk REFERENCES parties ON DELETE CASCADE NOT NULL
);

CREATE TABLE IF NOT EXISTS game_monsters (
    id SERIAL PRIMARY KEY,
    game_id INT CONSTRAINT game_monsters_games_game_id_fk REFERENCES games NOT NULL,
    monster_id INT CONSTRAINT game_monsters_monsters_monster_id_fk REFERENCES monsters NOT NULL
);