'use client'
import React, { useContext, useState } from 'react'
import logo from '@/assets/imgs/logo.png'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { LoginContext } from '@/context/LoginContext'
import { FaRegUserCircle } from 'react-icons/fa'


export default function Header() {

    const path = usePathname();
    const router = useRouter();
    const [showNavs, setShowNavs] = useState(false);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    if (path == '/login' || path == '/register') {
        return (<></>)
    }

    return (
        <div className="w-full md:flex md:flex-row py-5 md:p-0 border-b border-white">

            <div className='w-fit flex flex-row'>
                {!showNavs ? (<FiMenu size={30} onClick={() => { setShowNavs(true) }} className='md:hidden mt-5 mx-3' />)
                    :
                    (<RxCross2 size={30} onClick={() => { setShowNavs(false) }} className='md:hidden mt-5 mx-3' />)
                }
                <Image src={logo} alt="" className=" w-20" />
                <h1 className="text-3xl font-extrabold mt-5 text-white">C R Y P T O</h1>
            </div>

            <div className="md:w-fit md:flex hidden w-full text-center mt-3 justify-center items-center mx-auto">
                <ul className="list-none font-bold md:flex md:flex-row">
                    <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/'}>Home</Link></li>
                    <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/market'}>Market</Link></li>
                    <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/bookmark'}>watchlist</Link></li>
                </ul>
            </div>

            <div className="w-full md:block hidden md:w-fit ms-auto px-5">
                {
                    isLogedIn ?
                        (
                            <FaRegUserCircle className='mt-5' size={40} />
                        )
                        :
                        (
                            <>
                                <button onClick={() => { router.push('/login') }} className="px-5 py-2 text-xl w-full md:w-auto mx-auto cursor-pointer bg-purple  border-white rounded-lg">log in</button>
                                <button onClick={() => { router.push('/register') }} className="px-5 py-2 md:ms-5 mt-4 text-xl md:w-auto w-full cursor-pointer bg-purple  border-white rounded-lg">sign up</button>
                            </>
                        )
                }
            </div>

            {
                showNavs ?
                    (<div className="h-fit">
                        <div className="md:w-fit w-full text-center mt-3 justify-center items-center mx-auto">
                            <ul className="list-none font-bold md:flex md:flex-row">
                                <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/'}>Home</Link></li>
                                <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/market'}>Market</Link></li>
                                <li className='mx-2 md:my-0 my-3 text-xl'><Link href={'/bookmark'}>Bookmarks</Link></li>
                            </ul>
                        </div>

                        <div className="w-full md:w-fit ms-auto px-5">
                            {
                                isLogedIn ?
                                    (
                                        <FaRegUserCircle className='mt-5 w-fit mx-auto' size={40} />
                                    )
                                    :
                                    (
                                        <>
                                            <button onClick={() => { router.push('/login') }} className="px-5 py-2 text-xl w-full md:w-auto mx-auto cursor-pointer bg-purple  border-white rounded-lg">log in</button>
                                            <button onClick={() => { router.push('/register') }} className="px-5 py-2 md:ms-5 mt-4 text-xl md:w-auto w-full cursor-pointer bg-purple  border-white rounded-lg">sign up</button>
                                        </>
                                    )
                            }
                        </div>
                    </div>)
                    :
                    (<></>)
            }


        </div>
    )
}
