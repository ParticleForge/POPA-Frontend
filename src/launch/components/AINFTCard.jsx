import NFTLogo from "../assets/nft-logo.png"
import {downloadFileFromNFTStorage} from "./Utils";

export default function AINFTCard(props) {
    function downloadNFT(){
        navigate("https://" + props.ainft.dataCid + ".ipfs.nftstorage.link")
    }

    function downloadMetadata(){
        navigate("https://" + props.ainft.metadataCid + ".ipfs.nftstorage.link")
    }

    function createDownloadUrl(id){
        return "https://" + id + ".ipfs.nftstorage.link";
    }

    function navigate(href, newTab) {
        let a = document.createElement('a');
        a.href = href;
        if (newTab) {
            a.setAttribute('target', '_blank');
        }
        a.click();
    }

    return (
        <div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <div className="p-8">
                <img src={NFTLogo} className="" alt="NFT Logo"/>
            </div>
            <a href="src/launch/components#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">AI NFT
                    #{props.ainft.id}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: 0.01 ETH</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: {props.ainft.status}</p>

            <a
                href={createDownloadUrl(props.ainft.dataCid)} target="_blank"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span
                  class="relative px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Download NFT
              </span>
            </a>

            <a
                href={createDownloadUrl(props.ainft.metadataCid)} target="_blank"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span
                  class="relative px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Download Metadata
              </span>
            </a>

        </div>
    );
}