import NavBar from "../../components/navBar";
import {
  UserService,
  CharacterService,
  CampaignService,
  PartyService,
} from "../../services";
import TokenUtils from "../../utils/token";
import { useEffect, useState } from "react";

const Home = () => {
  //debugger;
  const [user, setUser] = useState<any>({});
  const [characters, setCharacters] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);
  const [parties, setParties] = useState<any>([]);

  const fetchData = async () => {
    const jwt = TokenUtils.getJWT();

    const [characters, user, campaigns, parties] = await Promise.all([
      CharacterService.getCharacters(),
      UserService.getUser(jwt.sub),
      CampaignService.getCampaigns(),
      PartyService.getParties(),
    ]);
    setUser(user.data);
    setCharacters(characters.data);
    setCampaigns(campaigns.data);
    setParties(parties.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>Home Page</header>
      <NavBar />
      <p>{user?.email}</p>
      <h2>Characters</h2>
      <ul>
        {characters.map((character: any) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <h2>Campaigns</h2>
      <ul>
        {campaigns.map((campaign: any) => (
          <li key={campaign.id}>{campaign.name}</li>
        ))}
      </ul>
      <h2>Parties</h2>
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
