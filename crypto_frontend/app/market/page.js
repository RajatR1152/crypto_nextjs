'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import FormatPrice from '@/components/FormatPrice';

export default function page() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en').then((res) => {
            setData(res.data);
        })
    }, [])

    return (
        <div className="container w-full bg-rd-300">
            <div className="w-screen overflow-x-auto">
                <table className="table my-20 w-full overflow-x-auto table-auto">
                    <tbody>

                        <tr className='border-y border-white'>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>#</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>coin</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>price</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>24 hr change(%)</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>market cap</th>
                            <th className='text-lg md:text-xl p-3 md:p-5 font-extrabold w-1/12'>market cap change(%)</th>
                        </tr>

                        {
                            data.map((d, i) => {
                                return (
                                    <tr className='text-center py-3 border-b border-white' key={i}>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'>{i + 1}</td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'><Link href={`/coin/${d.id}`} className='flex text-xl w-full font-bold'><img src={d.image} alt={d.id} className="w-14 me-4 rounded-full" /><h1 className="mt-3 md:mt-3">{d.id}</h1></Link></td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12'><FormatPrice price={d.current_price} /></td>
                                        <td className='text-md md:text-xl p-3 md:p-5 font-extrabold w-1/12' style={d.price_change_percentage_24h < 0 ? { color: 'red' } : { color: 'green' }}>{d.price_change_percentage_24h}%</td>
                                        <td className='text-md md:text-xl p-5 font-extrabold w-1/12'><FormatPrice price={d.market_cap} /></td>
                                        <td className='text-md md:text-xl p-5 font-extrabold w-1/12' style={d.market_cap_change_percentage_24h < 0 ? { color: 'red' } : { color: 'green' }}>{d.market_cap_change_percentage_24h}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
