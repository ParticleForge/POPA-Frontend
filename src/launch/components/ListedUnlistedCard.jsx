import profilePicture from "../../market/assets/profilePicture.png"

export default function ListedUnlistedCard({Listed, tokenID}) {
    return (
        <div className=" p-5 bg-[#151A4E] rounded-xl">
            <div className=" flex items-center justify-between">
                <div
                    className="bg-gradient-to-t w-16 from-[#3358a30d] to-[#00c1ed0d] border-2 border-[#00c1ed1a] rounded-full p-2 backdrop-blur-sm mr-3">
                    <img src={profilePicture}
                         className="rounded-full"></img>
                </div>
                <div className=" flex flex-col">
                    <p className=" text-white text-sm mb-2">Token Id #{tokenID}
                    </p>
                    <p className=" text-marketplace-primary-color-lite text-xs mb-2">At: 10/07/2022, 08:23 am</p>
                    <p className=" text-marketplace-primary-color-lite">Selling price :
                        <span className=" text-[#00C1ED]"> {Listed ? '0.001 ETH' : 'Yet To Add'}</span>
                    </p>
                </div>
            </div>


        </div>
    )

}
