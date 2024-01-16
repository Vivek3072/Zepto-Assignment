"use client"
import { useState } from "react"

type Props = {}

export default function Header({ }: Props) {
    const [popup, setPopup] = useState(false)

    return (
        <div className="relative">
            <div className='flex flex-row justify-between px-2'>
                <h1 className="text-3xl font-bold text-center text-primary mb-4">
                    Pick Users
                </h1>
                <div
                    onMouseEnter={() => setPopup(true)}
                    onMouseLeave={() => setPopup(false)}
                    className="cursor-pointer text-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                    </svg>
                </div>
            </div>
            {popup &&
                <div className="absolute top-10 right-0 border p-3 bg-white shadow-xl rounded-lg flex flex-col">
                    <ul className="flex flex-col text-gray-600 items-start p-0 m-0 text-sm ml-2 list-disc">
                        <li className="ml-2">Type on the input box to find users</li>
                        <li className="ml-2">Click on the users to select them</li>
                        <li className="ml-2">You can use backspace key to remove users</li>
                        <li className="ml-2">You can click on the cross to remove any selected user</li>
                    </ul>
                </div>
            }
        </div>
    )
}