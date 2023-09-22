import NFTMarketplaceImage from "../assets/nft-marketplace.png";
import profilePicture from "../assets/profilePicture.png"
import {useEffect, useState} from "react";
import {fetchProjectById, fetchProjectDetails, getAINFTByProject} from "../Utils";

export default function ProjectCard(props) {
    const [project, setProject] = useState(null)
    const [projectFetched, setProjectFetched] = useState(false)
    const [projectDetails, setProjectDetails] = useState({})
    const [projectAINFTs, setProjectAINFTs] = useState(0)

    useEffect(()=>{
        if(!projectFetched) {
            fetchProjectById(props.marketplaceItem.projectId).then((myProject) => {
                setProjectFetched(true)
                setProject(myProject)

                let ownerAddress = myProject.ownerAddress;
                let projectPrice = myProject.price;
                fetchProjectDetails(myProject.detailUri, function (projectDetails1) {
                    console.log("Project details:", projectDetails1)
                    projectDetails1.ownerAddress = ownerAddress;
                    projectDetails1.price = projectPrice;
                    setProjectDetails(projectDetails1)
                }).then(r =>{})

                getAINFTByProject(props.marketplaceItem.projectId).then((projectAINFTs1)=>{
                    console.log(projectAINFTs1)
                    setProjectAINFTs(projectAINFTs1)
                })
            })
         }
    })

    return (
        <div className="flex flex-col p-4 bg-[#151A4E] justify-center rounded-xl">
            {/* card banner or Image with user/company profile picture*/}
            <div className="flex flex-col">
                <div className="rounded-xl flex justify-center">
                    <img src={projectDetails.banner_uri}
                         className="w-full"></img>
                </div>
                <div className="flex justify-center relative -top-7">
                    <div
                        className="bg-gradient-to-t from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm">
                        <img src={projectDetails.logo_uri}
                             className="rounded-full w-16"></img>
                    </div>
                </div>
            </div>
            <div>
                <p className=" font-bold text-2xl text-white font-proxima-nova ">{projectDetails.name?projectDetails.name:(<div>Anonymous</div>)}</p>
                <p className="text-marketplace-primary-color-lite my-6 text-xl">
                    Owner :
                    <span className=" text-white font-bold mx-1">{projectDetails.ownerAddress?projectDetails.ownerAddress.substring(0, 6)+"..."+projectDetails.ownerAddress.substring(projectDetails.ownerAddress.length-6, projectDetails.ownerAddress.length):(<div>Not Known</div>)}</span>
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <svg width="268" height="2" viewBox="0 0 268 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H268" stroke="url(#paint0_linear_19_51)"/>
                    <defs>
                        <linearGradient id="paint0_linear_19_51" x1="268" y1="1" x2="0" y2="1"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                            <stop offset="0.494792" stop-color="#404580"/>
                            <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                        </linearGradient>
                    </defs>
                </svg>

                <div className="my-4 grid grid-cols-3 w-full">
                    <div className="flex flex-col items-center">
                        <p className="text-[#0BBB91] mb-2">{projectAINFTs.length}</p>
                        <p className=" text-marketplace-primary-color-lite text-sm text-start">Total NFTs</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[#00C1ED] mb-2">{projectDetails.price}</p>
                        <p className="text-marketplace-primary-color-lite text-sm">Project Price</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[#EF7300] mb-2">30%</p>
                        <p className="text-marketplace-primary-color-lite text-sm">Sold Out</p>
                    </div>

                </div>
                <svg width="268" height="2" viewBox="0 0 268 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H268" stroke="url(#paint0_linear_19_51)"/>
                    <defs>
                        <linearGradient id="paint0_linear_19_51" x1="268" y1="1" x2="0" y2="1"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                            <stop offset="0.494792" stop-color="#404580"/>
                            <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                        </linearGradient>
                    </defs>
                </svg>

            </div>
            <div className="flex justify-end mt-4 mx-1 cursor-pointer"
                 onClick={() => window.location = "/market/project/detail/2"}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M14.0013 0.876953C6.76572 0.876953 0.878906 6.76377 0.878906 13.9993C0.878906 21.2349 6.76572 27.1217 14.0013 27.1217C21.237 27.1217 27.124 21.2351 27.124 13.9993C27.1239 6.76358 21.2369 0.876953 14.0013 0.876953ZM20.0478 14.664L17.4046 17.3076C17.2275 17.4846 16.9898 17.5823 16.7396 17.5823C16.4896 17.5823 16.2521 17.4843 16.0752 17.3076C15.7077 16.9405 15.708 16.3451 16.0752 15.9779L17.1137 14.9393H8.61941C8.10003 14.9393 7.67941 14.5187 7.67941 13.9993C7.67941 13.4798 8.10003 13.0593 8.61941 13.0593H17.1137L16.0752 12.0207C15.708 11.6535 15.708 11.0582 16.0752 10.691C16.4423 10.3238 17.0374 10.3238 17.4045 10.691L20.0478 13.3349C20.2238 13.511 20.3231 13.7502 20.3231 13.9993C20.3232 14.2485 20.224 14.4878 20.0478 14.664Z"
                          fill="url(#paint0_linear_19_67)"/>
                    <defs>
                        <linearGradient id="paint0_linear_19_67" x1="12.5434" y1="21.4978" x2="14.196" y2="0.931642"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3464C3"/>
                            <stop offset="1" stop-color="#00C1ED"/>
                        </linearGradient>
                    </defs>
                </svg>

            </div>

        </div>
    )
}
