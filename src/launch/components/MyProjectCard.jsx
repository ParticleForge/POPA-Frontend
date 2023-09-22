import {React, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function MyProjectCard(props) {
    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function openAINFTProjectDetail(project){
        props.showAINFTProjectDetail();
        localStorage.setItem("Project", JSON.stringify(project))
    }

    function openAIProjectDetail(project){
        localStorage.setItem("Project", JSON.stringify(project))
        navigate("/project/detail/"+project.id)
    }

    return (
        <div
            className="w-full p-4 shadow rounded-lg bg-white sm:p-4 dark:bg-gray-800 dark:border-gray-700 mb-4">
            <div className="flex justify-between">
                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{capitalizeFirstLetter(props.project.name)}</h5>
                <p className="mb-2 text-base font-semibold text-gray-700 dark:text-white">{props.project.no_of_ainfts} AI NFTs</p>
            </div>
            <p className="mb-2 text-base text-gray-500 sm:text-lg dark:text-gray-400 hidden">AI Description
                will be given here.</p>

            <p className="text-xl text-gray-700 sm:text-lg dark:text-gray-400">Status: <span>{props.project.status}</span>
            </p>
            <p className="mb-2 text-xl text-gray-700 sm:text-lg dark:text-gray-400">Model directory: <span>{props.project.model_dir}</span>
            </p>

            <div className="flex justify-end">
                <button type="button"
                        onClick={()=>{
                            openAIProjectDetail(props.project)
                        }}
                        className="text-white bg-gradient-to-r from-primary-color to-primary-color2
                                        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300
                                        dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center
                                        mr-2 mb-2">View
                </button>
            </div>
        </div>
    )
}