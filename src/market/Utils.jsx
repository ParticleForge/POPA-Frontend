import {ethers} from "ethers";
import {AIGEN_LAUNCHPAD_CONTRACT_ADDRESS} from "../config";
import AigenLaunchpadABI from "../contract_abis/aigen_launchpad.json";
import {provider} from "../contract_abis/web3_obj";
import axios from "axios";

export async function fetchMyProjects() {
    let contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, AigenLaunchpadABI, provider);
    let myProjects = await contract.fetchMyProjects();

    console.log("My projects:", myProjects)
}

export async function fetchProjectById(projectId) {
    let contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, AigenLaunchpadABI, provider);
    let myProject = await contract.getProject(projectId);

    console.log("My project:", myProject)

    return {
        detailUri: myProject.detailUri,
        ownerAddress: myProject.ownerAddress,
        price: myProject.price
    }
}

export async function getAINFTByProject(projectId) {
    let contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, AigenLaunchpadABI, provider);
    let projectAINFTs = await contract.getAINFTByProject(projectId);
    console.log("My project nfts:", projectAINFTs)
    return projectAINFTs;
}

/*
Fetch project details from NFT Storage
 */
export async function fetchProjectDetails(detailUri, func){
    axios.get(detailUri).then(res => {
        func(res.data)
    }).catch(err => console.log(err))
}



