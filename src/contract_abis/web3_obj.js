import Web3 from "web3";
import {
    AIGEN_LAUNCHPAD_CONTRACT_ADDRESS,
    AIGEN_MARKETPLACE_CONTRACT_ADDRESS,
    AIGENJS_SERVER_URL,
    AINFT_TOKEN_CONTRACT_ADDRESS,
    NFT_API_KEY,
    PRIVATE_KEY,
    PROVIDER_URL
} from "../config";

import {ethers} from "ethers";
import Launchpad_abi from "../contract_abis/aigen_launchpad.json";
import Marketplace_abi from "../contract_abis/aigen_marketplace.json";
import Ainft_abi from "../contract_abis/ainft_token.json";
import * as Name from 'w3name';
import axios from "axios";
import {keys} from "libp2p-crypto";

export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const signer = provider.getSigner();
export const web3 = new Web3(PROVIDER_URL);
export let launchpad_contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, Launchpad_abi, provider).connect(signer);
export let marketplace_contract = new ethers.Contract(AIGEN_MARKETPLACE_CONTRACT_ADDRESS, Marketplace_abi, provider).connect(signer)
export let ainft_contract = new ethers.Contract(AINFT_TOKEN_CONTRACT_ADDRESS, Ainft_abi, provider).connect(signer)
export const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

export async function getGasPrice() {
    return (await provider.getGasPrice()).toNumber()
}

export async function getNonce(signer) {
    return await provider.getTransactionCount(wallet.address)
}

export async function getRevision(key) {
    const name = Name.parse(key);
    return await Name.resolve(name);
}

export async function makeNextRevision(project, nextValue) {

    let latestRevision = await getRevision(project.detailUri)
    console.log(project, nextValue, latestRevision)
    const nextRevision = await Name.increment(latestRevision, nextValue);
    console.log(nextRevision)
    let key = await loadSigningKey(project.id, project.name)
    await Name.publish(nextRevision, key);
    return true
}

export async function uploadAIProjectMetadata(metaData) {
    const response = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NFT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(metaData)
    });

    const data = await response.json();
    let project_link = `https://${
        data.value.cid
    }.ipfs.nftstorage.link/`
    console.log(project_link)
    return project_link;
}

export async function fetchNFTMetadata(metadataURI) {
    const response = await axios.get(metadataURI);
    return response.data;
}

export async function saveSigningKey(w3name, projectId, projectName) {
    console.log(w3name)
    try {
        let name_keys = w3name.key;
        let keys = JSON.stringify(name_keys)

        console.log(name_keys, keys)

        await axios.post(AIGENJS_SERVER_URL + '/saveSigningKey', {
            keys,
            projectId,
            projectName
        });

        window.location = "/projects"
    } catch (error) {
        console.error(error);
    }
}

export async function loadSigningKey(projectId, projectName) {
    try {
        const response = await axios.post(AIGENJS_SERVER_URL + `/loadSigningKey`, {projectId, projectName});
        console.log(response.data)
        if (response.status === 200) {
            const response_keys = await response.data.keys;
            console.log(typeof (response_keys))
            response_keys._key = new Uint8Array(Object.values(response_keys._key))
            response_keys._publicKey = new Uint8Array(Object.values(response_keys._publicKey))

            console.log(response_keys)

            let encoded_keys = new keys.supportedKeys.ed25519.Ed25519PrivateKey(response_keys._key, response_keys._publicKey)
            console.log(encoded_keys)
            const name = await Name.from(encoded_keys.bytes);
            console.log(name)
            return name.key
        } else {
            console.error('Failed to fetch the key:', response.status);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}



