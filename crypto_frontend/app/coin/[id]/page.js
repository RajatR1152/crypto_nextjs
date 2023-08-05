'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import LineChart from '@/components/LineChart';
import FormatPrice from '@/components/FormatPrice';
import { BsBookmark } from 'react-icons/bs';
import { BsBookmarkCheckFill } from 'react-icons/bs'
import { LoginContext } from '@/context/LoginContext';

export default function page() {

  const { isLogedIn, setIsLogedIn } = useContext(LoginContext);

  const param = useParams();
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [change, setChange] = useState('');
  const [supply, setSupply] = useState('');
  const [volume, setVolume] = useState('');
  const [high, setHigh] = useState('');
  const [low, setLow] = useState('');
  const [cap, setCap] = useState('');
  const [capChange, setCapChange] = useState('');
  const [bookmarkedData, setBookmarkedData] = useState([]);



  useEffect(() => {

    if (isLogedIn) {
      const userData = localStorage.getItem('user');
      const orignalData = JSON.parse(userData);
      setUser(orignalData);

      fetchData();
    }

    axios.get(`https://api.coingecko.com/api/v3/coins/${param.id}?market_data=true`).then((res) => {
      setData(res.data);
      setImg(res.data.image.thumb);
      setPrice(res.data.market_data.current_price.inr);
      setChange(res.data.market_data.price_change_percentage_24h);
      setCap(res.data.market_data.market_cap.inr);
      setCapChange(res.data.market_data.market_cap_change_percentage_24h)
      setSupply(res.data.market_data.max_supply);
      setLow(res.data.market_data.low_24h.inr);
      setHigh(res.data.market_data.high_24h.inr);
      setDescription(res.data.description.en)
    })

  }, []);

  function fetchData() {
    axios.post('http://localhost:5000/bookmarks', { 'username': user.username }).then((res) => {
      setBookmarkedData(res.data.data);
    })
  }

  async function addToWatchlist() {
    const bookmark_data = {
      id: data.id,
      image: img,
      username: user.username
    }
    axios.post('http://localhost:5000/addbookmarks', bookmark_data).then((res) => {
      fetchData();
      router.push(`/coin/${param.id}`);
    })
  }
  const isMarked = bookmarkedData.find((e) => e.id == param.id);

  function removeBookmark(d) {
    axios.post('http://localhost:5000/remove', { 'id': d, 'username': user.username }).then((res) => {
      router.push(`/coin/${param.id}`);
    })
  }

  return (
    <div className="w-full md:p-5">
      <LineChart coin={param.id} />
      <div className="container p-2 md:p-5">
        <div className="flex my-10 flex-row w-full ms-5 mt-10">
          <img src={img} alt="" className="w-14 md:w-16 rounded-full" />
          <h1 className="text-5xl font-bold capitalize mt-4 ms-4">{data.id}</h1>
          {
            isLogedIn ?
              isMarked ?
                (<BsBookmarkCheckFill onClick={() => { removeBookmark(data.id) }} size={40} className='ms-auto cursor-pointer md:me-5 me-6 mt-4' />
                )
                :
                (
                  <BsBookmark onClick={() => { addToWatchlist(data) }} size={40} className='ms-auto cursor-pointer md:me-5 me-6 mt-4' />
                )
              :
              (<></>)
          }
        </div>
        <table className='table-auto border-x text-center border-white w-full'>
          <tbody>
            <tr className='border-y border-white'>
              <td colSpan={2}><h1 className="text-4xl p-5 font-extrabold text-center">Market data</h1></td>
            </tr>
            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">market rank :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12  ">#{data.market_cap_rank}</h2>
              </td>
            </tr>
            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">current price :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 "><FormatPrice price={price} /></h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">price change 24hr(%):</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 " style={change < 0 ? { color: "red" } : { color: "green" }}>{change}%</h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold w-5/12 md:w-6/12 capitalize">market cap :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-7/12 "><FormatPrice price={cap} /></h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">market cap change(%) :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 " style={capChange < 0 ? { color: "red" } : { color: "green" }}>{capChange}%</h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">24 hr high :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 "><FormatPrice price={high} /></h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">24 hr low :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 "><FormatPrice price={low} /></h2>
              </td>
            </tr>

            <tr className='p-5 border-b border-white'>
              <td className='p-5'>
                <h1 className="font-extrabold md:w-6/12 capitalize">max supply :</h1>
              </td>
              <td className='p-5'>
                <h2 className="text-semibold w-6/12 ">{supply}</h2>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className="w-full p-5 text-center">
        <p dangerouslySetInnerHTML={{ __html: description }} className='text-xl leading-8 font-semibold mt-24'></p>
      </div>
    </div>
  )
}
