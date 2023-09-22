import * as Name from 'w3name';
import fetch from 'node-fetch';
import {NFT_API_KEY} from "../config";

/**
 * Upload image to NFT.Storage
 * @param imageBuffer
 * @returns {Promise<string>}
 */
export async function uploadImageToNFTStorage(imageBuffer) {
    const response = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NFT_API_KEY}`,
        },
        body: imageBuffer,
    });

    const data = await response.json();
    let upload_link = `https://${data.value.cid}.ipfs.nftstorage.link/`
    console.log("File link:", upload_link)
    return upload_link;
}

/**
 * upload json data to NFT.Storage
 * @param jsonData
 * @returns {Promise<string>}
 */
export async function uploadJSONToNFTStorage(jsonData) {
    const response = await fetch('https://api.nft.storage/upload', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${NFT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });

    const data = await response.json();
    let upload_link = `https://${data.value.cid}.ipfs.nftstorage.link/`
    console.log("File link:", upload_link)
    return upload_link;
}

/**
 * create a w3name url
 * @param url
 * @returns {Promise<string>}
 */
export async function createW3NameLink(url) {
    console.log("Url:", url)
    const w3name = await Name.create();
    const revision = await Name.v0(w3name, url);
    await Name.publish(revision, w3name.key);
    return w3name;
}