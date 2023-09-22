import React from "react";

export default function ProjectStatusModal({status, id}) {
    return (
        <div
            className="absolute w-1/3 max-w-xl bottom-12 right-8 bg-aigen-background-color-shade-4 border-2 border-blue-bikini border-opacity-50 p-8 rounded-lg text-white flex items-center gap-x-9 z-50">
            {
                status === 'creating' &&
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_bi_320_108)">
                        <rect x="2" y="2" width="36" height="36" rx="18" fill="url(#paint0_linear_320_108)"
                              fill-opacity="0.05"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                    </g>
                    <rect x="6" y="6" width="28" height="28" rx="14" fill="#3464C3"/>
                    <path d="M20 28V16" stroke="#353A6B" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M26 20L20 14L14 20" stroke="#353A6B" stroke-width="2" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                        <filter id="filter0_bi_320_108" x="-10" y="-10" width="60" height="60"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_320_108"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_320_108"
                                     result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="2.5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_320_108"/>
                        </filter>
                        <linearGradient id="paint0_linear_320_108" x1="20" y1="2" x2="20" y2="38"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3358A3"/>
                            <stop offset="1" stop-color="#00C1ED"/>
                        </linearGradient>
                    </defs>
                </svg>
            }
            {
                status === 'success' &&
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_bi_321_236)">
                        <rect x="2" y="2" width="36" height="36" rx="18" fill="url(#paint0_linear_321_236)"
                              fill-opacity="0.05"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                    </g>
                    <rect x="6" y="6" width="28" height="28" rx="14" fill="#0BBB91"/>
                    <g clip-path="url(#clip0_321_236)">
                        <path
                            d="M18.5014 26.2509C18.3025 26.2508 18.1118 26.1718 17.9712 26.0311L14.2212 22.2811C14.1495 22.2119 14.0924 22.1292 14.0531 22.0377C14.0138 21.9462 13.9931 21.8477 13.9922 21.7482C13.9914 21.6486 14.0103 21.5498 14.048 21.4576C14.0857 21.3655 14.1414 21.2817 14.2119 21.2113C14.2823 21.1409 14.366 21.0852 14.4582 21.0475C14.5504 21.0098 14.6491 20.9908 14.7487 20.9917C14.8483 20.9925 14.9467 21.0132 15.0382 21.0525C15.1297 21.0918 15.2125 21.149 15.2817 21.2206L18.3964 24.3346L24.6349 15.3241C24.6899 15.2406 24.761 15.1689 24.844 15.1132C24.9271 15.0576 25.0204 15.0191 25.1186 15.0001C25.2167 14.981 25.3177 14.9818 25.4155 15.0023C25.5134 15.0229 25.6061 15.0628 25.6883 15.1197C25.7705 15.1766 25.8405 15.2493 25.8942 15.3337C25.9479 15.418 25.9842 15.5123 26.0009 15.6108C26.0176 15.7094 26.0145 15.8103 25.9916 15.9076C25.9688 16.005 25.9267 16.0968 25.8679 16.1776L19.1179 25.9276C19.0557 26.0185 18.9743 26.0946 18.8794 26.1504C18.7846 26.2063 18.6785 26.2406 18.5689 26.2509C18.5464 26.2509 18.5239 26.2509 18.5014 26.2509Z"
                            fill="#353A6B"/>
                    </g>
                    <defs>
                        <filter id="filter0_bi_321_236" x="-10" y="-10" width="60" height="60"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_321_236"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_321_236"
                                     result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="2.5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_321_236"/>
                        </filter>
                        <linearGradient id="paint0_linear_321_236" x1="20" y1="2" x2="20" y2="38"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3358A3"/>
                            <stop offset="1" stop-color="#00C1ED"/>
                        </linearGradient>
                        <clipPath id="clip0_321_236">
                            <rect width="12" height="12" fill="white" transform="translate(14 15)"/>
                        </clipPath>
                    </defs>
                </svg>
            }
            {
                status === 'failed' &&
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_bi_322_354)">
                        <rect x="2" y="2" width="36" height="36" rx="18" fill="url(#paint0_linear_322_354)"
                              fill-opacity="0.05"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                        <rect x="1" y="1" width="38" height="38" rx="19" stroke="#00C1ED" stroke-opacity="0.1"
                              stroke-width="2"/>
                    </g>
                    <rect x="6" y="6" width="28" height="28" rx="14" fill="#CC553D"/>
                    <g clip-path="url(#clip0_322_354)">
                        <path
                            d="M25.025 14.975C24.725 14.675 24.275 14.675 23.975 14.975L20 18.95L16.025 14.975C15.725 14.675 15.275 14.675 14.975 14.975C14.675 15.275 14.675 15.725 14.975 16.025L18.95 20L14.975 23.975C14.675 24.275 14.675 24.725 14.975 25.025C15.125 25.175 15.275 25.25 15.5 25.25C15.725 25.25 15.875 25.175 16.025 25.025L20 21.05L23.975 25.025C24.125 25.175 24.35 25.25 24.5 25.25C24.65 25.25 24.875 25.175 25.025 25.025C25.325 24.725 25.325 24.275 25.025 23.975L21.05 20L25.025 16.025C25.325 15.725 25.325 15.275 25.025 14.975Z"
                            fill="#353A6B"/>
                    </g>
                    <defs>
                        <filter id="filter0_bi_322_354" x="-10" y="-10" width="60" height="60"
                                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_322_354"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_322_354"
                                     result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix"
                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="2.5"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_322_354"/>
                        </filter>
                        <linearGradient id="paint0_linear_322_354" x1="20" y1="2" x2="20" y2="38"
                                        gradientUnits="userSpaceOnUse">
                            <stop stop-color="#3358A3"/>
                            <stop offset="1" stop-color="#00C1ED"/>
                        </linearGradient>
                        <clipPath id="clip0_322_354">
                            <rect width="12" height="12" fill="white" transform="translate(14 14)"/>
                        </clipPath>
                    </defs>
                </svg>
            }
            <div className="flex flex-col">
                {
                    status === 'creating' && <div className="gap-y-2">
                        <p className="text-xl font-bold mb-5">
                            Just a minute...</p>
                        <p className=" text-sm ">Processing the AI model file to create splits for ANTs. Give us some time to finish your creation.</p>
                    </div>
                }
                {
                    status === 'success' && <div>
                        <p className="text-xl font-bold mb-5">
                            AI Model added successfully!</p>
                        <p className=" text-sm mb-5 ">AI model splits for AINFTs are created successfully. Go to the project details page to create AINFTs.</p>
                        <button
                            className="text-white rounded-xl bg-gradient-to-br from-[#3464C3] to-[#00C1ED] px-8 py-2 flex items-center text-xs sm:text-base"
                            onClick={() => window.location = `/project/detail/${id}`}>Open Project
                        </button>
                    </div>
                }
                {
                    status === 'failed' && <div className="gap-y-2">
                        <p className="text-xl font-bold mb-5">
                            We are so sorry!</p>
                        <p className=" text-sm ">Due to an error, your file could not be processed. Would you like to try again?</p>
                    </div>
                } </div>
        </div>
    )
}
