'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import FormatPrice from '@/components/FormatPrice';
import { RxCross2 } from 'react-icons/rx';
import { BsBookmark } from 'react-icons/bs';
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';

export default function page() {

    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const router = useRouter();

    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [coin, setCoin] = useState([]);

    if (!isLogedIn) {
        router.push('/login');
    }

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const orignalData = JSON.parse(userData);
        setUser(orignalData);
        fetchData();
    }, [])

    function fetchData() {
        axios.post('http://localhost:5000/bookmarks', { 'username': user.username }).then((res) => {
            setData(res.data.data);
        })
    }

    function removeBookmark(d) {
        axios.post('http://localhost:5000/remove', { 'id': d, 'username': user.username }).then((res) => {
            fetchData();
            setTimeout(() => {
                router.push('/bookmark');
            }, 1500);
        })
    }

    return (
        <div className="container w-full bg-rd-300">
            <div className="w-screen overflow-x-auto">
                <table className="table my-20 w-full overflow-x-auto table-auto">
                    <tbody>

                        <tr className='border-y border-white'>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>#</th>
                            <th className='text-lg md:text-xl text-start p-3 md:p-5 font-extrabold w-1/12'>coin</th>
                        </tr>

                        {
                            data.length > 0 ? (

                                data.map((d, i) => {
                                    return (
                                        <tr className='text-center py-3 border-b border-white' key={i}>
                                            <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'>{i + 1}</td>
                                            <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'><Link href={`/coin/${d.id}`} className='flex text-xl w-full font-bold'><img src={d.image} alt={d.id} className="w-14 me-4 rounded-full" /><h1 className="mt-3 md:mt-3">{d.id}</h1></Link></td>
                                            <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'><RxCross2 className='ms-auto cursor-pointer' onClick={() => { removeBookmark(d.id) }} size={30} /></td>
                                        </tr>
                                    )
                                })

                            ) :
                                (
                                    <tr className='w-full justify-center items-center content-center'>
                                        <td colSpan={2}><h1 className="text-3xl my-20 text-center font-extrabold capitalize">no bookmarks yet</h1></td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
