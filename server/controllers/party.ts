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
  const { name, party_level } = req.body;
  console.log(name);
  await partyService.createParty(
    name,
    party_level
  );
  res.sendStatus(201);
}

async function updateParty(req: Request, res: Response) {
  const { party_id } = req.params;
  const { name, party_level} = req.body;
  const updatedParty = await partyService.updateParty(
    parseInt(party_id),
    name, 
    party_level,
    //date_modified = new Date().getUTCDate(),
  );
  res.status(200).json(updatedParty);
}

async function removeParty(req: Request, res: Response) {
  const { id } = req.params;
  const removeParty = await partyService.deleteParty(parseInt(id));
  res.status(200).json(removeParty);
}

export {
    getAllParties,
    getParty,
    createParty,
    updateParty,
    removeParty
};
