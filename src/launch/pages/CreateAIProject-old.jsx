import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import {AIGENML_SERVER_URL, AIGENJS_SERVER_URL} from '../../config'
import {getProjectById} from "../components/Utils";
import ProjectTimeline from "../components/ProjectTimeline";
import Spinner from "../components/Spinner";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function CreateAINFTProject(props) {
    const {connector: activeConnector, isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate();
    const [aiNFTProject, setAINFTProject] = useState("")
    const [noOfAINFT, setNoOfAINFT] = useState(0)
    const [projectProgress, setProjectProgress] = useState([])
    const [createButtonText, setCreateButtonText] = useState("Create")

    useEffect(() => {
        if (isDisconnected) {
            navigate({
                pathname: "/connect",
                search: createSearchParams({
                    forward: "/project/create"
                }).toString()
            })
        } else {
            if (isConnected) {
            }
        }
    }, [isConnected, isDisconnected])

    function handleAINFTProjectChange(event) {
        // 👇 Get input value from "event"
        console.log(event.target.value)
        setAINFTProject(event.target.value)
    }

    function handleNoOfAINFTChange(event) {
        // 👇 Get input value from "event"
        console.log(event.target.value)
        setNoOfAINFT(event.target.value)
    }

    async function createAINFT() {
        if (aiNFTProject === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Provide project name!'
            })
            return;
        }

        let fileInputField = document.getElementById("file_input");
        if (fileInputField.files.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select model file!'
            })
            return;
        }

        if (noOfAINFT <= 0 || noOfAINFT === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Provide number of AI NFTs to create'
            })
            return;
        }

        /**
         * Create AI NFT
         */
        console.log("Creating AI NFT", aiNFTProject)
        setCreateButtonText("Creating Project...")
        axios.post(AIGENML_SERVER_URL + '/project', {
                name: aiNFTProject,
                file: fileInputField.files[0],
                no_of_ainfts: noOfAINFT
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function (response) {
            console.log("Response:", response)
            setCreateButtonText("Project Created")

            if (response.data.status === "success") {
                let project_id = response.data.project_id
                // Create NFT now
                axios.post(AIGENJS_SERVER_URL + '/project/ainft', {
                        project_id: project_id
                    }
                ).then(function (response2) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Yieee!!!',
                        text: response2.data.message
                    }).then(() => {
                        getProjectById(project_id, function (project) {
                            localStorage.setItem("Project", JSON.stringify(project))
                            props.showAINFTProjectDetail()
                        })
                    })
                    console.log(response2);
                }).catch(function (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error
                    })
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message + ". Enter different project name"
                })
                console.log(response.data)
            }
        }).catch(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            })
        })
    }

    return (
        <>
            {isConnected ? (
                <>
                    <Navbar marketplace={true}/>
                    <div className="w-full h-full">
                        <div className="max-w-4xl p-4 mx-auto">

                            <h2 className="text-2xl font-extrabold dark:text-white">Create AI Project</h2>
                            <p className="my-4 text-lg font-lato text-gray-500">Create AI Project for your AI Model
                                written
                                in
                                Tensorflow or PyTorch</p>

                            <div className="mb-6">
                                <label htmlFor="ai_name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter AI
                                    Name:</label>
                                <input type="text" id="ai_name"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                           dark:focus:border-blue-500" value={aiNFTProject} onChange={handleAINFTProjectChange}/>
                            </div>

                            <label className="w-full mb-8 text-sm font-medium text-gray-900 dark:text-white"
                                   htmlFor="file_input">Upload Tensorlflow/Keras Model Files (Architecture +
                                Weights)</label>
                            <input
                                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                            bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600
                            dark:placeholder-gray-400 mt-4"
                                aria-describedby="file_input_help" id="file_input" type="file"/>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Upload .h5
                                file only</p>

                            <div className="mb-4 mt-6">
                                <label htmlFor="no_ai_nfts"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter
                                    The
                                    Maximum
                                    No. of AI
                                    NFT to Create:</label>
                                <input type="number" id="no_ai_nfts"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                           focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                           dark:focus:border-blue-500" value={noOfAINFT} onChange={handleNoOfAINFTChange}/>
                            </div>

                            <div className="flex justify-center items-center">
                                <button type="button"
                                        className="text-white bg-gradient-to-r from-primary-color to-primary-color2 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mb-2"
                                        onClick={createAINFT}>
                                    {createButtonText}&nbsp;&nbsp;{createButtonText === "Creating Project..." ? (
                                    <Spinner/>) : (<></>)}
                                </button>
                            </div>

                            <ProjectTimeline projectProgress={projectProgress}/>
                        </div>
                    </div>
                </>
            ) : (<div>
                <Spinner/>
            </div>)}
        </>
    );
}