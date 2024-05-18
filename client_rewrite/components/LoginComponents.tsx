import React, { useState } from "react";
import "@/css/LoginPage.css"
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import { createHash } from "crypto"

interface IUserData {
    username: string,
    password: string
}

export default function LoginComponent() {

    const [userData, setUserData] = useState<IUserData>({
        username: "",
        password: ""
    })


    const login = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })

            if (response.ok) {
                const encoding = Buffer.from(Buffer.from(JSON.stringify(userData)).toString("utf-16le")).toString("base64")

                const user = sessionStorage.setItem("user", encoding)
                console.log(user)

            } else {
                toast.error("user dosen't exist", {
                    position: "bottom-right"
                })
            }

        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <div className="container ">
            <div className="header">
                <div className="text">Log In</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">

                <div className="input">
                    <img src="/icons/person.png" alt="" />
                    <input type="text" placeholder="Username" onChange={(e) => {
                        setUserData(prevState => ({
                            ...prevState,
                            username: e.target.value
                        }))
                    }} />
                </div>

                <div className="input">
                    <img src="/icons/password.png" alt="" />
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setUserData(prevState => ({
                            ...prevState,
                            password: e.target.value
                        }))
                    }} />
                </div>
            </div>

            <div className="submit-container">
                <div className="submit" onClick={login}>Login</div>

            </div>

            <ToastContainer
                hideProgressBar
                pauseOnHover={false}
                autoClose={2000}
                draggable
            />
        </div>
    );
};
