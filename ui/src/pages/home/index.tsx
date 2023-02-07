import { UserService } from "../../services";
import TokenUtils from "../../utils/token";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import NavigationRoutes from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import Plus from "../../plus.svg";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";

/// WIP : Only show first x number of characters, parties, campaigns
/// WIP : Open Character full details on click
/// WIP : Open full party list on click

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

    const partiesRetrieved = user.data.characters
      .flatMap((x: any) => x.parties)
      .flat(1);
    const campaignsRetrieved = partiesRetrieved
      .flatMap((x: any) => x.campaigns)
      .flat(1);

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
          marginTop: 10,
        }}
      >
        <p>{`Welcome ` + user?.username}</p>
      </Box>
      <Paper
        sx={{
          height: "auto",
          width: "100%",
          marginTop: 1,
          fontFamily: "monospace",
        }}
      >
        <Box
          sx={{
            height: 50,
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
          }}
        >
          <h1 onClick={handleCharacterNav}>Characters</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {characters.map((character: any) => (
            <Card
              onClick={handleCharacterNav}
              sx={{
                height: 200,
                fontFamily: "monospace",
                width: 200,
                fontWeight: 500,
                fontSize: 14,
                margin: 1,
                padding: 1,
              }}
            >
              <p>Name: {character.name}</p>
              <p>Level: {character.level}</p>
              <p>Race: {character.race}</p>
              <p>Class: {character.class}</p>
            </Card>
          ))}
          <img
            height="30"
            width="30"
            src={Plus}
            alt="Add Character"
            onClick={handleCreateCharacterNav}
          />
        </Box>
      </Paper>
      <Paper
        sx={{
          height: "auto",
          width: "100%",
          marginTop: 1,
          fontFamily: "monospace",
        }}
      >
        <Box
          sx={{
            height: 50,
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
          }}
        >
          <h1 onClick={handleCampaignNav}>Campaigns</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {campaigns.map((campaign: any) => (
            <Card
              onClick={handleCampaignNav}
              sx={{
                height: 200,
                fontFamily: "monospace",
                width: 200,
                fontWeight: 500,
                fontSize: 14,
                margin: 1,
                padding: 1,
              }}
            >
              <p>Name: {campaign.name}</p>
              <p>Synposis: {campaign.description}</p>
            </Card>
          ))}
          <img
            height="30"
            width="30"
            src={Plus}
            alt="Add Campaign"
            onClick={handleCreateCampaignNav}
          />
        </Box>
      </Paper>
      <Paper
        sx={{
          height: "auto",
          width: "100%",
          marginTop: 1,
          fontFamily: "monospace",
        }}
      >
        <Box
          sx={{
            height: 50,
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
          }}
        >
          <h1 onClick={handlePartyNav}>Parties</h1>
        </Box>
        <Box
          sx={{
            width: "100%",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            marginLeft: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {parties.map((party: any) => (
            <Card
              onClick={handlePartyNav}
              sx={{
                height: 200,
                fontFamily: "monospace",
                width: 200,
                fontWeight: 500,
                fontSize: 14,
                margin: 1,
                padding: 1,
              }}
            >
              <p>Name: {party.name}</p>
              <p>Level: {party.level}</p>
            </Card>
          ))}
          <img
            height="30"
            width="30"
            src={Plus}
            alt="Add Party"
            onClick={handleCreatePartyNav}
          />
        </Box>
      </Paper>
    </div>
  );
};

export default Home;
