import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import NFTMarketplaceLogo from '../assets/nft-marketplace.png'
import BuyNFTModal from "../components/BuyNFTModal";
import Footer from "../../components/Footer";

export default function AIProjectDetail() {
    const [showModal, setShowModal] = useState(false)

    function toggleBuyNFTModal(toggle) {
        setShowModal(toggle)
    }

    return (
        <div>
            <Navbar backgroundColor=""/>

            <div className="w-full h-full">
                <div className="max-w-5xl p-4 mx-auto">
                    {/*Navigation*/}
                    <div className="flex justify-start items-center mt-6 mb-12">
                        <span>
                            <a href="/">Home</a>
                        </span>
                        <svg className="mx-2" width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.00021 11.0006C2.26541 11.0005 2.51972 10.8951 2.70721 10.7076L6.70721 6.70757C6.89468 6.52004 7 6.26573 7 6.00057C7 5.73541 6.89468 5.4811 6.70721 5.29357L2.70721 1.29357C2.61497 1.19806 2.50462 1.12188 2.38262 1.06947C2.26061 1.01706 2.12939 0.989473 1.99661 0.988319C1.86384 0.987165 1.73216 1.01247 1.60926 1.06275C1.48636 1.11303 1.37471 1.18728 1.28082 1.28117C1.18693 1.37507 1.11267 1.48672 1.06239 1.60962C1.01211 1.73251 0.986809 1.86419 0.987963 1.99697C0.989117 2.12975 1.0167 2.26097 1.06911 2.38297C1.12152 2.50498 1.1977 2.61532 1.29321 2.70757L4.58621 6.00057L1.29321 9.29357C1.1534 9.43342 1.0582 9.61159 1.01963 9.80554C0.981063 9.99949 1.00087 10.2005 1.07654 10.3832C1.15221 10.5659 1.28035 10.7221 1.44476 10.832C1.60917 10.9419 1.80246 11.0005 2.00021 11.0006Z" fill="#BDC9E0"/>
                        </svg>

                        <span>High quality AI project</span>
                    </div>
                    <div className="grid grid-cols-12 text-white gap-4">
                        <div className="col-span-4 bg-red">
                            <div className="bg-aigen-background-color-shade-3 pb-12 rounded-xl">

                                <div class="relative mt-1 flex h-72 w-full justify-center rounded-xl bg-cover "
                                    style={
                                        {
                                            backgroundImage: "url(" + NFTMarketplaceLogo + ")"
                                        }
                                }>
                                    <div class="absolute -bottom-8 flex h-[64px] w-[64px] items-center justify-center
                                                                                    rounded-full border-[4px] border-white bg-pink-400">
                                        <img className="h-full w-full rounded-full" src="https://i.ibb.co/6YbS9ff/avatar11.png" alt=""/>
                                    </div>
                                </div>

                                <h1 className="text-center mt-14 text-2xl font-semibold">Aigen Protocol</h1>
                                <h3 className="text-center mt-2 text-base">Owner</h3>
                            </div>
                        </div>
                        <div className="col-span-8 bg-green ml-12">
                            <h1 className="text-5xl">High Quality AI Project</h1>
                            <h3 className="text-lg font-bold mt-12">Description</h3>
                            <p className="text-base mt-8">
                                There are many variations of passages of
                                                                Lorem Ipsum available, but the majority have suffered alteration in some form,
                                                                by injected humour, words which don't look even slightly believable.
                            </p>
                            <p className="text-base mt-4">
                                There are many variations of passages of
                                                                Lorem Ipsum available, but the majority have suffered alteration in some form,
                                                                by injected humour, words which don't look even slightly believable.
                            </p>
                            <p className="text-base mt-4">
                                There are many variations of passages of
                                                                Lorem Ipsum available, but the majority have suffered alteration in some form,
                                                                by injected humour, words which don't look even slightly believable.
                            </p>

                            <div className="lg:grid lg:grid-cols-2 gap-4 mt-12">
                                <div class="bg-input-border-primary-color flex justify-between items-center py-3 px-3 rounded-lg">
                                    <span className="text-base">Created</span>
                                    <span className="text-lg text-blue-500">12 July 2023</span>
                                </div>
                                <div class="bg-input-border-primary-color flex justify-between items-center py-3 px-3 rounded-lg">
                                    <span className="text-base">Created</span>
                                    <span className="text-lg text-blue-500">12 July 2023</span>
                                </div>
                                <div class="bg-input-border-primary-color flex justify-between items-center py-3 px-3 rounded-lg">
                                    <span className="text-base">Created</span>
                                    <span className="text-lg text-blue-500">12 July 2023</span>
                                </div>
                                <div class="bg-input-border-primary-color flex justify-between items-center py-3 px-3 rounded-lg">
                                    <span className="text-base">Created</span>
                                    <span className="text-lg text-blue-500">12 July 2023</span>
                                </div>
                            </div>

                            <button className="bg-gradient-to-b from-blue-shade1 to-blue-shade2 py-2 px-16 mt-12
                                                                text-base text-white rounded-lg"
                                onClick={
                                    () => {
                                        toggleBuyNFTModal(true)
                                    }
                            }>Buy NFTs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {
            showModal ? (
                <BuyNFTModal toggleBuyNFTModal={toggleBuyNFTModal}/>
            ) : (
                <></>
            )
        }

            <Footer/>
        </div>
    )
}
