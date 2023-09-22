import React, {useEffect, useState} from "react";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import MyProjectCard from "./MyProjectCard";
import Spinner from "./Spinner";

export default function MyProjects(props) {
    const [projects, setProjects] = useState(null)
    const [isProjectsFetched, setIsProjectsFetched] = useState(false)

    useEffect(() => {
        if (!isProjectsFetched) {
            getAllProjects()
        }
    })

    function getAllProjects() {
        axios.get(AIGENML_SERVER_URL + '/projects', {}).then(function (response) {
            console.log("All projects:", response);

            let data = response.data;
            if(data.status === "success"){
                setProjects(data.projects)
            }else{
                console.log("Error:", response.data)
                setProjects(null)
            }
            setIsProjectsFetched(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="w-full h-full">
            <div className="max-w-4xl p-4 mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-extrabold dark:text-white">My Projects</h2>
                        <p className="my-4 text-lg font-lato text-gray-500">List of My AI NFT Projects</p>
                    </div>
                    <button type="button"
                            onClick={props.showCreateAINFTProject}
                            className="mt-2 text-white bg-gradient-to-r from-primary-color via-primary-color2 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        + Create Project
                    </button>
                </div>

                <div className="">
                    {projects?projects.map((project)=>{
                        return <MyProjectCard project={project} showAINFTProjectDetail={props.showAINFTProjectDetail}
                                              key={project.name}/>
                    }):(<div><Spinner /></div>)}
                </div>
            </div>
        </div>
    )
};