import AigenLogo from '../assets/aigen-logo-light.svg'
import {useNavigate} from "react-router-dom";
import {useAccount, useDisconnect} from "wagmi";
import {useEffect} from "react";

export default function Navbar(props) {
    const navigate = useNavigate();
    const {address, isConnecting, isDisconnected} = useAccount()

    function openConnectWallet() {
        navigate("/connect")
    }

    return (
        <div>
            <nav className="bg-gradient-to-r from-aigen-background-color to-aigen-background-color-shade-3">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <img src={AigenLogo} className="h-4 mr-3 sm:h-8 rounded"
                             alt="Aigen Logo"/>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                            {props.marketplace ? (
                                <li className="flex justify-start items-center gap-4 text-white cursor-pointer hover:text-gray-200" onClick={()=>{
                                    navigate("/")
                                }
                                }>Marketplace</li>) : (<></>)}
                            {props.launchpad ? (
                                <li className="flex justify-start items-center gap-4 text-white cursor-pointer hover:text-gray-200" onClick={()=>{
                                    navigate("/projects")
                                }
                                }>Launchpad</li>) : (<></>)}

                            {
                                props.dontShowConnectButton?(
                                    <div></div>
                                ): (<li className="flex justify-start items-center gap-4 text-white">
                                    {address ? (<div>{address.substring(0, 4)}...{address.substring(address.length - 4)}
                                    </div>) : (<div>
                                    </div>)}

                                    {!isDisconnected ? (
                                        <button type="button"
                                                onClick={openConnectWallet}
                                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2">
                                            Disconnect
                                        </button>
                                    ) : (
                                        <button type="button"
                                                onClick={openConnectWallet}
                                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2">
                                            Connect Wallet
                                        </button>
                                    )}
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}