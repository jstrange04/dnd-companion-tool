import NavBar from "../../components/navBar";
import {
  UserService,
  CharacterService,
  CampaignService,
  PartyService,
} from "../../services";

const Home = () => {
  debugger;

  const characters = CharacterService.getCharacters();
  const user = UserService.getUser(1);
  const campaigns = CampaignService.getCampaigns();
  const parties = PartyService.getParties();

  return (
    <div>
      <header>Home Page</header>
      <NavBar />
      <p>{}</p>
    </div>
  );
};

export default Home;
