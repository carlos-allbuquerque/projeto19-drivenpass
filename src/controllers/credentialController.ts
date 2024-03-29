import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";

export async function createCredentials(req: Request, res: Response) {
  const credential = req.body;
  const { user } = res.locals; 

  await credentialService.create(credential, user);
  return res.sendStatus(201); // created
}

export async function getAllCredentials(req: Request, res: Response) {
  const { user } = res.locals;
  const credentials = await credentialService.getCredentials(user.id);

  return res.status(200).send(credentials);
}

export async function getCredential(req: Request, res: Response) {
  const { user } = res.locals;
  const credentialId = parseInt(req.params.id);
  if (isNaN(credentialId)) {
    res.sendStatus(422); // unprocessable entity
  }
  
  const credential = await credentialService.getCredential(
    credentialId,
    user.id
  );

  return res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  const credentialId = parseInt(req.params.id);
  if (isNaN(credentialId)) {
    res.sendStatus(422); // unprocessable entity
  }
  const { user } = res.locals;
  await credentialService.removeCredential(credentialId, user.id);

  return res.sendStatus(200);
}
