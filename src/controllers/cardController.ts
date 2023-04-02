import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const { user } = res.locals;
  const card = req.body;

  await cardService.createCard(user, card);
  res.sendStatus(201); //created
}

export async function getAllUserCards(req: Request, res: Response) {
  const { user } = res.locals;

  const cards = await cardService.getAllUserCards(user.id);
  res.send(cards).status(200);
}