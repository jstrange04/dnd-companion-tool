import NavBar from "../../components/navBar";
import { useEffect, useState } from "react";
import { PartyService } from "../../services";
import TokenUtils from "../../utils/token";

const Parties = () => {

  const [parties, setParties] = useState<any>({});

  const fetchData = async () => {
    const jwt = TokenUtils.getJWT();

    const [parties] = await Promise.all([PartyService.getParties()]);

    setParties(parties.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>Parties</header>
      <NavBar />
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Parties;
