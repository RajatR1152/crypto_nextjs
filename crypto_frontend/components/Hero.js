'use client'
import React, { useContext } from 'react'
import heroImg from '@/assets/imgs/heroImg.webp'
import Image from 'next/image'
import Link from 'next/link'
import { LoginContext } from '@/context/LoginContext'

export default function Hero() {

    const {isLogedIn, setIsLogedIn} = useContext(LoginContext);

    return (
        <div className="container w-11/12 mx-auto md:flex md:flex-row">

            <div className="conainer md:w-6/12 py-20 w-full p-5">
                <h1 className="text-5xl my-10 font-bold text-slate-100">Buy and Sell Cryptocurrencies at market price</h1>
                <p className="my-16 leading-10 font-bold text-2xl">
                    Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Ratione perferendis veritatis
                    adipisci itaque ab, officiis necessitatibus,
                    hic consequatur provident sunt laudantium quam
                    at deserunt cum ut illum! Eius, quaerat fugit.
                </p>
                <Link href={isLogedIn ? '/market' : '/login'} className="px-10 py-4 mx-auto border-2 border-white bg-transparent hover:bg-purple rounded-lg text-xl font-bold">Explore now</Link>
            </div>

            <div className="conainer md:w-6/12 w-full">
                <Image src={heroImg} alt='' />
            </div>

        </div>
    )
}
