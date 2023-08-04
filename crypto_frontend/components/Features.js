'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import trade from '@/assets/imgs/trade.webp'
import security from '@/assets/imgs/security.webp'
import exchage from '@/assets/imgs/exchange.webp'
import buy from '@/assets/imgs/buy.webp'
import { LoginContext } from '@/context/LoginContext'
import Link from 'next/link'

export default function Features() {

    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);

    return (
        <div className="container w-full">
            {/* <h1 className="text-4xl font-bold mt-10 mb-16 text-center"></h1> */}

            <div className="md:w-11/12 my-10 rounded-lg p-5 text-center md:flex md:flex-row mx-auto">
                <div className="container w-full md:w-4/12">
                    <Image src={trade} className='w-full' alt='' />
                </div>
                <div className="container w-full md:w-8/12 p-5 py-20">
                    <h1 className="text-center text-3xl font-bold">Trade more than 150 crypto currencies</h1>
                    <p className="text-lg leading-8 my-5 mx-auto md:w-8/12 text-center font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis a maiores ea, atque reiciendis nulla ducimus totam
                        quo aliquam natus sapiente quae doloribus nostrum dolorem
                        voluptates soluta eum unde vitae!
                    </p>
                    <Link href={isLogedIn?'/market':'/login'} className="bg-transparent border-2 border-white rounded-lg hover:border-violet-800 hover:bg-purple py-4 px-8 text-xl font-bold">trade now</Link>
                </div>
            </div>

            <div className="md:w-11/12 rounded-lg p-5 md:flex md:flex-row mx-auto">
                <div className="container w-full md:hidden block md:w-4/12">
                    <Image src={security} className='w-full' alt='' />
                </div>

                <div className="container w-full text-center md:w-8/12 p-5 py-20">
                    <h1 className="text-center text-3xl font-bold">Fast and Secured transictions</h1>
                    <p className="text-lg leading-8 my-5 mx-auto md:w-8/12 text-center font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis a maiores ea, atque reiciendis nulla ducimus totam
                        quo aliquam natus sapiente quae doloribus nostrum dolorem
                        voluptates soluta eum unde vitae!
                    </p>
                    <Link href={isLogedIn?'/market':'/login'} className="bg-transparent border-2 border-white rounded-lg hover:border-violet-800 hover:bg-purple py-4 px-8 text-xl font-bold">load wallet</Link>
                </div>

                <div className="container w-full md:block hidden md:w-4/12">
                    <Image src={security} className='w-full' alt='' />
                </div>
            </div>

            <div className="md:w-11/12 my-10 rounded-lg p-5 text-center md:flex md:flex-row mx-auto">
                <div className="container w-full md:w-4/12">
                    <Image src={exchage} className='w-full' alt='' />
                </div>
                <div className="container w-full md:w-8/12 p-5 py-20">
                    <h1 className="text-center text-3xl font-bold">swap more than 150 crypto currencies</h1>
                    <p className="text-lg leading-8 my-5 mx-auto md:w-8/12 text-center font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis a maiores ea, atque reiciendis nulla ducimus totam
                        quo aliquam natus sapiente quae doloribus nostrum dolorem
                        voluptates soluta eum unde vitae!
                    </p>
                    <Link href={isLogedIn?'/market':'/login'} className="bg-transparent border-2 border-white rounded-lg hover:border-violet-800 hover:bg-purple py-4 px-8 text-xl font-bold">trade now</Link>
                </div>
            </div>

            <div className="md:w-11/12 rounded-lg p-5 md:flex md:flex-row mx-auto">
                <div className="container w-full md:hidden block md:w-4/12">
                    <Image src={buy} className='w-full' alt='' />
                </div>

                <div className="container w-full text-center md:w-8/12 p-5 py-20">
                    <h1 className="text-center text-3xl font-bold capitalize">buy cryptos with fiat</h1>
                    <p className="text-lg leading-8 my-5 mx-auto md:w-8/12 text-center font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis a maiores ea, atque reiciendis nulla ducimus totam
                        quo aliquam natus sapiente quae doloribus nostrum dolorem
                        voluptates soluta eum unde vitae!
                    </p>
                    <Link href={isLogedIn?'/market':'/login'} className="bg-transparent border-2 border-white rounded-lg hover:border-violet-800 hover:bg-purple py-4 px-8 text-xl font-bold">trade now</Link>
                </div>

                <div className="container w-full md:block hidden md:w-4/12">
                    <Image src={buy} className='w-full' alt='' />
                </div>
            </div>



        </div>
    )
}
