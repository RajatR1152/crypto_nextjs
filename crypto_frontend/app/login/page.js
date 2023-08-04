'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/context/LoginContext';

export default function page() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const router = useRouter();
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setUser({ ...user, [n]: v });
    }

    function submit() {
        axios.post('http://localhost:5000/login', user).then((res) => {
            const userJson = JSON.stringify(res.data);
            localStorage.setItem('user', userJson);
            document.getElementById('warning').innerText = ' ';
            setIsLogedIn(true);
            router.push('/');

        }).catch(() => {
            document.getElementById('warning').innerText = 'invalid username or password';
        })
    }

    return (
        <div className="w-full flex flex-row">
            <div className="w-full bg-blue-950 md:w-4/12 p-5 h-screen">
                <div className="w-full md:w-10/12 my-10 h-fit p-5 mx-auto">
                    <h1 className="text-center text-4xl font-bold">Log in</h1>

                    <div className="my-5 mt-16">
                        <h1 className="text-2xl font-semibold my-5">username</h1>
                        <input type="text" name='username' value={user.username} onChange={handle} className="p-3 text-black  w-full focus:outline-none" placeholder='username...' />
                    </div>

                    <p id='warning' className="text-orange-300 text-xl font-bold"></p>

                    <div className="my-5">
                        <h1 className="text-2xl font-semibold my-5">password</h1>
                        <input type="password" name='password' value={user.password} onChange={handle} className="p-3 text-black w-full focus:outline-none" placeholder='password...' />
                    </div>

                    <button onClick={submit} className="w-full p-4 mt-8 text-xl font-bold text-white bg-violet-900">Log in</button>
                </div>

                <span className="text-xl font-bold text-center w-fit mx-auto flex flex-row mt-5"> <p>dont have account ? </p><Link className='text-blue-400' href={'/register'}>create acount</Link></span>

            </div>
            <div className="hidden md:flex md:w-8/12 p-5 flex-row bg-gray-900">
                <div className="w-6/12">
                    <img src="https://images.ctfassets.net/s9sj79zoigw1/5NXhLYXFYe3BA3aEBcjW5t/8b5534484700abf6be78f1bb57ca2cda/header-wallet_2.png" className='w-full' alt="" />
                </div>
                <div className="w-5/12 h-fit mt-16 justify-center items-center">
                    <h1 className="text-4xl font-extrabold">
                        Buy and sell Cryptos with cards..
                    </h1>
                    <p className="text-xl mt-16 font-bold leading-9">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nam vero beatae perspiciatis accusamus esse. Voluptatum,
                        amet facere magnam iste fuga, quod optio distinctio perspiciatis
                        obcaecati nisi, iusto corrupti fugit cum?
                    </p>
                </div>
            </div>
        </div>
    )
}
