import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import Navbar from "../../components/Navbar";
import {createSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import MyProjectCard from "../components/MyProjectCard";
import Spinner from "../components/Spinner";

export default function MyAIProjects(props) {
    const {connector: activeConnector, isReconnecting, isConnecting, isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate();
    const [projects, setProjects] = useState(null)
    const [isProjectsFetched, setIsProjectsFetched] = useState(false)
    const [projectFetchedFailed, setProjectFetchedFailed] = useState(false)

    useEffect(() => {
        if (isDisconnected) {
            navigate({
                pathname: "/connect",
                search: createSearchParams({
                    forward: "/projects"
                }).toString()
            })
        } else {
            if (isConnected) {
                if (!isProjectsFetched) {
                    getAllProjects()
                }
            }
        }
    }, [isConnected, isDisconnected])

    function getAllProjects() {
        axios.get(AIGENML_SERVER_URL + '/projects', {}).then(function (response) {
            console.log("All projects:", response);

            let data = response.data;
            if (data.status === "success") {
                setProjects(data.projects)
            } else {
                console.log("Error:", response.data)
                setProjects(null)
            }
            setIsProjectsFetched(true)
        }).catch((err) => {
            console.log(err)
            setProjectFetchedFailed(true)
        })
    }

    function showCreateAIProject() {
        navigate("/project/create")
    }

    return (
        <>
            {isConnected ? (
                <>
                    <Navbar marketplace={true}/>
                    <div className="w-full h-full">
                        <div className="max-w-4xl p-4 mx-auto">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-extrabold dark:text-white">My AI Projects</h2>
                                    <p className="my-4 text-lg font-lato text-gray-500">List of My AI Projects</p>
                                </div>
                                <button type="button"
                                        onClick={showCreateAIProject}
                                        className="mt-2 text-white bg-gradient-to-r from-primary-color via-primary-color2 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    + Create AI Project
                                </button>
                            </div>

                            <div className="">
                                {projectFetchedFailed ? (
                                    <div
                                        className="text-center text-xl text-orange-shade1 p-4 border border-orange-shade1 rounded bg-red-50 mt-8">Unable
                                        to load projects</div>
                                ) : projects ? projects.map((project) => {
                                    return <MyProjectCard project={project}
                                                          key={project.name}/>
                                }) : (<div><Spinner/></div>)}

                            </div>
                        </div>
                    </div>
                </>
            ) : (<div>
                <Spinner/>
            </div>)}
        </>
    );
}
