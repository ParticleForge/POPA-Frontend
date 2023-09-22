import profilePicture from "../../market/assets/profilePicture.png"
export default function SoldCard({nft_id}) {


    return (

        <div className=" p-5 flex flex-col bg-[#151A4E] rounded-xl">
            <div className=" flex items-center justify-between mb-4">
                <div className="bg-gradient-to-t w-16 from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm mr-3">
                    <img src={profilePicture}
                        className="rounded-full"></img>
                </div>
                <div className=" flex flex-col">
                    <p className=" text-marketplace-primary-color-lite text-sm">Owned by : <span className=" font-bold">@Codekarsatvik</span></p>
                    <p className=" text-marketplace-primary-color-lite text-xs">At: 10/07/2022, 08:23 am</p>
                </div>
            </div>
            <div>
                <p className=" font-bold font-proxima-nova text-white mb-2">Sysytan #{nft_id}</p>
                <p className=" text-marketplace-primary-color-lite">Purchased for <span className=" text-[#00C1ED]">0.001 ETH</span></p>
            </div>

        </div>
    )
}
