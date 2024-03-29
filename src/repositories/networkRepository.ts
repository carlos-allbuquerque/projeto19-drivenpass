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
    where: { userId }
  });
}

export async function getNetwork(userId: number, networkId: number) {
  return prisma.network.findFirst({
    where: { userId, id: networkId }
  });
}

export async function removeNetwork(id: number) {
  return prisma.network.delete({
    where: { id }
  });
}
