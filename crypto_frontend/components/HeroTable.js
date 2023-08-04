'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HeroTable() {

    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en').then((res) => {
            setData(res.data);
        })
    }, [])

    return (
        <div className="w-full text-center">
            <h1 className="text-center md:text-5xl text-3xl font-bold text-slate-100">Trade on Popular assets ..</h1>
            <h3 className="text-center font-semibold mt-14 text-xl w-full md:w-4/12 mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium magni placeat explicabo sunt repellendus temporibus, maxime fugit voluptatum facilis necessitatibus quibusdam a deleniti similique assumenda beatae, aperiam, sit quasi!
            </h3>

            <div className="w-screen overflow-x-auto">
                <table className="table my-20 w-full overflow-x-auto table-auto">
                    <tbody>

                        <tr className='border-y border-white'>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>#</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-3/12'>coin</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-3/12'>price</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-3/12'>24 hr change(%)</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-2/12'>trade</th>
                        </tr>

                        {
                            data.map((d, i) => {
                                return (
                                    <tr className='text-center py-3 border-b border-white' key={i}>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'>{i + 1}</td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'>{d.id}</td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'>₹{d.current_price}</td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12' style={d.price_change_percentage_24h < 0 ? { color: 'red' } : { color: 'green' }}>{d.price_change_percentage_24h}%</td>
                                        <td className='text-md md:text-xl p-5 font-extrabold w-1/12'><Link className='bg-purple p-3 md:p-4 rounded-lg' href={'/'}>Trade</Link></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <button onClick={()=>{router.push('/market')}} className="bg-transparent rounded-lg my-5 hover:border-violet-800 hover:bg-purple p-5 w-11/12 mx-auto border-2 border-white text-xl font-bold">See more</button>
        </div>
    )
}
