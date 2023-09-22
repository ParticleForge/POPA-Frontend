import React from "react";
import Navbar from "../../components/Navbar";
import CloseIcon from "../assets/CloseIcon.png"
import InfoIcon from "../assets/InfoIcon.png"
export default function BuyNFTModal(props) {
    return (
        <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full flex justify-center items-center">
            <div className="relative w-1/3 mx-auto bg-aigen-background-color-shade-4 border-2 border-blue-bikini border-opacity-50 p-12 rounded-lg text-white">
                <h1 className="text-3xl">Buy NFT</h1>
                <div className="mt-12">
                    <label htmlFor="total_nfts_to_buy" className="block mb-4 text-sm font-medium">Number of NFTs to buy*</label>
                    <input type="text" id="total_nfts_to_buy" className="bg-aigen-background-color border border-input-border-primary-color
                                                    text-white text-sm rounded-lg block w-full p-2.5" placeholder="Ex. 50" required/>
                </div>

                <div className="text-sm text-green-400 mt-4 flex justify-start gap-2 items-center">
                    <img src={InfoIcon}
                        alt="info icon"
                        className="w-4 h-4"/>
                    <span>Available Number of NFTs to Buy 2000</span>
                </div>

                <div className="my-8 h-0.5 bg-gradient-to-r from-blue-shade1 to-blue-shade2"/>

                <div className="flex justify-between items-center mb-8">
                    <span className="text-marketplace-primary-color-lite text-sm">Price per NFT</span>
                    <span className="text-base">0.0003 ETH</span>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className=" flex items-center gap-x-2">
                        <span className="text-marketplace-primary-color-lite text-sm">Total price
                        </span>
                        <svg className=" cursor-pointer" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_212_172)">
                                <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346625 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9937 5.88022 15.1488 3.84906 13.6499 2.35014C12.1509 0.851219 10.1198 0.00633091 8 0ZM8 14C6.81332 14 5.65328 13.6481 4.66658 12.9888C3.67989 12.3295 2.91085 11.3925 2.45673 10.2961C2.0026 9.19974 1.88378 7.99334 2.11529 6.82946C2.3468 5.66557 2.91825 4.59647 3.75736 3.75736C4.59648 2.91824 5.66558 2.3468 6.82946 2.11529C7.99335 1.88378 9.19975 2.0026 10.2961 2.45672C11.3925 2.91085 12.3295 3.67988 12.9888 4.66658C13.6481 5.65327 14 6.81331 14 8C13.9953 9.58984 13.3616 11.1132 12.2374 12.2374C11.1132 13.3616 9.58984 13.9953 8 14Z" fill="#BDC9E0"/>
                                <path d="M8.5 7H7.5C7.22386 7 7 7.22386 7 7.5V11.5C7 11.7761 7.22386 12 7.5 12H8.5C8.77614 12 9 11.7761 9 11.5V7.5C9 7.22386 8.77614 7 8.5 7Z" fill="#BDC9E0"/>
                                <path d="M8 6C8.55228 6 9 5.55228 9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5C7 5.55228 7.44772 6 8 6Z" fill="#BDC9E0"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_212_172">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        

                    </div>
                    <span className="text-base underline decoration-dotted">0.0003 ETH</span>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="bg-gradient-to-b from-blue-shade1 to-blue-shade2 py-2 px-16 mt-12
                                                        text-base text-white rounded-lg"
                        onClick={
                            () => {}
                    }>Buy NFT
                    </button>
                </div>

                <span className="absolute top-5 right-5 cursor-pointer p-2"
                    onClick={
                        () => {
                            props.toggleBuyNFTModal(false)
                        }
                }>
                    <img className="w-2"
                        src={CloseIcon}
                        alt="close icon"/>
                </span>

            </div>
        </div>
    )
}
