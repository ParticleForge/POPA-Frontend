import AigenLogo from '../../assets/aigen-logo-light.svg'
import Vector from "../assets/vector.png"
import LaunchingGraphic from "../assets/launching-img.svg"
import ImageLaunch from "../assets/img-launch.svg"
import CircleShade from "../assets/circle-shade.svg"
import {useState} from 'react'
import axios from 'axios';

import Footer from "../../components/Footer";


export default function LandingPage() {
    const [userEmail, setUserEmail] = useState();
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [modalMessage, setModalMessage] = useState();

    function validateEmail(em) {
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(em)) {
            document.getElementById("invalidEmail").innerHTML = '';
            return true
        } else {
            document.getElementById("invalidEmail").innerHTML = 'Invalid email';
            document.getElementById("invalidEmail").style.color = "red";
            return false;
        }
    }

    function handelEmail() {
        const url = 'https://server.aigenprotocol.com/register';

        let formData = new FormData();
        if (validateEmail(userEmail)) {
            formData.append('user_email', userEmail)
        } else {
            return;
        }

        axios.post(url, formData, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            if (response.data.status === "success") {
                setShowStatusModal(true);
            } else {
                document.getElementById("invalidEmail").innerHTML = response.data.message;
                document.getElementById("invalidEmail").style.color = "red";
            }
        }).catch(error => {
            console.error('Error:', error);
            document.getElementById("invalidEmail").innerHTML = 'Oops! Cannot register your email!';
            document.getElementById("invalidEmail").style.color = "red";
        });
    }

    return (
        <div> {
            showStatusModal &&
            <div className="fixed inset-0 backdrop-blur-sm w-full h-full flex justify-center items-center">

                <div
                    className="relative  max-w-[34rem] mx-auto bg-aigen-background-color-shade-4 border border-[#00C1ED] border-opacity-50 p-8 rounded-xl text-white">
                    <section className=' flex items-center gap-x-10 gap-y-8 flex-col justify-center sm:flex-row'>
                        <div>
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_bi_0_1)">
                                    <rect x="2" y="2" width="36" height="36" rx="18" fill="url(#paint0_linear_0_1)"
                                          fill-opacity="0.05"/>
                                    <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED"
                                          stroke-opacity="0.1" stroke-width="2"/>
                                    <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED"
                                          stroke-opacity="0.1" stroke-width="2"/>
                                </g>
                                <rect x="6" y="6" width="28" height="28" rx="14" fill="#0BBB91"/>
                                <g clip-path="url(#clip0_0_1)">
                                    <path
                                        d="M25.3 18H21V14C21 12.5 20.2 12 19 12C18.7 12 18.4 12.2 18.4 12.5C18.4 12.5 16.1 20 16 20V28H24.6C25.9 28 27 27 27.2 25.7L28 21.1C28.1 20.3 27.9 19.5 27.4 19C26.9 18.3 26.1 18 25.3 18Z"
                                        fill="#151A4E"/>
                                    <path d="M12 21V27C12 27.552 12.448 28 13 28H14V20H13C12.448 20 12 20.448 12 21Z"
                                          fill="#151A4E"/>
                                </g>
                                <defs>
                                    <filter id="filter0_bi_0_1" x="-10" y="-10" width="60" height="60"
                                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                                        <feComposite in2="SourceAlpha" operator="in"
                                                     result="effect1_backgroundBlur_0_1"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1"
                                                 result="shape"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                       result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="2.5"/>
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                        <feColorMatrix type="matrix"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1"/>
                                    </filter>
                                    <linearGradient id="paint0_linear_0_1" x1="20" y1="2" x2="20" y2="38"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#3358A3"/>
                                        <stop offset="1" stop-color="#00C1ED"/>
                                    </linearGradient>
                                    <clipPath id="clip0_0_1">
                                        <rect width="16" height="16" fill="white" transform="translate(12 12)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className=' flex flex-col  items-center sm:items-start'>
                            <p className=' text-3xl font-proxima-nova mb-6 font-semibold'>Thank You!</p>
                            <p className=' text-sm text-center sm:text-start mb-11 max-w-[16rem] sm:max-w-xl'>We’re glad
                                you’re interested in Aigen! We’ll let you know when we launch.</p>
                            <div className=' flex justify-center sm:justify-end w-full'>
                                <button type="button"
                                        onClick={
                                            () => setShowStatusModal(false)
                                        }
                                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-md text-sm px-5 py-2 text-center w-36 mr-1.5">
                                    Got it
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        }

            <div className=" bg-marketplace-background-color  min-h-screen ">
                <section className=" max-w-8xl mx-auto p-4 sm:p-6">
                    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
                        <a href="/" className="flex items-center">
                            <img src={AigenLogo}
                                 className=" h-10 rounded"
                                 alt="Aigen Logo"/>
                        </a>
                    </div>
                    <section
                        className="max-w-8xl mx-auto p-4 sm:p-0 grid grid-flow-row sm:grid-cols-2  py-16 sm:py-28 gap-y-3 sm:items-center ">
                        <div className="flex flex-col order-2 sm:order-1 mt-8">
                            <div className=" flex items-center mb-7">
                                <svg width="39" height="3" viewBox="0 0 39 3" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1.5H38.5" stroke="#FEB48C" stroke-width="2"/>
                                </svg>
                                <p className=" text-[#FFBB32] mx-3 font-proxima-nova font-bold text-3xl">Coming Soon</p>
                            </div>
                            <p className="font-proxima-nova font-bold text-4xl sm:text-7xl text-start text-white mb-9 leading-[60px] sm:leading-[68px]">
                                <span>Futuristic</span>
                                <span
                                    className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent ml-4">AI NFT</span><br/>
                                <span
                                    className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent mr-4">Create</span>
                                <span className="">Effortlessly</span>
                            </p>

                            <div className=" flex flex-col gap-y-4 mb-12">
                                <div className=" flex items-center gap-x-4">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.6337 8.38375L9.63375 13.3837C9.39 13.6275 9.07 13.75 8.75 13.75C8.43 13.75 8.11 13.6275 7.86625 13.3837L5.36625 10.8837C4.8775 10.395 4.8775 9.605 5.36625 9.11625C5.855 8.6275 6.645 8.6275 7.13375 9.11625L8.75 10.7325L12.8663 6.61625C13.355 6.1275 14.145 6.1275 14.6337 6.61625C15.1225 7.105 15.1225 7.895 14.6337 8.38375Z"
                                            fill="#2D71C8"/>
                                    </svg>
                                    <p className="text-xl leading-6">Innovative Fractional NFTs</p>

                                </div>
                                <div className=" flex items-center gap-x-4">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.6337 8.38375L9.63375 13.3837C9.39 13.6275 9.07 13.75 8.75 13.75C8.43 13.75 8.11 13.6275 7.86625 13.3837L5.36625 10.8837C4.8775 10.395 4.8775 9.605 5.36625 9.11625C5.855 8.6275 6.645 8.6275 7.13375 9.11625L8.75 10.7325L12.8663 6.61625C13.355 6.1275 14.145 6.1275 14.6337 6.61625C15.1225 7.105 15.1225 7.895 14.6337 8.38375Z"
                                            fill="#2D71C8"/>
                                    </svg>
                                    <p className=" text-xl leading-6">Increase Authenticity and Traceability</p>

                                </div>
                                <div className=" flex items-center gap-x-4">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM14.6337 8.38375L9.63375 13.3837C9.39 13.6275 9.07 13.75 8.75 13.75C8.43 13.75 8.11 13.6275 7.86625 13.3837L5.36625 10.8837C4.8775 10.395 4.8775 9.605 5.36625 9.11625C5.855 8.6275 6.645 8.6275 7.13375 9.11625L8.75 10.7325L12.8663 6.61625C13.355 6.1275 14.145 6.1275 14.6337 6.61625C15.1225 7.105 15.1225 7.895 14.6337 8.38375Z"
                                            fill="#2D71C8"/>
                                    </svg>
                                    <p className=" text-xl leading-6">Additional Revenue Streams</p>
                                </div>
                            </div>
                            <div className=' flex flex-col gap-y-6'>
                                <p className=' text-lg text-start'>Get Notified When We Launch</p>
                                <div
                                    className=' flex items-center border border-[#7A8DAE] rounded-md max-w-lg justify-between'>
                                    <input className='outline-none bg-transparent p-3 w-full'
                                           placeholder='Enter your email address'
                                           onChange={
                                               (e) => setUserEmail(e.target.value)
                                           }></input>

                                    <button type="button"
                                            onClick={
                                                () => handelEmail()
                                            }
                                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-md text-sm px-5 py-2 text-center w-36 mr-1.5">
                                        Notify Me
                                    </button>
                                </div>
                                <div id="invalidEmail"></div>
                                <p className='text-base text-start'>*Don't worry we will not spam you :)</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end sm:p-0 order-1 sm:order-2">
                            <img src={ImageLaunch}></img>
                        </div>
                    </section>
                </section>
            </div>
            <Footer/>
        </div>
    )
}
