import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import ConnectWallet from "./ConnectWallet";
import CreateAINFTProject from "./CreateAINFTProject";
import MyProjects from "./MyProjects";
import AINFTProjectDetail from "./AINFTProjectDetail";
import {useAccount} from "wagmi";

export default function MainLayout() {
    const {connector: activeConnector, isConnected} = useAccount()
    const [showMyProjects, setShowMyProjects] = useState(true)
    const [showCreateAINFTProject, setShowCreateAINFTProject] = useState(false)
    const [showAINFTProjectDetail, setShowAINFTProjectDetail] = useState(false)

    const activeTab = "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
    const inactiveTab = "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

    function showCreateAINFTProjectF() {
        setShowMyProjects(false)
        setShowCreateAINFTProject(true)
        setShowAINFTProjectDetail(false)
    }

    function showMyProjectsF() {
        setShowMyProjects(true)
        setShowCreateAINFTProject(false)
        setShowAINFTProjectDetail(false)
    }

    function showAINFTProjectDetailF() {
        setShowMyProjects(false)
        setShowCreateAINFTProject(false)
        setShowAINFTProjectDetail(true)
    }

    return (<div>
        <Navbar/>

        <ConnectWallet/>

        {isConnected ? (
            <div>
                <div className="w-full h-full">
                    <div className="max-w-4xl p-4 mx-auto">
                        <div
                            className="text-sm font-medium text-center text-gray-500 border-b border-gray-200
                            dark:text-gray-400 dark:border-gray-700">
                            <ul className="flex flex-wrap -mb-px">
                                <li className="mr-2">
                                    <a href="src/launch/components#" onClick={showMyProjectsF}
                                       className={showMyProjects?activeTab:inactiveTab}>My Projects</a>
                                </li>
                                <li className="mr-2">
                                    <a href="src/launch/components#"
                                       onClick={showCreateAINFTProjectF}
                                       aria-current="page"
                                       className={showCreateAINFTProject?activeTab:inactiveTab}>+ Create Project</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {showCreateAINFTProject ? (<CreateAINFTProject showAINFTProjectDetail={showAINFTProjectDetailF}/>) : (<></>)}

                {showMyProjects ? (<MyProjects showCreateAINFTProject={showCreateAINFTProjectF}
                                               showAINFTProjectDetail={showAINFTProjectDetailF}/>) : (<></>)}

                {showAINFTProjectDetail ? (<AINFTProjectDetail/>) : (<></>)}
            </div>
        ) : (<></>)}
    </div>);
}