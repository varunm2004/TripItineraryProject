'use client';

import Image from "next/image";


import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link';

export default function Home() {

  const router = useRouter();

  const [city, setCity] = useState("");

  function cityChangeHandler () {
    setCity(event.target.value);
  }

  return (
    <div>
        <input 
          className="citySearch" 
          value={city}
          onChange={cityChangeHandler}
          placeholder="Enter a city name here..."
        />
        <button type='button' onClick={()=>{router.push(`/search/${city}`)}}>Search</button>
    </div>
  );
}
