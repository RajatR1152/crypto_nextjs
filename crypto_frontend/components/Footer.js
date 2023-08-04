'use client'
import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaSquareFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

export default function Footer() {

    const path = usePathname();

    if (path == '/login' || path == '/register') {
        return (<></>)
    }

    return (
        <>
            <hr />
            <h2 className="text-md font-bold m-5">@crypto2023</h2>
            <h2 className="text-md font-semibold m-5">all rights reserved</h2>
            <div className="container md:flex md:flex-row w-full p-5">
                <div className="container w-full md:w-8/12 p-5">
                    <Link className='ms-5 text-md font-semibold' href={'/'}>APP</Link>
                    <Link className='ms-5 text-md font-semibold' href={'/'}>DEFI</Link>
                    <Link className='ms-5 text-md font-semibold' href={'/'}>EXCHANGES</Link>
                    <Link className='ms-5 text-md font-semibold' href={'/'}>WALLET</Link>

                    <h3 className="text-md my-5 w-full md:w-7/12 leading-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptas quasi similique assumenda architecto magni vel,
                        incidunt, accusamus repellendus iste voluptatem ipsa,
                        sapiente blanditiis delectus. Iusto assumenda cumque aspernatur
                        repellendus eveniet?
                    </h3>

                </div>

                <div className="container w-full md:w-4/12 p-5">
                    <h1 className="text-3xl font-bold">Connect with us :</h1>
                    <div className="container my-10 w-full flex flex-row">
                        <FaFacebook size={30} className='text-light ms-5' />
                        <FaInstagram size={30} className='text-light ms-5' />
                        <FaTwitter size={30} className='text-light ms-5' />
                    </div>
                </div>

            </div>

        </>
    )
}
