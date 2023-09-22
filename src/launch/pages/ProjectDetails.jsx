import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import NFTMarketplaceImage from "../../market/assets/nft-marketplace.png";
import profilePicture from "../../market/assets/profilePicture.png"
import ListedUnlistedCard from "../components/ListedUnlistedCard";
import React, {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AIGENJS_SERVER_URL} from "../../config";
import Spinner from "../components/Spinner";
import ProjectDescriptionModal from "../components/ProjectDescriptionModal";
import {fetchNFTMetadata, getRevision, launchpad_contract} from "../../contract_abis/web3_obj";

export default function ProjectDetails() {
    const {isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate();
    const {id} = useParams();
    const [project, setProject] = useState(null)
    const [projectFetched, setProjectFetched] = useState(false)
    const [ainfts, setAINFTs] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [creatingNFTStatus, setCreatingNFTStatus] = useState("pending");
    const [aiNFTCreationPercentage, setAINFTCreationPercentage] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    function toggleDescriptionModal(toggle) {
        setShowModal(toggle)
    }

    // function getProject() {
    //     axios.get(AIGENML_SERVER_URL + '/project', {
    //         params: {
    //             id: id
    //         }
    //     }).then(function (response) {
    //         console.log("Data:", response.data.project)
    //         setProject(response.data.project)
    //         setProjectFetched(true)
    //         getProjectById(id)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    // async function getMintingTime(tokenId) {
    //     try {
    //       const tokenURI = await ainft_contract.tokenURI(tokenId);
    //       console.log('Token URI:', tokenURI);

    //       const blockNumber = parseInt(tokenURI.split('/').pop(), 10);
    //       console.log(blockNumber)

    //       const block = await provider.getBlock(16076297);
    //       const mintingTimestamp = block.timestamp;
    //       console.log(mintingTimestamp)

    //       // Convert the timestamp to a human-readable date and time
    //       const mintingDate = new Date(mintingTimestamp * 1000);
    //       console.log('Minting Date:', mintingDate);
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    // }

    // getMintingTime(12)

    async function getProjectAINFTs(id) {
        let project_nfts = await launchpad_contract.getAINFTByProject(id);
        console.log(project_nfts)
        return project_nfts;
    }

    async function getProjectById(id) {
        let project = await launchpad_contract.getProjectById(id);

        let project_nfts = await getProjectAINFTs(id)

        let revision = await getRevision(project.detailUri)

        let data = await fetchNFTMetadata(revision.value)

        let project_data = {
            id: project.id.toNumber(),
            price: project.price,
            logo: data.logo_uri,
            banner: data.banner_uri,
            name: data.name,
            description: data.description,
            status: data.status,
            owner: data.owner,
            project_price: data.project_price ? data.project_price : null,
            no_of_ainfts: data.no_of_ainfts ? data.no_of_ainfts : null,
            detailUri: project.detailUri
        }
        console.log(project_data)

        if (project_nfts.length === 0) {
            getAINFTsFromDB(project_data)
        }

        setAINFTs(project_nfts)
        setProject(project_data)
        setProjectFetched(true)
        // getMintingTime(project_nfts[0].toNumber())
    }

    function createAINFTs(project_id, project_name) {
        if (creatingNFTStatus === "creating" || creatingNFTStatus === "completed") {
            return
        }
        setCreatingNFTStatus("pending")
        axios.post(AIGENJS_SERVER_URL + '/project/ainft/create', {
            project_id: project_id,
            project_name: project_name
        }).then(function (response) {
            console.log("All ainfts:", response);
            if (response.data.status === "success") {
                setCreatingNFTStatus("creating")
                getAINFTsFromDB(project)
            } else {
                setCreatingNFTStatus("failed")
            }
        }).catch((err) => {
            console.log(err)
            setCreatingNFTStatus("failed")
        })
    }

    function getAINFTsFromDB(project) {
        console.log("getAINFTs")
        console.log(project)

        axios.post(AIGENJS_SERVER_URL + '/project/ainft/status', {
            project_id: project.id,
            project_name: project.name
        }).then(function (response) {
            console.log("All ainfts:", response);
            let results = response.data.results;

            if (results.length > 0) {
                let completed = 0;
                let failed = 0;
                let active = 0;
                let waiting = 0;

                for (let i = 0; i < results.length; i++) {
                    if (results[i].status === "completed") {
                        completed += 1;
                    } else if (results[i].status === "failed") {
                        failed += 1;
                    } else if (results[i].status === "active") {
                        active += 1;
                    } else if (results[i].status === "waiting") {
                        waiting += 1;
                    }
                }

                if (completed === results.length) {
                    console.log("Completed")
                    setCreatingNFTStatus("completed")
                } else if (active > 0 || waiting > 0) {
                    setCreatingNFTStatus("creating")
                    let completedPercentage = (completed / results.length) * 100
                    console.log(completedPercentage)
                    setAINFTCreationPercentage(completedPercentage)
                    setTimeout(getAINFTsFromDB, 30000, project)
                } else if (failed + completed === results.length) {
                    setCreatingNFTStatus("failed")
                    setErrorMessage(`Unable to create AINFTs. Completed: ${completed}, Failed:${failed}`)
                }
            } else {
                setTimeout(getAINFTsFromDB, 30000, project)
            }
        }).catch((err) => {
            console.log(err)
            setCreatingNFTStatus("failed")
            setErrorMessage(`Unable to create AINFTs`)
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
                    getProjectById(id).then(() => {
                    })
                }
            }
        }
    }, [isConnected, isDisconnected])

    useEffect(() => {
        setLogoImage(project && project.logo ? project.logo : profilePicture)
        setBannerImage(project && project.banner ? project.banner : NFTMarketplaceImage)
    }, [project])

    const [logoImage, setLogoImage] = useState(profilePicture);
    const [bannerImage, setBannerImage] = useState(NFTMarketplaceImage);
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

    const renderCreateAINFTButton = () => {
        if (creatingNFTStatus === "pending") {
            return "Create AINFTs";
        } else if (creatingNFTStatus === "creating") {
            return <span className="gap-x-2 flex items-center justify-center"> Creating AINFTs <Spinner
                size={6}/> {aiNFTCreationPercentage.toFixed(2)}% </span>
        } else if (creatingNFTStatus === "completed") {
            return "AINFTs created successfully!";
        } else if (creatingNFTStatus === "failed") {
            return "Try again";
        }
    }

    return (
        <> {
            isConnected ? (
                <div className=" container-xl bg-marketplace-background-color min-h-screen">
                    <Navbar/> {
                    project ? (
                        <section className="max-w-7xl mx-auto p-4 flex flex-col ">
                            <div className="flex flex-col my-2">
                                <p className=" text-marketplace-primary-color-lite mb-2 sm:mb-5 lg:mb-4 flex items-center cursor-pointer">
                                    <span className=" cursor-pointer"
                                          onClick={
                                              () => window.location = "/projects"
                                          }>
                                        My Projects</span>
                                    <svg className="mx-2" width="7" height="11" viewBox="0 0 7 11" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.00021 11.0006C2.26541 11.0005 2.51972 10.8951 2.70721 10.7076L6.70721 6.70757C6.89468 6.52004 7 6.26573 7 6.00057C7 5.7354 6.89468 5.4811 6.70721 5.29357L2.70721 1.29357C2.61497 1.19806 2.50462 1.12188 2.38262 1.06947C2.26061 1.01706 2.12939 0.989473 1.99661 0.988319C1.86384 0.987165 1.73216 1.01247 1.60926 1.06275C1.48636 1.11303 1.37471 1.18728 1.28082 1.28117C1.18693 1.37507 1.11267 1.48672 1.06239 1.60962C1.01211 1.73251 0.986809 1.86419 0.987963 1.99697C0.989117 2.12975 1.0167 2.26097 1.06911 2.38297C1.12152 2.50498 1.1977 2.61532 1.29321 2.70757L4.58621 6.00057L1.29321 9.29357C1.1534 9.43342 1.0582 9.61159 1.01963 9.80554C0.981063 9.99949 1.00086 10.2005 1.07654 10.3832C1.15221 10.5659 1.28035 10.7221 1.44476 10.832C1.60917 10.9419 1.80246 11.0005 2.00021 11.0006Z"
                                            fill="#BDC9E0"/>
                                    </svg>

                                    {
                                        project.name
                                    }</p>
                                <p className=" text-white font-bold text-4xl mb-4 sm:mb-4 lg:mb-4">
                                    {
                                        project.name
                                    }</p>
                            </div>
                            <section className="grid grid-flow-row sm:grid-cols-4 sm:gap-x-8 gap-y-4">

                                <div className=" lg:col-span-1">
                                    <div className="flex flex-col p-4 bg-[#151A4E] justify-center rounded-xl">
                                        {/* card banner or Image with user/company profile picture*/}
                                        <div className="flex flex-col">
                                            <div className="rounded-xl flex justify-center"
                                                 style={
                                                     {
                                                         width: "16.25rem",
                                                         height: "14rem"
                                                     }
                                                 }>
                                                <img src={bannerImage}
                                                     onError={handleBannerImageError}
                                                     className="rounded-xl object-cover w-full h-full"></img>
                                            </div>
                                            <div className="flex justify-center relative -top-7">
                                                <div
                                                    className="bg-gradient-to-t from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm ">
                                                    <img src={logoImage}
                                                         onError={handleLogoImageError}
                                                         className="rounded-full h-14 w-14"></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className=" font-bold text-xl text-white font-proxima-nova leading-7 ">
                                                {
                                                    project.name
                                                } </p>
                                            <p className="text-marketplace-primary-color-lite my-6 text-xl">
                                                Owner :
                                                <p className=" text-white font-bold my-1 text-xs truncate">
                                                    {
                                                        project.owner
                                                    }</p>
                                            </p>
                                        </div>
                                        <div className=" grid grid-rows-2 gap-1">

                                            <div
                                                className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                <p className=" text-marketplace-primary-color-lite">Project Price</p>
                                                <p className=" text-[#00C1ED] text-xl">${
                                                    project.project_price == 'null' ? '--' : project.project_price
                                                }</p>
                                            </div>


                                            <div
                                                className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                <p className=" text-marketplace-primary-color-lite">Number of NFTs</p>
                                                <p className=" text-[#0BBB91] text-xl">
                                                    {
                                                        project.no_of_ainfts
                                                    }</p>
                                            </div>
                                            {/* <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                <div className=" flex flex-col items-start">
                                                    <p className=" text-marketplace-primary-color-lite">Sold Out</p>
                                                    <p className=" text-marketplace-primary-color-lite text-xs">Owned by others</p>
                                                </div>
                                                <p className=" text-[#EF7300] text-xl">30%</p>
                                            </div>
                                            <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                <div className=" flex flex-col items-start">
                                                    <p className=" text-marketplace-primary-color-lite">Listed NFTs</p>
                                                    <p className=" text-marketplace-primary-color-lite text-xs">On Aigen</p>
                                                </div>
                                                <p className=" text-[#8ADF1D] text-xl">50%</p>
                                            </div>
                                            <div className=" bg-[#3B3F6A] flex items-center justify-between px-3 py-4 rounded">
                                                <div className=" flex flex-col items-start">
                                                    <p className=" text-marketplace-primary-color-lite">Unlisted NFTs</p>
                                                    <p className=" text-marketplace-primary-color-lite text-xs">Owned by</p>
                                                </div>
                                                <p className=" text-[#FFBB32] text-xl">20%</p>
                                            </div> */}

                                        </div>
                                        <div className=" flex flex-col ">
                                            <svg className="my-5" width="268" height="2" viewBox="0 0 268 2" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 1H268" stroke="url(#paint0_linear_105_229)"/>
                                                <defs>
                                                    <linearGradient id="paint0_linear_105_229" x1="268" y1="1" x2="0"
                                                                    y2="1" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                        <stop offset="0.494792" stop-color="#404580"/>
                                                        <stop offset="1" stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <p className=" text-marketplace-primary-color-lite text-sm mb-6">
                                                {
                                                    project.description.length > 120 ? project.description.slice(0, 120) + "..." : project.description
                                                }</p>
                                            {
                                                project.description.length > 120 && (
                                                    <div>
                                                        <svg className="my-5" width="268" height="2" viewBox="0 0 268 2"
                                                             fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 1H268" stroke="url(#paint0_linear_105_229)"/>
                                                            <defs>
                                                                <linearGradient id="paint0_linear_105_229" x1="268" y1="1"
                                                                                x2="0" y2="1"
                                                                                gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#BDC9E0" stop-opacity="0.05"/>
                                                                    <stop offset="0.494792" stop-color="#404580"/>
                                                                    <stop offset="1" stop-color="#BDC9E0"
                                                                          stop-opacity="0.05"/>
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>

                                                        <p className=" text-[#00C1ED] text-center flex items-center justify-center cursor-pointer"
                                                           onClick={
                                                               () => toggleDescriptionModal(true)
                                                           }>
                                                            Read More
                                                            <svg className="ml-3" width="16" height="12" viewBox="0 0 16 12"
                                                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M10.707 0.280712C10.5184 0.0985537 10.2658 -0.00224062 10.0036 3.78026e-05C9.7414 0.00231622 9.49059 0.107485 9.30518 0.292893C9.11977 0.478301 9.0146 0.729114 9.01233 0.99131C9.01005 1.25351 9.11084 1.50611 9.293 1.69471L12.586 4.98771H1C0.734784 4.98771 0.48043 5.09307 0.292893 5.28061C0.105357 5.46814 0 5.7225 0 5.98771C0 6.25293 0.105357 6.50728 0.292893 6.69482C0.48043 6.88235 0.734784 6.98771 1 6.98771H12.586L9.293 10.2807C9.19749 10.373 9.12131 10.4833 9.0689 10.6053C9.01649 10.7273 8.9889 10.8585 8.98775 10.9913C8.9866 11.1241 9.0119 11.2558 9.06218 11.3787C9.11246 11.5016 9.18671 11.6132 9.28061 11.7071C9.3745 11.801 9.48615 11.8753 9.60905 11.9255C9.73194 11.9758 9.86362 12.0011 9.9964 12C10.1292 11.9988 10.2604 11.9712 10.3824 11.9188C10.5044 11.8664 10.6148 11.7902 10.707 11.6947L15.707 6.69471C15.8945 6.50718 15.9998 6.25288 15.9998 5.98771C15.9998 5.72255 15.8945 5.46824 15.707 5.28071L10.707 0.280712Z"
                                                                    fill="#00C1ED"/>
                                                            </svg>
                                                        </p>
                                                    </div>
                                                )
                                            } </div>

                                    </div>
                                </div>
                                <div className=" lg:col-span-3">


                                    {/* <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                                        <ul class="flex flex-wrap text-base font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                            <li class="mr-5" role="presentation">
                                                <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white " id="sold-tab" data-tabs-target="#sold" type="button" role="tab" aria-controls="sold" aria-selected="true">Sold (120)</button>
                                            </li>
                                            <li class="mr-5" role="presentation">
                                                <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg text-white " id="listed-tab" data-tabs-target="#listed" type="button" role="tab" aria-controls="listed" aria-selected="true">Listed (1250)</button>
                                            </li>
                                            <li class="mr-5" role="presentation">
                                                <button class="inline-block p-4 border-b-2  border-transparent rounded-t-lg text-white " id="unlisted-tab" data-tabs-target="#unlisted" type="button" role="tab" aria-controls="unlisted" aria-selected="true">Unlisted (1200)</button>
                                            </li>
                                        </ul>
                                    </div> */}

                                    {ainfts && ainfts.length === 0 ? (
                                        <div className="p-12 rounded-xl bg-[#151A4E]">
                                            <div
                                                className="flex items-center justify-center">
                                                <div
                                                    className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-8 py-2 flex items-center text-xs sm:text-base mx-auto cursor-pointer"
                                                    onClick={
                                                        () => createAINFTs(id, project.name)
                                                    }>
                                                    {renderCreateAINFTButton()}</div>
                                            </div>
                                            <div className="mt-8 flex justify-center items-center">
                                                {creatingNFTStatus === "completed" ? (
                                                    <span className="text-red">{errorMessage}</span>) : (
                                                    <div className="hidden"></div>)}
                                                {creatingNFTStatus === "completed" ? (
                                                    <span className="cursor-pointer underline" onClick={() => {
                                                        window.location.reload(false)
                                                    }}>Reload this page to view AINFTs</span>) : (
                                                    <div className="hidden"></div>)}
                                            </div>
                                        </div>) : ''}

                                    <div id="myTabContent">


                                        {/* <section className="grid grid-flow-row lg:grid-cols-3 gap-4" role="tabpanel" aria-labelledby="sold-tab" id="sold">
                                            {
                                            project.ai_nfts && project.ai_nfts.map((ai_nft) => (
                                                <SoldCard nft_id={ai_nft.toNumber()}/>))
                                        } </section> */}
                                        <section className=" grid grid-flow-row lg:grid-cols-3 gap-4" role="tabpanel"
                                                 aria-labelledby="listed-tab" id="listed">

                                            {
                                                ainfts && ainfts.map((ai_nft) => (
                                                    <ListedUnlistedCard Listed={false} tokenID={ai_nft.toNumber()}/>

                                                ))
                                            } </section>
                                        {/* <section className=" grid grid-flow-row lg:grid-cols-3 gap-4" role="tabpanel" aria-labelledby="unlisted-tab" id="unlisted">

                                            {
                                            project.ai_nfts && project.ai_nfts.map((ai_nft) => (
                                                <ListedUnlistedCard Listed={false}/>

                                            ))
                                        } </section> */}
                                    </div>
                                </div>

                            </section>
                            {
                                showModal ? (
                                    <ProjectDescriptionModal toggleDescriptionModal={toggleDescriptionModal}
                                                             description={
                                                                 project.description
                                                             }/>
                                ) : (
                                    <></>
                                )
                            } </section>

                    ) : <div className="my-5"><Spinner/></div>
                }
                    {project && <Footer/>}

                </div>
            ) : <Spinner/>
        } </>
    )
}
