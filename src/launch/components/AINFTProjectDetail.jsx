import React, {useEffect, useState} from "react";
import {capitalizeFirstLetter} from "./Utils";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import AINFTCard from "./AINFTCard";
import Spinner from "./Spinner";

export default function AINFTProjectDetail(props) {
    const [project, setProject] = useState(null)
    const [projectFetched, setProjectFetched] = useState(false)
    const [ainfts, setAINFTs] = useState(null)

    useEffect(() => {
        if (!projectFetched) {
            getProject()
        }
    })

    function getProject() {
        let project = JSON.parse(localStorage.getItem("Project"))
        console.log("Project:", project)
        setProject(project)
        setProjectFetched(true)

        getAINFTByProjectId(project.id)
    }

    function getAINFTByProjectId(project_id) {
        console.log(project)

        axios.get(AIGENML_SERVER_URL + '/project/ainft', {
            params: {
                id: project_id
            }
        }).then(function (response) {
            console.log("All ainfts:", response);
            let data = response.data;
            if (data.status === "success") {
                setAINFTs(data.ainfts)
            } else {
                console.log("Error:", response.data)
                setAINFTs(null)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="w-full h-full">
            <div className="max-w-4xl p-4 mx-auto">
                {project ? (
                    <div>
                        <div className="flex justify-between">
                            <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{capitalizeFirstLetter(project.name)}</h5>
                            <p className="mb-2 text-base font-semibold text-gray-700 dark:text-white">{project.no_of_ainfts} AI
                                NFTs</p>
                        </div>

                        <p className="text-xl text-gray-700 sm:text-lg dark:text-gray-400">Status: <span>{project.status ? project.status : (
                            <span>Pending</span>)}</span>
                        </p>

                        <p className="mb-8 text-xl text-gray-700 sm:text-lg dark:text-gray-400">Model
                            directory: <span>{project.model_dir}</span>
                        </p>

                        <hr/>

                        <h5 className="mb-2 mt-8 text-xl font-bold text-gray-900 dark:text-white">AI NFTs</h5>

                        {ainfts ? (<div className="grid grid-cols-3 gap-4">
                                {ainfts.map((ainft) => {
                                    return <AINFTCard ainft={ainft} key={ainft.id}/>
                                })}
                        </div>)
                            : (<div><Spinner /></div>)}
                    </div>
                ) : (<div><Spinner /></div>)}
            </div>
        </div>
    )
};