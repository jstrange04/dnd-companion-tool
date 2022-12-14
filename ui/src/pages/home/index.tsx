import NavBar from "../../components/appBar";
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

  useEffect(() => {
    fetchData();
  }, []);

  // user.forEach((user: any) => {
  //   characterList.push(<h3 className='character_name'>{user}</h3>)
  // })

  console.log(parties)
  return (
    <div>
      <NavBar />
      <header>Home Page</header>
      <p>{`Welcome ` + user?.username}</p>
      <h2>Characters</h2>
      <ul>
        {characters.map((character: any) => (
          <li key={character.characters.id}>{character.characters.name}</li>
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
        {partiesList.map((party: any) => (
          <li key={party.parties.id}>{party.parties.party_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
