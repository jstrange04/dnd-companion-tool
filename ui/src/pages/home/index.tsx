import { UserService } from "../../services";
import TokenUtils from "../../utils/token";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import NavigationRoutes from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import Plus from "../../plus.svg";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>([]);
  const [characters, setCharacters] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [parties, setParties] = useState<any>([]);

  const fetchData = async () => {
    const jwt = TokenUtils.getJWT();
    const user = await UserService.getUser(jwt.sub);

    localStorage.setItem("userDetails", JSON.stringify(user.data));
    
    const partiesRetrieved = user.data.characters.flatMap( (x: any) => x.parties).flat(1);
    const campaignsRetrieved = partiesRetrieved.flatMap( (x: any) => x.campaigns).flat(1);

    setUser(user.data);
    setCharacters(user.data.characters);

    setParties(partiesRetrieved);
    setCampaigns(campaignsRetrieved);

  };

  const handleCharacterNav = () => {
    navigate(NavigationRoutes.Characters);
  };

  const handleCreateCharacterNav = () => {
    navigate(NavigationRoutes.CreateCharacter);
  };

  const handleCampaignNav = () => {
    navigate(NavigationRoutes.Campaigns);
  };

  const handleCreateCampaignNav = () => {
    navigate(NavigationRoutes.CreateCampaign);
  };

  const handlePartyNav = () => {
    navigate(NavigationRoutes.Parties);
  };

  const handleCreatePartyNav = () => {
    navigate(NavigationRoutes.CreateParty);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          height: 25,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".2rem",
          marginLeft: 10,
          marginTop: 10,
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
      <Box
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: 10,
          fontFamily: "monospace",
        }}
      >
        <ul>
          {characters.map((character: any) => (
            <li key={character.id}>
              {character.name +
                " Level: " +
                character.level +
                " Race: " +
                character.race +
                " Class: " +
                character.class}
            </li>
          ))}
        </ul>
        <img
          height="30"
          width="30"
          src={Plus}
          alt="Add Character"
          onClick={handleCreateCharacterNav}
        />
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
          marginTop: 2,
        }}
      >
        <h1 onClick={handleCampaignNav}>Campaigns</h1>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: 10,
          fontFamily: "monospace",
        }}
      >
        <ul>
          {campaigns.map((campaign: any) => (
            <li key={campaign.id}>{campaign.name}</li>
          ))}
        </ul>
        <img
          height="30"
          width="30"
          src={Plus}
          alt="Add Campaign"
          onClick={handleCreateCampaignNav}
        />
      </Box>
      <Box
        sx={{
          height: 50,
          width: "100%",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          marginLeft: 10,
          marginTop: 2,
        }}
      >
        <h1 onClick={handlePartyNav}>Parties</h1>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: 10,
          fontFamily: "monospace",
        }}
      >
        <ul>
          {parties.map((party: any) => (
            <li key={party.id}>{party.name}</li>
          ))}
        </ul>
        <img
          height="30"
          width="30"
          src={Plus}
          alt="Add Party"
          onClick={handleCreatePartyNav}
        />
      </Box>
    </div>
  );
};

export default Home;
