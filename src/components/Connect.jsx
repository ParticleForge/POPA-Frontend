import React, {useEffect} from "react";

import {arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon, polygonMumbai} from "wagmi/chains";
import {configureChains, createClient, goerli, useAccount, useDisconnect, WagmiConfig} from "wagmi";
import {EthereumClient, modalConnectors, walletConnectProvider} from "@web3modal/ethereum";
import {WC_PROJECT_ID} from "../config";
import {Web3Button, Web3Modal, Web3NetworkSwitch} from "@web3modal/react";
import Navbar from "./Navbar";
import ConnectWallet from "../launch/components/ConnectWallet";
import {useNavigate, useSearchParams} from "react-router-dom";

// 1. Get projectID at https://cloud.walletconnect.com

// 2. Configure wagmi client
const chains = [mainnet, polygon, avalanche, arbitrum, gnosis, bsc, optimism, fantom, goerli, polygonMumbai]

const {provider} = configureChains(chains, [walletConnectProvider({WC_PROJECT_ID}),])
const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({version: '1', appName: 'web3Modal', chains, WC_PROJECT_ID}),
    provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)


export default function Connect(props) {
    const {isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        console.log(searchParams.get("forward"))
        if (isDisconnected) {
            //navigate("/connect")
        } else {
            if (isConnected) {
                navigate(searchParams.get("forward"))
            }
        }
    }, [isConnected, isDisconnected])


    return (
        <div>
            <Navbar/>

            <WagmiConfig client={wagmiClient}>
                <ConnectWallet props={props}/>
            </WagmiConfig>

            <Web3NetworkSwitch />

            <Web3Modal
                projectId={WC_PROJECT_ID}
                ethereumClient={ethereumClient}
            />
        </div>
    );
}