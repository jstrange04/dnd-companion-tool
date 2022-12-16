import {
  UserService,
  CharacterService,
  CampaignService,
  PartyService,
} from "../../services";
import TokenUtils from "../../utils/token";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NavigationRoutes from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import DrawerNavBar from "../../components/drawer";

const Home = () => {
  //debugger;
  const navigate = useNavigate();
  const [user, setUser] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [parties, setParties] = useState<any>([]);
  const partiesList: any[] = [];

  const fetchData = async () => {
    const jwt = TokenUtils.getJWT();

    const [characters, user, campaigns, parties] = await Promise.all([
      CharacterService.getCharacters(),
      UserService.getUser(jwt.sub),
      CampaignService.getCampaigns(),
      PartyService.getParties(),
    ]);

    setUser(user.data);
    //setCharacters(characters.data);
    setCharacters(user.data.user_characters);
    //setCampaigns(user.data.user_characters.campaigns);
    //setParties(characters.data.party_characters.parties);

     user.data.user_characters.map((character: any) => {
       return partiesList.push(character.party_characters.parties.party_name)
    });

    setParties(partiesList);
  };

  const handleCharacterNav = () => {
    navigate(NavigationRoutes.Characters);
  }

  const handleCampaignNav = () => {
    navigate(NavigationRoutes.Campaigns);
  }

  const handlePartyNav = () => {
    navigate(NavigationRoutes.Parties);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // user.forEach((user: any) => {
  //   characterList.push(<h3 className='character_name'>{user}</h3>)
  // })

  console.log(parties)
  return (
    <div>
      <DrawerNavBar />
      <Box
        sx={{
          height: 25,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".2rem",
          marginLeft: 10,
        }}
      >
        <p>{`Welcome ` + user?.username}</p>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
        }}
      >
        <h1 onClick={handleCharacterNav}>Characters</h1>
      </Box>
      <Box sx={{ height: "auto", width: "90%", marginLeft: 10, fontFamily: "monospace", }}>
      <ul>
        {characters.map((character: any) => (
          <li key={character.characters.id}>{character.characters.name + " Level: " + character.characters.level + " Race: " + character.characters.race + " Class: " + character.characters.char_class}</li>
        ))}
      </ul>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
          marginTop: 5
        }}
      >
        <h1 onClick={handleCampaignNav}>Campaigns</h1>
      </Box>
      <Box sx={{ height: "auto", width: "90%", marginLeft: 10, fontFamily: "monospace", }}>
      <ul>
        {campaigns.map((campaign: any) => (
          <li key={campaign.id}>{campaign.name}</li>
        ))}
      </ul>
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
          marginTop: 5
        }}
      >
        <h1 onClick={handlePartyNav}>Parties</h1>
      </Box>
      <Box sx={{ height: "auto", width: "90%", marginLeft: 10, fontFamily: "monospace", }}>
      <ul>
        {partiesList.map((party: any) => (
          <li key={party.parties.id}>{party.parties.party_name}</li>
        ))}
      </ul>
      </Box>
    </div>
  );
};

export default Home;
