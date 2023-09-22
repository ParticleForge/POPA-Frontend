import React, {Component} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BGLaunch from "./market/assets/bg-launch.png";
import {useNavigate} from "react-router-dom";


export default function App(){
    const navigate = useNavigate();

    function openLaunchpad(){
        navigate("/projects")
    }

    return (
        <>
            <Navbar />
            <div className="w-full h-full">
                <div className="max-w-4xl p-4 mx-auto">
                    <h1 className="text-center text-3xl">Aigen AI NFT Marketplace</h1>
                </div>
            </div>

            <div style={{backgroundImage: `url(${BGLaunch})`}} className="bg-cover bg-no-repeat">
                <div className="w-full h-full">
                    <div className="max-w-4xl p-4 mx-auto py-24 text-white">
                        <h1 className="text-center text-6xl text-white font-bold font-">MINT <span
                            className="text-transparent bg-clip-text bg-gradient-to-br from-blue-shade1 to-blue-shade2">AI NFT</span> for Your <span
                            className="text-transparent bg-clip-text bg-gradient-to-br from-blue-shade1 to-blue-shade2">AI Model</span>
                        </h1>

                        <h2 className="text-center text-xl mt-8">
                            It never hurts to talk - and who knows what great things <br/> will emerge from a
                            friendly conversation.
                        </h2>

                        <div className="text-center pt-12">
                            <button type="button"
                                    onClick={openLaunchpad}
                                    className="text-white bg-gradient-to-br from-orange-shade1 to-yellow-shade1 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-3 text-center mr-2 mb-2">
                                Open Launchpad
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
