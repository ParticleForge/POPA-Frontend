import fs from "fs";
import axios from "axios";
import {AIGENML_SERVER_URL} from "../../config";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function downloadFileFromNFTStorage(cid, filePath) {
    let nftUrl = "https://" + cid + ".ipfs.nftstorage.link"
    const writer = fs.createWriteStream(filePath)

    const response = await axios({
        nftUrl,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

export function getProjectById(projectId, func) {
    axios.get(AIGENML_SERVER_URL + '/project', {
        params: {
            id: projectId
        }
    }).then(function (response) {
        console.log("Project:", response);

        let data = response.data;
        if (data.status === "success") {
            func(data.project)
        } else {
            console.log("Error:", response.data)
        }
    }).catch((err) => {
        console.log(err)
    })
}

