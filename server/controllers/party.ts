import { Response, Request } from 'express';
import { partyService } from '../services';

async function getAllParties(req: Request, res: Response) {
  const parties = await partyService.getAllParties();
  if (parties && parties.length > 0) {
    res.status(200).json(parties);
  } else {
    res.sendStatus(204);
  }
}

async function getParty(req: Request, res: Response) {
  const { party_id } = req.params;
  const getParty = await partyService.getParty(parseInt(party_id));
  if (getParty) {
    res.status(200).json(getParty);
  } else {
    res.sendStatus(404);
  }
}

async function createParty(req: Request, res: Response) {
  const { party_name, party_level } = req.body;
  await partyService.createParty(
    party_name,
    party_level
  );
  res.sendStatus(201);
}

async function addToParty(req: Request, res: Response) {
  const { party_id, character_id } = req.body;
  await partyService.addToParty(
    party_id,
    character_id
  );
  res.sendStatus(201);
}

async function updateParty(req: Request, res: Response) {
  const { party_id } = req.params;
  const { party_name, party_level} = req.body;
  await partyService.updateParty(
    parseInt(party_id),
    party_name, 
    party_level,
  );
  res.sendStatus(204);
}

async function removeParty(req: Request, res: Response) {
  const { id } = req.params;
  await partyService.deleteParty(parseInt(id));
  res.sendStatus(204);
}

const partyController = {
  getAllParties,
  getParty,
  createParty,
  addToParty,
  updateParty,
  removeParty
}

export { partyController };
