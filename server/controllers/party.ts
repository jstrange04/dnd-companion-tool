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

async function getUserParties(req: Request, res: Response) {
  const { party_id } = req.body;;
  const getParty = await partyService.getUserParties(party_id);
  if (getParty) {
    res.status(200).json(getParty);
  } else {
    res.sendStatus(404);
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

async function getCharactersParties(req: Request, res: Response) {
  const { character_id } = req.params;
  const parties = await partyService.getCharacterParties(parseInt(character_id));
  if (parties && parties.length > 0) {
    res.status(200).json(parties);
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
  getCharactersParties,
  getParty,
  createParty,
  updateParty,
  removeParty
}

export { partyController };
