import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Vector from "../assets/vector.png"
import AigenMarketplaceABI from '../../contract_abis/aigen_marketplace.json'
import {ethers} from "ethers";
import {provider} from "../../contract_abis/web3_obj.js";
import {useEffect, useState} from "react";
import {AIGEN_MARKETPLACE_CONTRACT_ADDRESS} from "../../config";
import ProjectCard from "../components/ProjectCard";

export default function Marketplace() {
    const [marketplaceItems, setMarketplaceItems] = useState([])
    const [marketplaceItemsFetched, setMarketplaceItemsFetched] = useState(false)

    useEffect(()=>{
        if(!marketplaceItemsFetched) {
            fetchListedAIProjects().then(r => {
                setMarketplaceItemsFetched(true)
            })
        }
    })
    async function fetchListedAIProjects() {
        let contract = new ethers.Contract(AIGEN_MARKETPLACE_CONTRACT_ADDRESS, AigenMarketplaceABI, provider);
        let marketplaceItems = await contract.fetchMarketplaceItems();
        let items = [];
        for(let i =0 ;i<marketplaceItems.length;i++){
            let marketplaceItem = marketplaceItems[i];
            items.push({
                tokenId: marketplaceItem.tokenId.toNumber(),
                projectId: marketplaceItem.projectId.toNumber(),
                price: ethers.utils.formatEther(marketplaceItem.price),
                seller: marketplaceItem.seller,
                itemId: marketplaceItem.itemId.toNumber(),
                owner: marketplaceItem.owner,
                nftContract: marketplaceItem.nftContract,
                sold: marketplaceItem.sold
            })
        }

        setMarketplaceItems(items)
    }

    return (
        <div className=" bg-marketplace-background-color ">
            <Navbar launchpad={true}/>
            <section className=" container-xl bg-marketplace-background bg-cover sm:bg-cover lg:bg-contain ">
                <section className="max-w-7xl mx-auto p-4 sm:p-0 grid grid-flow-row sm:grid-cols-2 py-16 sm:py-28 gap-y-3">
                    <div className="flex flex-col">
                        <p className=" font-proxima-nova font-bold text-5xl sm:text-7xl text-white mb-9 leading-[60px] sm:leading-[80px]"> <span className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent mx-2">Discover</span>, Trade ,  collect, and sell <span className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent mx-2">NFTs</span></p>
                        <p className=" text-marketplace-primary-color-lite text-xl leading-8">Digital AI NFT Marketplace For Crypto Collectibles And Non-Fungible Tokens. Buy, Sell, And Discover Exclusive Digital Assets.</p>
                    </div>
                    <div className="flex items-center justify-center py-6 sm:p-0">
                        <img src={Vector}></img>
                    </div>
                </section>

            </section>
            <section className="max-w-7xl  mx-auto relative -top-16 sm:-top-18 grid grid-flow-row lg:grid-cols-3 gap-4  sm:gap-7 p-4">


                <div class="bg-gradient-to-b from-[#3464c333] to-[#0084bccc] border-2 border-opacity-10 border-[#00C1ED1A] backdrop-blur-sm rounded-xl pl-6 pt-6 pr-8 pb-8">
                    <div className="flex items-center mb-5">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_bi_0_1)">
                                <rect width="72" height="72" rx="28" fill="url(#paint0_linear_0_1)" fill-opacity="0.2"/>
                                <rect x="0.5" y="0.5" width="71" height="71" rx="27.5" stroke="#00C1ED" stroke-opacity="0.1"/>
                            </g>
                            <g filter="url(#filter1_d_0_1)">
                                <path d="M53.3965 24.8571L36.6035 15.1616C36.2301 14.9461 35.77 14.9461 35.3965 15.1616L18.6035 24.8571C18.2301 25.0726 18 25.471 18 25.9022V45.2931C18 45.7242 18.23 46.1227 18.6035 46.3382L35.3965 56.0336C35.7699 56.2492 36.23 56.2492 36.6035 56.0336L53.3965 46.3382C53.7699 46.1227 54 45.7242 54 45.2931V25.9022C54 25.471 53.77 25.0726 53.3965 24.8571ZM28.4282 24.8399L35.3967 20.8169C35.77 20.6014 36.2301 20.6014 36.6035 20.8169L43.5719 24.8399C44.1492 25.1731 44.347 25.9112 44.0138 26.4885C43.6805 27.0658 42.9424 27.2636 42.3651 26.9303L36.0001 23.2556L29.6352 26.9302C29.0579 27.2635 28.3198 27.0657 27.9865 26.4884C27.6533 25.9112 27.8511 25.1731 28.4282 24.8399ZM38.3956 34.2993C39.0621 34.2993 39.6026 34.8396 39.6026 35.5062C39.6026 36.1729 39.0623 36.7132 38.3956 36.7132H36.0001V40.4253C36.0001 41.0918 35.4598 41.6322 34.7932 41.6322C34.1267 41.6322 33.5862 41.0919 33.5862 40.4253V30.7701C33.5862 30.1036 34.1266 29.5632 34.7932 29.5632H38.7065C39.373 29.5632 39.9134 30.1035 39.9134 30.7701C39.9134 31.4366 39.3731 31.9771 38.7065 31.9771H36.0001V34.2994H38.3956V34.2993ZM25.138 40.4253C25.138 41.0918 24.5977 41.6322 23.9311 41.6322C23.2644 41.6322 22.7241 41.0919 22.7241 40.4253V30.7881C22.7241 29.6042 24.2514 29.128 24.9241 30.1023L29.4567 36.6657L29.3998 30.7817C29.3934 30.1152 29.9286 29.5696 30.5951 29.5632C31.2616 29.5568 31.8072 30.0919 31.8136 30.7584L31.9039 40.1C31.9039 40.7505 31.5341 41.2864 30.9617 41.4653C30.4008 41.6403 29.8093 41.4227 29.4545 40.9104L25.138 34.6598V40.4253ZM43.5721 46.3554L36.6036 50.3784C36.2303 50.5939 35.7702 50.5939 35.3968 50.3784L28.4283 46.3554C27.8511 46.0222 27.6533 45.2841 27.9865 44.7068C28.3198 44.1295 29.0579 43.9317 29.6352 44.2649L36.0001 47.9397L42.3651 44.2651C42.9424 43.9318 43.6805 44.1296 44.0138 44.7069C44.347 45.284 44.1492 46.0222 43.5721 46.3554ZM48.0692 31.9769H46.5991V40.4253C46.5991 41.0918 46.0588 41.6322 45.3922 41.6322C44.7255 41.6322 44.1852 41.0919 44.1852 40.4253V31.9769H42.7368C42.0703 31.9769 41.5299 31.4366 41.5299 30.77C41.5299 30.1035 42.0702 29.563 42.7368 29.563H48.0689C48.7354 29.563 49.2759 30.1034 49.2759 30.77C49.276 31.4366 48.7357 31.9769 48.0692 31.9769Z" fill="#00C1ED"/>
                            </g>
                            <defs>
                                <filter id="filter0_bi_0_1" x="-50" y="-50" width="172" height="172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="15"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1"/>
                                </filter>
                                <filter id="filter1_d_0_1" x="3" y="0" width="66" height="71.1953" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="7.5"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.756863 0 0 0 0 0.929412 0 0 0 1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                <linearGradient id="paint0_linear_0_1" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#3358A3"/>
                                    <stop offset="1" stop-color="#00C1ED"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <p className=" text-2xl font-proxima-nova font-bold ml-5 text-white">High Quality NFTs</p>

                    </div>
                    <p className=" text-marketplace-primary-color-lite">Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis nostrud exercit</p>
                </div>
                <div class="bg-gradient-to-b from-[#3464c333]  to-[#EF730080] border-2 border-opacity-10 border-[#00C1ED1A]  backdrop-blur-sm rounded-xl pl-6 pt-6 pr-8 pb-8">
                    <div className="flex items-center mb-5">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_bi_0_1)">
                                <rect width="72" height="72" rx="28" fill="url(#paint0_linear_0_1)" fill-opacity="0.2"/>
                                <rect x="0.5" y="0.5" width="71" height="71" rx="27.5" stroke="#00C1ED" stroke-opacity="0.1"/>
                            </g>
                            <g filter="url(#filter1_b_0_1)">
                                <path d="M36 17C36 17 26 21 20 21V39C20 45 36 55 36 55C36 55 52 45 52 39V21C46 21 36 17 36 17Z" fill="#FE9737" fill-opacity="0.7"/>
                            </g>
                            <g filter="url(#filter2_d_0_1)">
                                <path d="M36 56.9999C35.6251 57 35.2578 56.8947 34.94 56.6959C32.0995 54.8842 29.3616 52.9166 26.7388 50.8021C20.8585 46.0249 18 42.1639 18 38.9999V20.9999C18 20.4694 18.2107 19.9607 18.5858 19.5857C18.9609 19.2106 19.4696 18.9999 20 18.9999C25.55 18.9999 35.161 15.1816 35.2572 15.1429C35.734 14.9524 36.2657 14.9524 36.7425 15.1429C36.839 15.1814 46.4587 18.9999 52 18.9999C52.5304 18.9999 53.0391 19.2106 53.4142 19.5857C53.7893 19.9607 54 20.4694 54 20.9999V38.9999C54 42.1639 51.1415 46.0249 45.2612 50.8021C42.6384 52.9166 39.9005 54.8842 37.06 56.6959C36.7422 56.8947 36.3749 57 36 56.9999ZM22 22.8876V38.9999C22 39.6561 22.5237 42.2234 29.2612 47.6976C31.9112 49.8511 34.5815 51.6794 36.0068 52.6214C42.0105 48.6984 50 42.1416 50 38.9999V22.8876C44.775 22.3441 38.2 19.9799 36 19.1446C33.8 19.9799 27.2263 22.3441 22 22.8876Z" fill="#FE9737"/>
                            </g>
                            <path d="M35.9325 39.6124C35.602 39.6124 35.2761 39.5353 34.9807 39.387L30.7188 37.256L32.6249 33.4442L35.2042 34.7337L38.4228 29.9062L41.9687 32.2703L37.7068 38.6633C37.5121 38.9554 37.2482 39.1948 36.9387 39.3604C36.6292 39.526 36.2835 39.6125 35.9325 39.6124Z" fill="#FE9737"/>
                            <defs>
                                <filter id="filter0_bi_0_1" x="-50" y="-50" width="172" height="172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="15"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1"/>
                                </filter>
                                <filter id="filter1_b_0_1" x="5" y="2" width="62" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="7.5"/>
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape"/>
                                </filter>
                                <filter id="filter2_d_0_1" x="3" y="0" width="66" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="7.5"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.995833 0 0 0 0 0.590197 0 0 0 0 0.215764 0 0 0 1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                <linearGradient id="paint0_linear_0_1" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#3358A3"/>
                                    <stop offset="1" stop-color="#FE9737"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        <p className=" text-2xl font-proxima-nova font-bold ml-5 text-white">Secure Transaction</p>

                    </div>
                    <p className=" text-marketplace-primary-color-lite">Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis nostrud exercit</p>
                </div>
                <div class="bg-gradient-to-b from-[#3464c333] to-[#00BC8F80] border-2 border-opacity-10 border-[#00C1ED1A] backdrop-blur-sm rounded-xl pl-6 pt-6 pr-8 pb-8">
                    <div className="flex items-center mb-5">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_bi_0_1)">
                                <rect width="72" height="72" rx="28" fill="url(#paint0_linear_0_1)" fill-opacity="0.2"/>
                                <rect x="0.5" y="0.5" width="71" height="71" rx="27.5" stroke="#00C1ED" stroke-opacity="0.1"/>
                            </g>
                            <g filter="url(#filter1_d_0_1)">
                                <path d="M38.1177 26.5337C38.1177 25.3311 37.1395 24.3529 35.936 24.3529C34.8027 24.3529 33.8824 25.2743 33.8824 26.4075V28.5883H38.1177V26.5337ZM31.7648 34.9412C31.7648 37.277 33.6652 39.1765 36 39.1765C38.3348 39.1765 40.2352 37.277 40.2352 34.9412V30.7059H31.7646L31.7648 34.9412ZM34.9412 33.8823C34.9412 33.297 35.4148 32.8235 36 32.8235C36.5852 32.8235 37.0588 33.2971 37.0588 33.8823V36C37.0588 36.5853 36.5852 37.0588 36 37.0588C35.4148 37.0588 34.9412 36.5852 34.9412 36V33.8823ZM48.7059 18H21.1765C19.4249 18 18 19.4249 18 21.1765V42.3529C18 44.1045 19.4249 45.5294 21.1765 45.5294H50.8235C52.5751 45.5294 54 44.1045 54 42.3529V23.2941C54 20.3752 51.6259 18 48.7059 18ZM42.3529 34.9412C42.3529 38.4444 39.5032 41.2941 36 41.2941C32.4968 41.2941 29.6471 38.4444 29.6471 34.9412V29.6471C29.6471 29.0619 30.1207 28.5883 30.706 28.5883H31.7648V26.4075C31.7648 24.1069 33.6363 22.2354 35.9359 22.2354C38.3058 22.2354 40.2352 24.1637 40.2352 26.5338V28.5884H41.294C41.8793 28.5884 42.3529 29.062 42.3529 29.6472V34.9412ZM44.4706 51.8823H41.2941V47.647H30.706V51.8823H27.5295C26.9443 51.8823 26.4707 52.3559 26.4707 52.9411C26.4707 53.5263 26.9443 53.9999 27.5295 53.9999C27.9137 53.9999 44.6847 53.9999 44.4707 53.9999C45.0559 53.9999 45.5295 53.5263 45.5295 52.9411C45.5295 52.3559 45.0558 51.8823 44.4706 51.8823Z" fill="#0BBB91"/>
                            </g>
                            <defs>
                                <filter id="filter0_bi_0_1" x="-50" y="-50" width="172" height="172" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="25"/>
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="15"/>
                                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                                    <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1"/>
                                </filter>
                                <filter id="filter1_d_0_1" x="3" y="3" width="66" height="66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="7.5"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.7375 0 0 0 0 0.5605 0 0 0 1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
                                </filter>
                                <linearGradient id="paint0_linear_0_1" x1="36" y1="0" x2="36" y2="72" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#3358A3"/>
                                    <stop offset="1" stop-color="#00BC8F"/>
                                </linearGradient>
                            </defs>
                        </svg>

                        <p className=" text-2xl font-proxima-nova font-bold ml-5 text-white">Privacy Protected</p>

                    </div>
                    <p className=" text-marketplace-primary-color-lite">Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis nostrud exercit</p>
                </div>

            </section>
            <section className="max-w-7xl mx-auto flex flex-col p-4 sm:p-0 my-12 sm:my-24">
                <div className="flex flex-col mb-12 ">
                    <p className="text-3xl sm:text-5xl text-white font-proxima-nova font-bold mb-6">Hand Picked Amazing NFTs</p>
                    <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4 sm:gap-0">
                        <p className=" text-marketplace-primary-color-lite">Sed ut perspiciatis unde omnis iste natus enim ad minim veniam, quis nostrud exercit</p>
                        <div className="px-6 py-2 flex items-center rounded-xl border border-[#404580] ">
                            <p className="pr-3 text-marketplace-primary-color-lite">View all</p>
                            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7071 8.7071C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928931C13.9526 0.538407 13.3195 0.538407 12.9289 0.928931C12.5384 1.31946 12.5384 1.95262 12.9289 2.34314L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.7071ZM8.74227e-08 9L20 9L20 7L-8.74227e-08 7L8.74227e-08 9Z" fill="#BDC9E0"/>
                            </svg>

                        </div>

                    </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row sm:gap-7 gap-4 mb-14">
                    {
                        marketplaceItemsFetched?
                        marketplaceItems.map((marketplaceItem) =>{
                            return <ProjectCard marketplaceItem={marketplaceItem}/>
                        })
                            :(<div>Loading</div>)
                    }
                </div>
                <div className="flex justify-center">
                    <div className="px-6 py-2 flex items-center rounded-xl border border-[#404580] ">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.4123 0.389446C14.3923 0.301317 14.3488 0.220251 14.2865 0.154867C14.2241 0.0894831 14.1452 0.0422255 14.0581 0.0181193C13.971 -0.00598697 13.879 -0.00604059 13.7919 0.0179641C13.7047 0.0419688 13.6258 0.0891344 13.5633 0.154446L12.0753 1.71345C10.7605 0.863132 9.21234 0.446025 7.6483 0.520705C6.08426 0.595385 4.5829 1.1581 3.35507 2.12982C2.12725 3.10154 1.23464 4.43345 0.802614 5.9385C0.370586 7.44354 0.42084 9.0461 0.946319 10.5211C1.4718 11.9961 2.4461 13.2695 3.7324 14.1624C5.0187 15.0553 6.55237 15.5228 8.11801 15.4993C9.68366 15.4759 11.2026 14.9626 12.4616 14.0316C13.7206 13.1005 14.6563 11.7985 15.1373 10.3084C15.2037 10.0609 15.1726 9.79725 15.0502 9.572C14.9279 9.34675 14.7237 9.17708 14.4799 9.09803C14.236 9.01898 13.9712 9.03657 13.7399 9.14719C13.5087 9.25781 13.3288 9.45299 13.2373 9.69245C12.8907 10.7751 12.218 11.7241 11.3112 12.4095C10.4043 13.095 9.30781 13.4834 8.17172 13.5215C7.03562 13.5596 5.91552 13.2456 4.96479 12.6225C4.01406 11.9994 3.27918 11.0976 2.8608 10.0407C2.44241 8.98376 2.36098 7.82333 2.62764 6.71832C2.8943 5.6133 3.49602 4.61774 4.3504 3.86794C5.20478 3.11815 6.27005 2.65079 7.40033 2.52987C8.53062 2.40894 9.67065 2.64037 10.6643 3.19245L9.06431 4.87245C9.00207 4.93752 8.95855 5.0182 8.93837 5.10596C8.91818 5.19372 8.92207 5.2853 8.94962 5.37103C8.97718 5.45676 9.02737 5.53346 9.09491 5.59303C9.16244 5.65259 9.24481 5.69282 9.33331 5.70945L15.1573 6.80045C15.1876 6.80641 15.2184 6.80943 15.2493 6.80945C15.3245 6.8094 15.3986 6.79242 15.4663 6.75975C15.534 6.72709 15.5935 6.67959 15.6403 6.62078C15.6871 6.56197 15.72 6.49337 15.7366 6.42008C15.7533 6.34679 15.7531 6.27069 15.7363 6.19745L14.4123 0.389446Z" fill="#BDC9E0"/>
                        </svg>

                        <p className="pl-3 text-marketplace-primary-color-lite">Load More</p>


                    </div>
                </div>
            </section>
            <section className="flex flex-col items-center  bg-blue-500 bg-opacity-50 shadow-md backdrop-blur-10 py-24 px-4 lg:px-0 bg-marketplace-banner bg-cover">
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold font-proxima-nova text-white mb-4 sm:mb-6 lg:mb-8 text-center">Start
                    <span className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent mx-4">AI NFTs</span>
                    With
                    <span className="bg-gradient-to-r from-[#00C1ED] to-[#3464C3] bg-clip-text text-transparent mx-4">Aigen</span>
                </p>
                <p className=" text-marketplace-primary-color-lite text-xl  max-w-lg mb-8 sm:mb-10 lg:mb-12 text-center leading-8">It never hurts to talk - and who knows what great things will emerge from a friendly conversation.</p>
                <div className="rounded-xl px-16 py-4 bg-gradient-to-br from-red-500 to-yellow-400 text-white">Contact Us</div>
            </section>
            
            <Footer/>

        </div>
    )
}
