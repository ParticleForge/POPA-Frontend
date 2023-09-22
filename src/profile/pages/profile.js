import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProjectCard from "../../launch/components/ProjectCard";
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";
import Spinner from "../../launch/components/Spinner";
import NFTMarketplaceImage from "../../market/assets/nft-marketplace.png";
import profilePictureImage from "../../market/assets/profilePicture.png";
import { FaEdit } from 'react-icons/fa';
export default function Profile() {
    const {
        connector: activeConnector,
        isReconnecting,
        isConnecting,
        address,
        isConnected,
        isDisconnected
    } = useAccount()
    const [projects, setProjects] = useState(null);
    const [isProjectsFetched, setIsProjectsFetched] = useState(false);
    const [projectFetchedFailed, setProjectFetchedFailed] = useState(false);
    const [profile, setProfile] = useState(null);
    const [isProfileFetched, setIsProfileFetched] = useState(false);
    const [profileFetchedFailed, setProfileetchedFailed] = useState(false);
    const [bannerImage, setBannerImage] = useState(NFTMarketplaceImage);
    const [profilePicture, setProfilePicture] = useState(profilePictureImage);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('User name');
    const [editedUserName,setEditedUsername] = useState();
    const [isEditingUsername, setIsEditingUsername] = useState(false);



    

    useEffect(() => {
        if (isDisconnected) {
            navigate({
                pathname: "/connect",
                search: createSearchParams(
                    {forward: "/profile"}
                ).toString()
            })
        } else {
            if (isConnected) {
                if (!isProjectsFetched) {
                    getProfileDetails()
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
    function getProfileDetails() {
        axios.get(AIGENML_SERVER_URL + '/profile', {params: {
            address: address
        }}).then(function (response) {
            console.log("Profile:", response);

            let data = response.data;
            if (data.status === "success") {
                setUsername(data.profile[0].username)
                setBannerImage(data.profile[0].banner ? data.profile[0].banner  : NFTMarketplaceImage )
                setProfilePicture(data.profile[0].profilePicture ? data.profile[0].profilePicture  : profilePicture )
                setProfile(data.profile[0])
            } else {
                console.log("Error:", response.data)
                setProfile(null)
            }
            setIsProfileFetched(true)
        }).catch((err) => {
            console.log(err)
            setProfileetchedFailed(true)
        })
    }
    const handleBannerUpload = async (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setBannerImage(imageUrl);
        const formData = new FormData();
        formData.append('address', address);
        formData.append('file_type','banner_file');
        formData.append('banner_file',file);
        axios.post(AIGENML_SERVER_URL + '/profile',formData, {headers: {
            'Content-Type': 'multipart/form-data'
        }}).then(function (response) {
            console.log("Banner:", response);

            let data = response.data;
            if (data.status === "success") {
                setBannerImage(data.banner)
            } 

        }).catch((err) => {
            console.log(err)
        })
      };
      const handleProfilePictureUpload = async (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setProfilePicture(imageUrl);
        const formData = new FormData();
        formData.append('address', address);
        formData.append('file_type','profile_picture_file');
        formData.append('profile_picture_file', file);
        console.log(formData,file)
        
        axios.post(AIGENML_SERVER_URL + '/profile',formData,{headers: {
            'Content-Type': 'multipart/form-data'
        }}).then(function (response) {
            console.log("Profile Picture:", response);

            let data = response.data;
            if (data.status === "success") {
                setProfilePicture(data.profile_picture)
            } 

        }).catch((err) => {
            console.log(err)
        })
      };
      const handleUsernameEdit = async (e) => {
        if (editedUserName === '') {
            setIsEditingUsername(false);
            return;
          }
      
        setUsername(editedUserName);
        setIsEditingUsername(false);
        const formData = new FormData();
        formData.append('address', address);
        formData.append('username', editedUserName);
        axios.post(AIGENML_SERVER_URL + '/profile',formData,{headers: {
            'Content-Type': 'multipart/form-data'
        }}).then(function (response) {
            console.log("User name:", response);

            let data = response.data;
            if (data.status === "success") {
                setUsername(data.username)
            } 

        }).catch((err) => {
            console.log(err)
        })
    };
    return (
        <>
            <div className=" container-xl bg-marketplace-background-color min-h-screen">
                <Navbar launchpad={true}/>
                <section className="max-w-7xl mx-auto p-4 my-20 flex flex-col">
                    <div className="flex flex-col">
                    < div className = "w-full h-56 rounded-lg relative" style = {{
                        backgroundImage: `url(${bannerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        }} > <label htmlFor="upload-banner" className="absolute bottom-4 right-4">
                        <input id="upload-banner" type="file" accept="image/*"
                            onChange={(e) => handleBannerUpload(e)}
                            className="hidden"/>
                        <FaEdit className="text-gray-500 h-6 w-6 cursor-pointer"/>
                    </label></div>

                    <div
                        className="flex flex-col items-center justify-center -my-6 relative"
                        
                        >
                        <div className="relative bg-gradient-to-t w-18 from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm" onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                            <img
                            src={profilePicture}
                            className="rounded-full w-16 h-16"
                            alt="Profile Picture"
                            />
                            
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="absolute bg-gray-800 bg-opacity-50 rounded-full p-2">
                                <label htmlFor="profile-picture-input">
                                    <input
                                    id="profile-picture-input"
                                    type="file"
                                    accept="image/*"

                                    onChange={(e) => handleProfilePictureUpload(e)}
                                    className="hidden"
                                    />
                                    <FaEdit
                                    className="text-white h-4 w-4 cursor-pointer"
                                    title="Edit Profile Picture"
                                    />
                                </label>
                                </div>
                            </div>
                        
                        </div>
                        <p
                            className="text-xl font-semibold mt-6"
                            contentEditable={isEditingUsername}
                            onBlur={handleUsernameEdit}
                            onClick={() => setIsEditingUsername(true)}
                            onInput={(event) => setEditedUsername(event.target.innerText)}
                        >
                            {username}
                        </p>
                        </div>

                        <div className=" flex justify-end">
                            

                            <p className=" text-sm truncate">{address}</p>
                        </div>
                    </div>
                    <section>

                        <div class="mb-12 border-b border-[#3B3F6A]">
                            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li class="mr-10" role="presentation">
                                    <button class="inline-block p-4 border-b-2 rounded-t-lg text-white" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">My NFTs</button>
                                </li>

                            </ul>
                        </div>

                        <div id="myTabContent">
                            <div class="" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className=" grid grid-flow-row lg:grid-cols-2 gap-7" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                                    {
                                    projectFetchedFailed ? (
                                        <div className="text-center text-xl text-orange-shade1 p-4 border border-orange-shade1 rounded bg-red-50 mt-8 col-span-2">Unable
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


                        </div>

                    </section>

                </section>
                <Footer/>
            </div>
        </>
    )
}
