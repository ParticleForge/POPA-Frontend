import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import {capitalizeFirstLetter} from "../components/Utils";
import AINFTCard from "../components/AINFTCard";
import Spinner from "../components/Spinner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import NFTMarketplaceImage from "../../market/assets/nft-marketplace.png";
import profilePicture from "../../market/assets/profilePicture.png"
import ListedUnlistedCard from "../components/ListedUnlistedCard";
import SoldCard from "../components/SoldCard";


export default function AIProjectDetail() {
    const {connector: activeConnector, isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate();
    const {id} = useParams();
    const [project, setProject] = useState(null)
    const [projectFetched, setProjectFetched] = useState(false)
    const [ainfts, setAINFTs] = useState(null)

    function getProject() {
        axios.get(AIGENML_SERVER_URL + '/project', {
            params: {
                id: id
            }
        }).then(function (response) {
            console.log("Data:", response.data.project)
            setProject(response.data.project)
            setProjectFetched(true)
            getAINFTByProjectId(id)
        }).catch((err) => {
            console.log(err)
        })
    }

    function getAINFTByProjectId(project_id) {
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

    useEffect(() => {
        if (isDisconnected) {
            navigate({
                pathname: "/connect",
                search: createSearchParams(
                    {
                        forward: "/project/detail/" + id
                    }
                ).toString()
            })
        } else {
            if (isConnected) {
                if (!projectFetched) {
                    getProject()
                }
            }
        }
    }, [isConnected, isDisconnected])

    return (
        <> {
            isConnected ? (
                <>
                    <Navbar marketplace={true}/>
                    <div className="w-full h-full">
                        <div className="max-w-4xl p-4 mx-auto">
                            {
                            project ? (
                                <section className="max-w-7xl mx-auto p-4 flex flex-col">
                                    <div className="flex flex-col mt-2 mb-6 sm:mb-8 lg:mb-10">
                                        <p className=" text-marketplace-primary-color-lite mb-5 sm:mb-7 lg:mb-10 flex items-center cursor-pointer">
                                            <svg className="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.99979 11.0006C4.73459 11.0005 4.48028 10.8951 4.29279 10.7076L0.292787 6.70757C0.105316 6.52004 0 6.26573 0 6.00057C0 5.7354 0.105316 5.4811 0.292787 5.29357L4.29279 1.29357C4.38503 1.19806 4.49538 1.12188 4.61738 1.06947C4.73939 1.01706 4.87061 0.989473 5.00339 0.988319C5.13616 0.987165 5.26784 1.01247 5.39074 1.06275C5.51364 1.11303 5.62529 1.18728 5.71918 1.28117C5.81307 1.37507 5.88733 1.48672 5.93761 1.60962C5.98789 1.73251 6.01319 1.86419 6.01204 1.99697C6.01088 2.12975 5.9833 2.26097 5.93089 2.38297C5.87848 2.50498 5.8023 2.61532 5.70679 2.70757L2.41379 6.00057L5.70679 9.29357C5.8466 9.43342 5.9418 9.61159 5.98037 9.80554C6.01894 9.99949 5.99914 10.2005 5.92346 10.3832C5.84779 10.5659 5.71965 10.7221 5.55524 10.832C5.39083 10.9419 5.19754 11.0005 4.99979 11.0006Z" fill="#BDC9E0"/>
                                            </svg>

                                            Projects / High Quality AI</p>
                                        <p className=" text-white font-bold text-4xl mb-5 sm:mb-6 lg:mb-8">High Quality AI</p>

                                    </div>
                                    <section className=" grid grid-flow-row sm:grid-cols-4 sm:gap-x-8 gap-y-4">

                                        <div className=" lg:col-span-1">
                                            <div className="flex flex-col p-4 bg-[#151A4E] justify-center rounded-xl">
                                                {/* card banner or Image with user/company profile picture*/}
                                                <div className="flex flex-col">
                                                    <div className="rounded-xl flex justify-center">
                                                        <img src={NFTMarketplaceImage}
                                                            className="w-full"></img>
                                                    </div>
                                                    <div className="flex justify-center relative -top-7">
                                                        <div className="bg-gradient-to-t from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm">
                                                            <img src={profilePicture}
                                                                className="rounded-full"></img>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className=" font-bold text-2xl text-white font-proxima-nova ">
                                                        {
                                                        project.name
                                                    } </p>
                                                    <p className="text-marketplace-primary-color-lite my-6 text-xl">
                                                        Owner :
                                                        <span className=" text-white font-bold mx-1">Aigen Protocol</span>
                                                    </p>
                                                </div>
                                                <div className=" grid grid-rows-5 gap-1">
                                                    <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                        <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                        <p className=" text-[#00C1ED]">$500K</p>
                                                    </div>
                                                    <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                        <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                        <p className=" text-[#00C1ED]">$500K</p>
                                                    </div>
                                                    <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                        <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                        <p className=" text-[#00C1ED]">$500K</p>
                                                    </div>
                                                    <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                        <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                        <p className=" text-[#00C1ED]">$500K</p>
                                                    </div>
                                                    <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                        <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                        <p className=" text-[#00C1ED]">$500K</p>
                                                    </div>

                                                </div>
                                                <div className=" flex flex-col ">
                                                    <svg className="my-5" width="268" height="2" viewBox="0 0 268 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 1H268" stroke="url(#paint0_linear_105_229)"/>
                                                        <defs>
                                                            <linearGradient id="paint0_linear_105_229" x1="268" y1="1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                                <stop offset="0.494792" stop-color="#404580"/>
                                                                <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                    <p className=" text-marketplace-primary-color-lite text-sm mb-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, words which don't look even slightly believable.</p>
                                                    <p className=" text-marketplace-primary-color-lite text-sm">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, words which don't look even slightly believable.</p>
                                                    <svg className="my-5" width="268" height="2" viewBox="0 0 268 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0 1H268" stroke="url(#paint0_linear_105_229)"/>
                                                        <defs>
                                                            <linearGradient id="paint0_linear_105_229" x1="268" y1="1" x2="0" y2="1" gradientUnits="userSpaceOnUse">
                                                                <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                                <stop offset="0.494792" stop-color="#404580"/>
                                                                <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                    <p className=" text-[#00C1ED] text-center flex items-center justify-center">
                                                        Read More
                                                        <svg className="ml-3" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.707 0.280712C10.5184 0.0985537 10.2658 -0.00224062 10.0036 3.78026e-05C9.7414 0.00231622 9.49059 0.107485 9.30518 0.292893C9.11977 0.478301 9.0146 0.729114 9.01233 0.99131C9.01005 1.25351 9.11084 1.50611 9.293 1.69471L12.586 4.98771H1C0.734784 4.98771 0.48043 5.09307 0.292893 5.28061C0.105357 5.46814 0 5.7225 0 5.98771C0 6.25293 0.105357 6.50728 0.292893 6.69482C0.48043 6.88235 0.734784 6.98771 1 6.98771H12.586L9.293 10.2807C9.19749 10.373 9.12131 10.4833 9.0689 10.6053C9.01649 10.7273 8.9889 10.8585 8.98775 10.9913C8.9866 11.1241 9.0119 11.2558 9.06218 11.3787C9.11246 11.5016 9.18671 11.6132 9.28061 11.7071C9.3745 11.801 9.48615 11.8753 9.60905 11.9255C9.73194 11.9758 9.86362 12.0011 9.9964 12C10.1292 11.9988 10.2604 11.9712 10.3824 11.9188C10.5044 11.8664 10.6148 11.7902 10.707 11.6947L15.707 6.69471C15.8945 6.50718 15.9998 6.25288 15.9998 5.98771C15.9998 5.72255 15.8945 5.46824 15.707 5.28071L10.707 0.280712Z" fill="#00C1ED"/>
                                                        </svg>
                                                    </p>

                                                </div>

                                            </div>
                                        </div>
                                        <div className=" lg:col-span-3">
                                            <div class="mb-12 border-b border-[#3B3F6A]">
                                                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                                    <li class="mr-10" role="presentation">
                                                        <button class="inline-block p-4 border-b-2 rounded-t-lg text-[#00C1ED]" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Unlisted(200)</button>
                                                    </li>
                                                    <li class="mr-10" role="presentation">
                                                        <button class="inline-block p-4 border-b-2 rounded-t-lg text-marketplace-primary-color-lite " id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Listed(120)</button>
                                                    </li>
                                                    <li class="mr-2" role="presentation">
                                                        <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-marketplace-primary-color-lite " id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Sold(40)</button>
                                                    </li>

                                                </ul>
                                            </div>
                                            <section className=" grid grid-flow-row lg:grid-cols-3 gap-4">
                                                <SoldCard/>
                                                <SoldCard/>
                                                <SoldCard/>
                                                <SoldCard/>
                                                <SoldCard/>
                                                <SoldCard/>
                                                <ListedUnlistedCard Listed={true}/>
                                                <ListedUnlistedCard Listed={true}/>
                                                <ListedUnlistedCard Listed={true}/>
                                                <ListedUnlistedCard Listed={false}/>
                                                <ListedUnlistedCard Listed={false}/>
                                                <ListedUnlistedCard Listed={false}/>

                                            </section>
                                        </div>

                                    </section>
                                </section>
                            ) : (
                                <div><Spinner/></div>
                            )
                        } </div>
                    </div>
                </>
            ) : (
                <div>
                    <Spinner/>
                </div>
            )
        } </>
    )
}
