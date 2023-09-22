import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import Spinner from "../components/Spinner";
import {fetchNFTMetadata, getRevision, launchpad_contract} from "../../contract_abis/web3_obj";

export default function ListProjects() {
    const {
        isConnected,
        isDisconnected,
        address
    } = useAccount()
    const [projects, setProjects] = useState(null)
    const [isProjectsFetched, setIsProjectsFetched] = useState(false)
    const [projectFetchedFailed, setProjectFetchedFailed] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (isDisconnected) {
            navigate({
                pathname: "/connect",
                search: createSearchParams(
                    {forward: "/projects"}
                ).toString()
            })
        } else {
            if (isConnected) {
                if (!isProjectsFetched) {
                    getAIProjects()
                }
            }
        }
    }, [isConnected, isDisconnected])

    async function getAIProjects() {
        let projects_list = await launchpad_contract.getMyProjects();
        let projects = [];
        console.log(projects_list)
        for (let i = projects_list.length - 1; i >= 0; i--) {
            let project = projects_list[i];
            let revision = await getRevision(project.detailUri)
            let data = await fetchNFTMetadata(revision.value)
            projects.push({
                id: project.id.toNumber(),
                price: data.project_price ? data.project_price : null,
                logo: data.logo_uri,
                banner: data.banner_uri,
                name: data.name,
                description: data.description,
                status: data.status,
                no_of_ainfts: data.no_of_ainfts ? data.no_of_ainfts : null
            })
            setProjects(projects)
        }
        setProjects(projects)
    }

    function getAllProjects() {
        axios.get(AIGENML_SERVER_URL + '/project', {
            params: {
                account: address
            }
        }).then(function (response) {
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
        <div className="container-xl bg-marketplace-background-color min-h-screen">
            <Navbar/>
            <section className="max-w-7xl mx-auto p-4 my-10 flex flex-col min-h-[67vh] ">
                <div className=" flex items-center justify-between mb-5">
                    <div> {/* heading  */}
                        <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold font-proxima-nova">
                            Our Projects</p>
                    </div>
                    <div onClick={showCreateAIProject}>
                        {/* button */}
                        <button
                            className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-4 lg:px-6
                            py-2 lg:py-3 text-sm sm:text-base">
                            + Create New Project
                        </button>
                    </div>
                </div>
                <section>

                    <div class="mb-12 border-b border-[#3B3F6A]">
                        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab"
                            data-tabs-toggle="#myTabContent" role="tablist">
                            <li class="mr-10" role="presentation">
                                <button class="inline-block p-4 border-b-2 rounded-t-lg text-white" id="profile-tab"
                                        data-tabs-target="#profile" type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">Projects
                                </button>
                            </li>
                            {/* <li class="mr-2" role="presentation">
                                <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-marketplace-primary-color-lite " id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Deployed ListProjects</button>
                            </li> */}
                        </ul>
                    </div>

                    <div id="myTabContent">
                        <div class="" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className=" grid grid-flow-row lg:grid-cols-2 gap-7" id="profile" role="tabpanel"
                                 aria-labelledby="profile-tab">

                                {
                                    projectFetchedFailed ? (
                                        <div
                                            className="text-center text-xl text-orange-shade1 p-4 border border-orange-shade1 rounded bg-red-50 mt-8 col-span-2">Unable
                                            to load projects</div>
                                    ) : projects ? projects.map((project) => {
                                        return <ProjectCard project={project}
                                                            key={
                                                                project.name
                                                            }/>
                                    }) : (
                                        <div><Spinner/></div>
                                    )
                                } </div>
                        </div>
                        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel"
                             aria-labelledby="dashboard-tab">
                            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the
                                <strong class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated
                                    content</strong>. Clicking another tab will toggle the visibility of this one for
                                the next. The tab JavaScript swaps classes to control the content visibility and
                                styling.</p>
                        </div>
                    </div>
                </section>
            </section>
            <Footer/>
        </div>
    )
}
