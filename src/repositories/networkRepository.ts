import { prisma } from "../db/db.js";
import { createNetworkData } from "../types/networkTypes";

export async function createNetwork(
  userId: number,
  network: createNetworkData
) {
  return await prisma.network.create({
    data: { ...network, userId }
  });
}

export async function getAll(userId: number) {
  return prisma.network.findMany({
    where: { userId },
  })
}