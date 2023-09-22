import NFTMarketplaceImage from "../../market/assets/nft-marketplace.png";
import profilePicture from "../../market/assets/profilePicture.png"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ProjectCard({project}) {
    const [logoImage, setLogoImage] = useState(project.logo ? project.logo : profilePicture);
    const [bannerImage, setBannerImage] = useState(project.banner ? project.banner : NFTMarketplaceImage);
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = (id) => {
        setIsHovered(id);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    const navigate = useNavigate();

    function showProjectDetails(id) {
        navigate("/project/detail/" + id)
    }

    const handleLogoImageError = () => {
        console.log(`Ipfs Logo link broken for this project ${
            project.name
        }`)
        setLogoImage(profilePicture);
    };
    const handleBannerImageError = () => {
        console.log(`Ipfs Banner link broken for this project ${
            project.name
        }`)
        setBannerImage(NFTMarketplaceImage);
    };

    function goToCreateNFT(id) {
        navigate("/project/create/nft?id=" + id);
    }

    useEffect(() => {
        console.log("Project details:", project)
    })

    return (
        <div onMouseEnter={
            () => handleMouseEnter(project.id)
        }
             onMouseLeave={
                 () => handleMouseLeave()
             }
             className="flex flex-col sm:flex-row items-center p-4 bg-[#151A4E] rounded-xl hover:box-border hover:border hover:border-[#3464C3]">
            {/* card banner or Image with user/company profile picture*/}

            <div className="rounded-xl flex justify-center mb-6 sm:m-0"
                 style={
                     {
                         width: "16.75rem",
                         height: "14rem"
                     }
                 }>
                <img src={bannerImage}
                     className="rounded-xl object-cover w-full h-full"
                     onError={handleBannerImageError}></img>
            </div>

            <div className="flex flex-col px-4">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div
                            className="bg-gradient-to-t from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-1 backdrop-blur-sm">
                            <img src={logoImage}
                                 className="rounded-full h-7 w-7"
                                 onError={handleLogoImageError}></img>
                        </div>
                        {
                            project.status !== 'Created' && <svg className={
                                `${
                                    isHovered === project.id ? 'block' : 'hidden'
                                } cursor-pointer`
                            }
                                                                width="28"
                                                                height="28"
                                                                viewBox="0 0 28 28"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                onClick={
                                                                    () => showProjectDetails(project.id)
                                                                }>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M14.0013 0.876953C6.76572 0.876953 0.878906 6.76377 0.878906 13.9993C0.878906 21.2349 6.76572 27.1217 14.0013 27.1217C21.237 27.1217 27.124 21.2351 27.124 13.9993C27.1239 6.76358 21.2369 0.876953 14.0013 0.876953ZM20.0478 14.664L17.4046 17.3076C17.2275 17.4846 16.9898 17.5823 16.7396 17.5823C16.4896 17.5823 16.2521 17.4843 16.0752 17.3076C15.7077 16.9405 15.708 16.3451 16.0752 15.9779L17.1137 14.9393H8.61941C8.10003 14.9393 7.67941 14.5187 7.67941 13.9993C7.67941 13.4798 8.10003 13.0593 8.61941 13.0593H17.1137L16.0752 12.0207C15.708 11.6535 15.708 11.0582 16.0752 10.691C16.4423 10.3238 17.0374 10.3238 17.4045 10.691L20.0478 13.3349C20.2238 13.511 20.3231 13.7502 20.3231 13.9993C20.3232 14.2485 20.224 14.4878 20.0478 14.664Z"
                                      fill="url(#paint0_linear_19_67)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_19_67" x1="12.5434" y1="21.4978" x2="14.196"
                                                    y2="0.931642" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#3464C3"/>
                                        <stop offset="1" stop-color="#00C1ED"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        } </div>
                    <p className=" font-bold text-xl text-white font-proxima-nova mb-3 leading-7">
                        {
                            project.name
                        }</p>
                    <p className={`text-marketplace-primary-color-lite mb-6 text-sm max-w-[19rem] leading-5`}>
                        {
                            project.description ?
                                project.description.length > 90 ? project.description.slice(0, 90) + "..." : project.description : ""
                        } </p>
                </div>

                <div className="flex flex-col items-center w-full">
                    <svg width="314" height="2" viewBox="0 0 314 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H314" stroke="url(#paint0_linear_97_150)"/>
                        <defs>
                            <linearGradient id="paint0_linear_97_150" x1="314" y1="1" x2="0" y2="1"
                                            gradientUnits="userSpaceOnUse">
                                <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                                <stop offset="0.494792" stop-color="#404580"/>
                                <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                            </linearGradient>
                        </defs>
                    </svg>

                    {
                        project.status === 'Created' ? (
                            <button
                                className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-8 py-2 flex  text-xs sm:text-base justify-end mt-4"
                                onClick={
                                    () => goToCreateNFT(project.id)
                                }>
                                + Create AINFTs
                            </button>
                        ) : <div className="mt-4 flex justify-around w-full">
                            <div className="flex flex-col items-center">
                                <p className="text-[#0BBB91] mb-2">
                                    {
                                        project.no_of_ainfts
                                    }</p>
                                <p className=" text-marketplace-primary-color-lite text-xs text-start">Total NFTs</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <p className="text-[#00C1ED] mb-2">${
                                    project.price === 'null' ? '--' : project.price
                                }</p>
                                <p className="text-marketplace-primary-color-lite text-xs">Project Price</p>
                            </div>
                        </div>
                    } </div>
            </div>
        </div>
    )
}
