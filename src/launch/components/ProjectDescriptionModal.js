import React from "react";
import {RxCross2} from "react-icons/rx";

export default function ProjectDescriptionModal(props) {
    return (
        <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full flex justify-center items-center">
            <div className="relative w-1/3 mx-auto bg-aigen-background-color-shade-4 border-2 border-blue-bikini border-opacity-50 p-12 rounded-lg text-white">
                <h1 className="text-3xl">Project Description</h1>
                <div className="my-3">
                    {props.description}
                </div>
                <span className="absolute top-5 right-5 cursor-pointer p-2"
                    onClick={
                        () => {
                            props.toggleDescriptionModal(false)
                        }
                }>
                    <RxCross2/>
                </span>
            </div>
        </div>
    )
}
