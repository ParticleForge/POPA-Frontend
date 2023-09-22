import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import {ethers} from "ethers";
import {AIGEN_LAUNCHPAD_CONTRACT_ADDRESS} from "../../config";
import AigenLaunchpadABI from "../../contract_abis/aigen_launchpad.json"
import {provider} from "../../contract_abis/web3_obj";

export default function Home(){
    useEffect(()=>{
        getAIProjects().then(()=>{
        })

        createAIProject().then(()=>{

        })
    })
    async function getAIProjects() {
        const contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, AigenLaunchpadABI, provider.getSigner());
        let tx = await contract.getMyProjects()
        console.log(tx)
    }

    async function createAIProject() {
        const contract = new ethers.Contract(AIGEN_LAUNCHPAD_CONTRACT_ADDRESS, AigenLaunchpadABI, provider.getSigner());
        const contractSigner = contract.connect(provider.getSigner());
        let tx = contractSigner.createProject("https://www.google.com", {value: ethers.utils.parseEther("0.0000001")})
        console.log(tx)
    }

    return (
        <div className=" bg-marketplace-background-color ">
            <Navbar dontShowConnectButton={true}/>
            <section className=" container-xl sm:bg-cover lg:bg-contain ">
                <section className="max-w-7xl mx-auto p-4 sm:p-0 grid grid-flow-row sm:grid-cols-2 py-16 sm:py-28 gap-y-3">
                </section>
            </section>
        </div>
    )
}