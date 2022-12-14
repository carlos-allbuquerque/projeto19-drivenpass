import { createCredential, getEspecificUserCredential, getUserCredentials, searchCredential } from "../repositories/credentialRepository.js";
import { CredentialData } from "../types/credentialType.js";
import error from "../types/errorType.js";
import { decryptAddedPassword, encryptAddedPassword } from "../utils/passwordUtils.js";

export async function create(credentialData: CredentialData) {
    const alreadyExistsInUser = await searchCredential(credentialData.title, credentialData.userId);
    if (alreadyExistsInUser) throw <error>{ code: "conflict", message:"User already has a credential with this title"};
    const encryptedPassword = encryptAddedPassword(credentialData.password);

    return await createCredential({...credentialData, password: encryptedPassword });
}

export async function getCredentials(userId: number) {
    const userCredentials = await getUserCredentials(userId);
    if (!userCredentials) {
       throw <error>{code: "notFound", message: "User does not have any credentials registered in the system"} 
    } 
    const newList = [];
    userCredentials.forEach(item => newList.push({...item, password: decryptAddedPassword(item.password)}))
    return newList;
}

export async function getCredential(credentialId: number, userId: number) {
    const credential = await getEspecificUserCredential(credentialId, userId);
    if (!credential) {
        throw <error>{code: "notFound", message: "the user does not own any credentials whith the informed id"}
    } 

    const decrypted = decryptAddedPassword(credential.password);
    return { ... credential, password: decrypted};
}