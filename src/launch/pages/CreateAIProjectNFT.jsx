import React, {useEffect, useRef, useState} from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import {AIGENML_SERVER_URL} from '../../config'
import Spinner from "../components/Spinner";
import {useAccount} from "wagmi";
import {createSearchParams, redirect, useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProjectStatusModal from "../components/ProjectStatusModal";
import {
    fetchNFTMetadata,
    getRevision,
    launchpad_contract,
    makeNextRevision,
    uploadAIProjectMetadata
} from "../../contract_abis/web3_obj";

const inputStyles = {
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
    margin: 0
};

export default function CreateAINFTProjectNFT(props) {
    const {
        isConnected,
        isDisconnected
    } = useAccount()
    const navigate = useNavigate();
    const [aiNFTProjectPrice, setAINFTProjectPrice] = useState(null)
    const [aiNFTPrice, setAINFTPrice] = useState(null)
    const [noOfAINFT, setNoOfAINFT] = useState(0)
    const [uploadedFileName, setUploadedFileName] = useState('.h5(Keras only)')
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [pollingState, setPollingState] = useState(false);
    const [project, setProject] = useState();
    const [uploadingModal, setUploadingModal] = useState(false);
    const fileInputRef = useRef(null);

    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Usage
    const id = getParameterByName('id');
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
            }
        }
    }, [isConnected, isDisconnected])

    function handleNoOfAINFTChange(event) { // 👇 Get input value from "event"
        console.log(event.target.value)
        setNoOfAINFT(event.target.value)
    }

    function handleAINFTProjectPriceChange(event) { // 👇 Get input value from "event"
        console.log(event.target.value)
        setAINFTProjectPrice(event.target.value)
    }

    function handleAINFTPriceChange(event) { // 👇 Get input value from "event"
        console.log(event.target.value)
        setAINFTPrice(event.target.value)
    }

    const handleChooseUploadFile = () => {
        fileInputRef.current.click();
    };

    const handleChooseUploadFileChange = (event) => {
        const file = event.target.files[0];
        const fileName = file.name;
        setUploadedFileName(fileName)
    };

    const handleUploadedFileDelete = () => {
        setUploadedFileName('.h5(Keras only)');
        fileInputRef.current.value = null;
    };

    async function uploadModal() {
        let fileInputField = fileInputRef.current;
        if (fileInputField.files.length === 0) {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Please select the AI model file!'})
            return;
        }

        if (noOfAINFT <= 0 || noOfAINFT === "") {
            Swal.fire({icon: 'error', title: 'Oops...', text: 'Please provide the number of AINFTs to create!'})
            return;
        }

        setUploadingModal(true);
        const formData = new FormData();

        // Append each file to the formData
        formData.append('no_of_ainfts', noOfAINFT);
        formData.append('project_id', id)
        formData.append('project_name', project.name)

        // Append each file to the formData
        formData.append('model_file', fileInputField.files[0]);
        setShowStatusModal("creating");
        axios.post(AIGENML_SERVER_URL + '/project/shards', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async function (response) {

            if (response.data.status === "success") {
                setPollingState(true);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message + ". Enter different project name"
                })
                setUploadingModal(false)
                console.log(response.data)
            }
        }).catch(function (error) {
            console.log(error);
            setUploadingModal(false)
            Swal.fire({icon: 'error', title: 'Oops...', text: error})
        })
    }

    async function checkShardsCreationStatus() {
        axios.get(AIGENML_SERVER_URL + '/project/job/status', {
            params: {
                project_id: id
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async function (response) {
            console.log(response.data.job_status)
            if (response.data.status === "success") {
                if (response.data.job_status === "finished") {
                    setPollingState(false);
                    const metadata = {
                        name: project.name,
                        description: project.description,
                        logo_uri: project.logo,
                        banner_uri: project.banner,
                        status: "Model Saved",
                        project_price: aiNFTProjectPrice,
                        no_of_ainfts: noOfAINFT,
                        owner: project.owner
                    };
                    let nextValue = await uploadAIProjectMetadata(metadata);
                    let revision = await makeNextRevision(project, nextValue);
                    if (revision) {
                        setUploadingModal(false)
                        setShowStatusModal("success")
                    } else {
                        setUploadingModal(false)
                        setShowStatusModal("failed")
                    }
                } else if (response.data.job_status === "failed") {
                    console.log("failed")
                }
            } else {
                Swal.fire({icon: 'error', title: 'Oops...', text: response.data.message})
                setUploadingModal(false)
            }
        }).catch(function (error) {
            console.log(error);
            setUploadingModal(false)
            Swal.fire({icon: 'error', title: 'Oops...', text: error})
        })
    }

    useEffect(() => {
        async function getProjectById(id) {
            let project = await launchpad_contract.getProjectById(id);

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
            setProject(project_data)
        }

        getProjectById(id).then(r => {
        });
    }, [id])


    useEffect(() => {
        let intervalId;

        if (pollingState) {
            intervalId = setInterval(() => {
                checkShardsCreationStatus().then(r => {
                });
            }, 10000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [pollingState]);

    function goToHome() {
        navigate("/projects")
    }

    return (
        <> {
            isConnected ? (
                <div className="container-xl bg-marketplace-background-color min-h-screen">
                    <Navbar/>
                    {
                        showStatusModal && <ProjectStatusModal status={showStatusModal} id={id}/>
                    }
                    <section className="max-w-7xl mx-auto flex flex-col">
                        <div className="flex flex-col mt-6 mb-6 sm:mb-8">
                            <p className=" text-marketplace-primary-color-lite flex items-center cursor-pointer pl-4">
                                <span onClick={goToHome} className="flex justify-start items-center">
                                    <svg className="mr-2" width="7" height="11" viewBox="0 0 7 11" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.99979 11.0006C4.73459 11.0005 4.48028 10.8951 4.29279 10.7076L0.292787 6.70757C0.105316 6.52004 0 6.26573 0 6.00057C0 5.7354 0.105316 5.4811 0.292787 5.29357L4.29279 1.29357C4.38503 1.19806 4.49538 1.12188 4.61738 1.06947C4.73939 1.01706 4.87061 0.989473 5.00339 0.988319C5.13616 0.987165 5.26784 1.01247 5.39074 1.06275C5.51364 1.11303 5.62529 1.18728 5.71918 1.28117C5.81307 1.37507 5.88733 1.48672 5.93761 1.60962C5.98789 1.73251 6.01319 1.86419 6.01204 1.99697C6.01088 2.12975 5.9833 2.26097 5.93089 2.38297C5.87848 2.50498 5.8023 2.61532 5.70679 2.70757L2.41379 6.00057L5.70679 9.29357C5.8466 9.43342 5.9418 9.61159 5.98037 9.80554C6.01894 9.99949 5.99914 10.2005 5.92346 10.3832C5.84779 10.5659 5.71965 10.7221 5.55524 10.832C5.39083 10.9419 5.19754 11.0005 4.99979 11.0006Z"
                                            fill="#BDC9E0"/>
                                    </svg>
                                    Home
                                </span>
                            </p>
                        </div>
                    </section>
                    <section className="max-w-4xl mx-auto p-4 pt-0 flex flex-col">
                        <div className="flex flex-col justify-center items-center mb-12 sm:mb-14">
                            <p className=" text-white font-bold text-4xl ">Upload AI Model File</p>
                        </div>
                        <section
                            className=" grid grid-flow-row gap-y-4 bg-aigen-background-color-shade-4 p-12 rounded-xl w-[92vw] sm:w-full ">
                            <section>
                                <div>
                                    <p className="mb-4 text-marketplace-primary-color-lite">Upload File *</p>
                                    <div
                                        className="bg-marketplace-background-color border border-input-border-primary-color flex items-center justify-between">
                                        <div
                                            className="bg-marketplace-background-color text-marketplace-primary-color-lite px-4 py-3 w-full rounded flex items-center justify-between focus:border-[#00C1ED]">
                                            <p id="uploaded_file_name">
                                                {uploadedFileName}</p>
                                            {
                                                uploadedFileName === '.h5(Keras)' ? (
                                                    <></>
                                                ) : (
                                                    <div onClick={handleUploadedFileDelete}
                                                         className=" cursor-pointer">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M13.7 0.3C13.3 -0.1 12.7 -0.1 12.3 0.3L7 5.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L5.6 7L0.3 12.3C-0.1 12.7 -0.1 13.3 0.3 13.7C0.5 13.9 0.7 14 1 14C1.3 14 1.5 13.9 1.7 13.7L7 8.4L12.3 13.7C12.5 13.9 12.8 14 13 14C13.2 14 13.5 13.9 13.7 13.7C14.1 13.3 14.1 12.7 13.7 12.3L8.4 7L13.7 1.7C14.1 1.3 14.1 0.7 13.7 0.3Z"
                                                                fill="#7279CC"/>
                                                        </svg>
                                                    </div>
                                                )
                                            } </div>
                                        <div
                                            className="border cursor-pointer border-input-border-primary-color rounded bg-[#0F154E] px-2 py-1 m-2 text-marketplace-primary-color-lite text-center text-sm min-w-fit max-w-fit sm:text-base"
                                            onClick={handleChooseUploadFile}>
                                            Choose File
                                        </div>
                                        <input type="file"
                                               ref={fileInputRef}
                                               id="file_input"
                                               onChange={handleChooseUploadFileChange}
                                               style={
                                                   {display: 'none'}
                                               }/>
                                    </div>
                                </div>
                                <div>
                                    <p className="my-4 text-marketplace-primary-color-lite">Number of AINFTs *</p>
                                    <input
                                        className=" bg-marketplace-background-color border text-marketplace-primary-color-lite border-input-border-primary-color px-4 py-3 w-full rounded placeholder:text-marketplace-primary-color-lite focus:border-[#00C1ED]"
                                        placeholder="ex. 10"
                                        value={noOfAINFT}
                                        onChange={handleNoOfAINFTChange}
                                        type="number"></input>
                                </div>
                                <div className="flex items-end w-full mb-12 mt-4">
                                    <div className="w-full">
                                        <p className="mb-4 text-marketplace-primary-color-lite">Project Price
                                            (Optional)</p>
                                        <input
                                            className=" bg-marketplace-background-color border  text-marketplace-primary-color-lite w-full border-input-border-primary-color px-4 py-3 rounded placeholder:text-marketplace-primary-color-lite focus:border-[#00C1ED]"
                                            placeholder="ex. $100"
                                            value={aiNFTProjectPrice}
                                            onChange={handleAINFTProjectPriceChange}
                                            type="number"
                                            style={inputStyles}
                                            step={0.1}></input>
                                    </div>
                                </div>
                                <div className=" flex justify-end gap-5">
                                    <button
                                        onClick={()=>{navigate("/projects")}}
                                        className="text-white rounded-xl border border-[#3B3F6A] px-8 py-2 flex items-center">
                                        Cancel
                                    </button>
                                    <button disabled={uploadingModal}
                                            className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-8 py-2 flex items-center text-xs sm:text-base"
                                            onClick={uploadModal}>

                                        {
                                            uploadingModal ? <span className=" flex items-center gap-x-2">
                                            Uploading Modal ..
                                            <Spinner size={6}/></span> : 'Upload AI Model'
                                        } </button>
                                </div>
                            </section>

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
