import { prisma } from "../db/db.js";
import { createNetworkData } from "../types/networkTypes";

export async function createNetwork(
  userId: number,
  network: createNetworkData
) {
  return await prisma.network.create({
    data: { ...network, userId },
  });
}
