import React, {useEffect, useRef, useState} from "react";
import Swal from 'sweetalert2';
import {ethers} from "ethers";
import Spinner from "../components/Spinner";
import {useAccount} from "wagmi";
import {createSearchParams, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar";
import {launchpad_contract, saveSigningKey, uploadAIProjectMetadata} from "../../contract_abis/web3_obj";
import {createW3NameLink, uploadImageToNFTStorage} from "../Utils";

export default function CreateAIProject(props) {
    const {address, isConnected, isDisconnected} = useAccount()
    const navigate = useNavigate();
    const [aiProjectName, setAIProjectName] = useState("")
    const [aiProjectDescription, setAIProjectDescription] = useState(null)
    const [createButtonText, setCreateButtonText] = useState("Create Project")
    const [logoPreview, setLogoPreview] = useState(null);
    const [banner, setBanner] = useState('');
    const ProjectLogoRef = useRef();
    const ProjectBannerRef = useRef(null);

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
                console.log("connected")
            }
        }
    }, [isConnected, isDisconnected])

    function handleAIProjectNameChange(event) { // 👇 Get input value from "event"
        setAIProjectName(event.target.value)
    }

    function handleAIDescriptionChange(event) { // 👇 Get input value from "event"
        setAIProjectDescription(event.target.value)
    }

    const handleProjectLogoFileUpload = () => {
        ProjectLogoRef.current.click();
    };
    const handleProjectBannerUpload = () => {
        ProjectBannerRef.current.click();
    };

    function handleProjectBannerChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            setBanner(event.target.result);
        }

        reader.readAsDataURL(file);
    }

    const bannerStyle = {
        backgroundImage: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };

    const handleProjectLogoFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoPreview(null);
        }
    };

    const handleLogoDelete = () => {
        setLogoPreview(null);
        ProjectLogoRef.current.value = null;
    };

    async function createAIProject() {
        if (aiProjectName === "") {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Provide project name!'})
            return;
        }

        if (aiProjectDescription === null) {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Provide project description!'})
            return;
        }

        let logoInputField = ProjectLogoRef.current;
        if (logoInputField.files.length === 0) {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Please select project logo file!'})
            return;
        }

        let bannerInputField = ProjectBannerRef.current;
        if (bannerInputField.files.length === 0) {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Please select project banner file!'})
            return;
        }

        console.log("Creating AI Project", aiProjectName)
        setCreateButtonText("Creating Project...")
        const logoBuffer = logoInputField.files[0];
        const bannerBuffer = bannerInputField.files[0]; // Get the image buffer from the file or any other source
        try {
            // Upload the image to NFT.Storage
            const logoUrl = await uploadImageToNFTStorage(logoBuffer);
            console.log('Logo uploaded:', logoUrl);
            const bannerUrl = await uploadImageToNFTStorage(bannerBuffer);
            console.log('Banner uploaded:', bannerUrl);

            // Create the NFT metadata
            const metadata = {
                name: aiProjectName,
                description: aiProjectDescription,
                logo_uri: logoUrl,
                banner_uri: bannerUrl,
                status: "Created",
                owner: address,
                project_price: 0,
                no_of_ainfts: 0
            };
            const projectMetadataUrl = await uploadAIProjectMetadata(metadata);
            console.log('AI Project metadata created:', projectMetadataUrl);

            // create this project on launchpad contract
            try {
                console.log(projectMetadataUrl)
                let w3name = await createW3NameLink(projectMetadataUrl)
                console.log("w3name:", w3name)

                try {
                    let Project = await launchpad_contract.createProject(w3name.toString(),
                        {value: ethers.utils.parseEther("0.0000001")});

                    Project.wait()
                        .then(async (receipt) => {
                            console.log(receipt)
                            const event = receipt.events.find(event => event.event === 'ProjectCreated');
                            const projectId = event.args.project_id.toNumber();
                            console.log('Created project with ID:', projectId);
                            await saveSigningKey(w3name, projectId, aiProjectName)
                        })
                        .catch(error => {
                            console.error('Transaction error:', error);
                        });
                } catch (error) {
                    console.error('Contract interaction error:', error);
                }
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function goToHome() {
        navigate("/projects")
    }

    return (
        <> {
            isConnected ? (
                <div className="container-xl bg-marketplace-background-color min-h-screen">
                    <Navbar marketplace={true}/>
                    <section className="max-w-7xl mx-auto flex flex-col">
                        <div className="flex flex-col mt-6 mb-12 sm:mb-14 lg:mb-10">
                            <p className=" text-marketplace-primary-color-lite flex items-center cursor-pointer pl-4"
                               onClick={goToHome}>
                                <svg className="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.99979 11.0006C4.73459 11.0005 4.48028 10.8951 4.29279 10.7076L0.292787 6.70757C0.105316 6.52004 0 6.26573 0 6.00057C0 5.7354 0.105316 5.4811 0.292787 5.29357L4.29279 1.29357C4.38503 1.19806 4.49538 1.12188 4.61738 1.06947C4.73939 1.01706 4.87061 0.989473 5.00339 0.988319C5.13616 0.987165 5.26784 1.01247 5.39074 1.06275C5.51364 1.11303 5.62529 1.18728 5.71918 1.28117C5.81307 1.37507 5.88733 1.48672 5.93761 1.60962C5.98789 1.73251 6.01319 1.86419 6.01204 1.99697C6.01088 2.12975 5.9833 2.26097 5.93089 2.38297C5.87848 2.50498 5.8023 2.61532 5.70679 2.70757L2.41379 6.00057L5.70679 9.29357C5.8466 9.43342 5.9418 9.61159 5.98037 9.80554C6.01894 9.99949 5.99914 10.2005 5.92346 10.3832C5.84779 10.5659 5.71965 10.7221 5.55524 10.832C5.39083 10.9419 5.19754 11.0005 4.99979 11.0006Z"
                                        fill="#BDC9E0"/>
                                </svg>
                                Home
                            </p>
                        </div>
                    </section>
                    <section className="max-w-4xl mx-auto flex flex-col items-center ">
                        <div className="flex flex-col items-center justify-center max-w-lg sm:max-w-xl">
                            <p className=" text-white font-bold text-4xl mb-3 sm:mb-4 lg:mb-5 font-proxima-nova">Let’s
                                set up your project</p>
                            <p className=" text-marketplace-primary-color-lite text-center mb-9 sm:mb-11 lg:mb-12">
                                Tell us more about your project so we can provide you a personalized experience tailored
                                to your needs and preferences.</p>
                        </div>
                        <section
                            className=" grid grid-flow-row gap-y-4 bg-aigen-background-color-shade-4 p-12 rounded-xl w-[92vw] sm:w-full ">
                            <div className="flex flex-col mb-14">
                                <p className="text-white leading-6 mb-5">Project Logo</p>
                                <div className="flex items-center">
                                    {
                                        logoPreview ? (
                                            <div className="bg-[#00C1ED] p-0.5 w-20 h-20 rounded-full mr-6" style={{
                                                backgroundImage: `url(${logoPreview})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}></div>
                                        ) : (
                                            <div
                                                className=" bg-[#0F154E] p-7 rounded-full mr-6 border border-[#7279CC] border-dashed">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.5 7.5C8.19036 7.5 8.75 6.94036 8.75 6.25C8.75 5.55964 8.19036 5 7.5 5C6.80964 5 6.25 5.55964 6.25 6.25C6.25 6.94036 6.80964 7.5 7.5 7.5Z"
                                                        fill="#3B3F6A"/>
                                                    <path d="M20 15H17.5V12.5H15V15H12.5V17.5H15V20H17.5V17.5H20V15Z"
                                                          fill="#3B3F6A"/>
                                                    <path
                                                        d="M10 17.5H2.5V2.5H17.5V10H20V1.25C20 0.918479 19.8683 0.600537 19.6339 0.366117C19.3995 0.131696 19.0815 0 18.75 0L1.25 0C0.918479 0 0.600537 0.131696 0.366117 0.366117C0.131696 0.600537 0 0.918479 0 1.25L0 18.75C0 19.0815 0.131696 19.3995 0.366117 19.6339C0.600537 19.8683 0.918479 20 1.25 20H10V17.5Z"
                                                        fill="#3B3F6A"/>
                                                    <path
                                                        d="M14.535 11.5712L12.5 7.5L8.75 12.5L6.25 10L3.75 15H11.4262C11.6285 14.2197 12.017 13.5001 12.5585 12.9029C13.0999 12.3057 13.7782 11.8487 14.535 11.5712Z"
                                                        fill="#3B3F6A"/>
                                                </svg>
                                            </div>
                                        )
                                    }
                                    <div className=" flex flex-col">
                                        <div className=" flex items-center mb-4 cursor-pointer">
                                            <p className=" text-[#00C1ED]   mr-4"
                                               onClick={handleProjectLogoFileUpload}>
                                                {
                                                    logoPreview ? "Change Logo" : "Choose File"
                                                }</p>
                                            {
                                                logoPreview ? (
                                                    <div onClick={handleLogoDelete}>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.7 0.3C13.3 -0.1 12.7 -0.1 12.3 0.3L7 5.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L5.6 7L0.3 12.3C-0.1 12.7 -0.1 13.3 0.3 13.7C0.5 13.9 0.7 14 1 14C1.3 14 1.5 13.9 1.7 13.7L7 8.4L12.3 13.7C12.5 13.9 12.8 14 13 14C13.2 14 13.5 13.9 13.7 13.7C14.1 13.3 14.1 12.7 13.7 12.3L8.4 7L13.7 1.7C14.1 1.3 14.1 0.7 13.7 0.3Z"
                                                                fill="#7279CC"/>
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )
                                            } </div>
                                        <input type="file"
                                               ref={ProjectLogoRef}
                                               id="file_input"
                                               accept="image/*"
                                               onChange={handleProjectLogoFileChange}
                                               style={
                                                   {display: 'none'}
                                               }/>
                                        <p className=" text-marketplace-primary-color-lite text-sm">.JPG, GIF, PNG, SVG
                                            up to 8MB, Recommended size is 256x256px.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="mb-5 text-marketplace-primary-color-lite">Project Name*</p>
                                <input
                                    className=" bg-marketplace-background-color text-marketplace-primary-color-lite border border-input-border-primary-color px-4 py-3 w-full rounded placeholder:text-marketplace-primary-color-lite focus-visible:border-[#00C1ED] focus:border-[#00C1ED] "
                                    placeholder="AI project name"
                                    value={aiProjectName}
                                    onChange={handleAIProjectNameChange}></input>
                            </div>
                            <div>
                                <p className="mb-5 text-marketplace-primary-color-lite">Description*</p>
                                <textarea
                                    className=" bg-marketplace-background-color  text-marketplace-primary-color-lite border border-input-border-primary-color px-4 py-3 w-full rounded placeholder:text-marketplace-primary-color-lite focus:border-[#00C1ED]"
                                    placeholder="AI project description"
                                    rows={3}
                                    value={aiProjectDescription}
                                    onChange={handleAIDescriptionChange}></textarea>
                            </div>
                            <div className="flex flex-col mb-12 sm:mb-14 ">
                                <p className="text-white leading-6 mb-4">Project Banner Image</p>
                                <div
                                    className="flex flex-col bg-[#0F154E] rounded-xl items-center w-full px-12 py-10 gap-y-4 relative border border-[#3B3F6A] border-dashed"
                                    style={bannerStyle}>

                                    <div className={
                                        ` ${
                                            banner ? 'opacity-0' : ''
                                        }`
                                    }>
                                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 31V2" stroke="#353A6B" strokeWidth="4" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M32 12L22 2L12 12" stroke="#353A6B" strokeWidth="4"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                            <path
                                                d="M2 30V38C2 39.0609 2.42143 40.0783 3.17157 40.8284C3.92172 41.5786 4.93913 42 6 42H38C39.0609 42 40.0783 41.5786 40.8284 40.8284C41.5786 40.0783 42 39.0609 42 38V30"
                                                stroke="#353A6B" strokeWidth="4" strokeLinecap="round"
                                                strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={
                                        ` ${
                                            banner ? 'opacity-0' : ''
                                        } flex flex-col items-center`
                                    }>
                                        <p className="text-[#00C1ED] mb-4 cursor-pointer"
                                           onClick={handleProjectBannerUpload}>Choose a File</p>
                                        <input type="file"
                                               ref={ProjectBannerRef}
                                               id="banner_input"
                                               accept="image/*"
                                               onChange={handleProjectBannerChange}
                                               style={
                                                   {display: 'none'}
                                               }/>
                                        <p className="text-marketplace-primary-color-lite text-sm text-center">Accepted
                                            file formats: JPG, GIF, PNG, WEBP, SVG. Max 5MB.</p>
                                    </div>
                                    {
                                        banner && (
                                            <button
                                                className="absolute underline top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00C1ED] font-bold py-2 px-4 rounded-lg bg-black bg-opacity-50 hover:bg-opacity-70"
                                                onClick={handleProjectBannerUpload}>
                                                Change File
                                            </button>
                                        )
                                    } </div>

                            </div>
                            <div className=" flex justify-end gap-5">
                                <button
                                    className="text-white rounded-xl border border-[#3B3F6A] px-8 py-2 flex items-center">
                                    Cancel
                                </button>
                                <button disabled={createButtonText === "Creating Project..."}
                                        className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-8 py-2 flex items-center text-xs sm:text-base"
                                        onClick={createAIProject}>
                                    {createButtonText}&nbsp;&nbsp;{
                                    createButtonText === "Creating Project..." ? (
                                        <Spinner size={6}/>) : (
                                        <></>
                                    )
                                }</button>
                            </div>
                        </section>
                    </section>
                </div>
            ) : (
                <div>
                    <Spinner/>
                </div>
            )
        } </>
    )
}
