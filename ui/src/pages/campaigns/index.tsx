import NavBar from "../../components/appBar";
import { useEffect, useState } from "react";
import { CampaignService, PartyService } from "../../services";

const Campaigns = () => {
  const [parties, setParties] = useState<any>([]);
  const [campaigns, setCampaigns] = useState<any>([]);

  const fetchData = async () => {
    const [parties, campaigns] = await Promise.all([
      PartyService.getParties(),
      CampaignService.getCampaigns(),
    ]);

    setParties(parties.data);
    setCampaigns(campaigns.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <header>Campaigns</header>
      <ul>
        {campaigns.map((campaign: any) => (
          <li key={campaign.id}>{campaign.name}</li>
        ))}
      </ul>
      <ul>
        {parties.map((party: any) => (
          <li key={party.id}>{party.party_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;
