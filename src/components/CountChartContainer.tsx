import prisma from "@/lib/prisma";
import CountChart from "./CountChart"
import Image from 'next/image';
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, RadialBar, Legend, RadialBarChart } from 'recharts';
const CountChartContainer = async () => {
    const data = await prisma.student.groupBy({
        by: ["sex"],
        _count: true
    })
    const boys = data.find(d=>d.sex === "MALE")?._count || 0;
    const girls = data.find(d=>d.sex === "FEMALE")?._count || 0;
    return ( <>
    <div className='bg-white rounded-xl w-full h-full p-4'>
    <div className='flex justify-between items-center'>
      <h1 className='text-lg font-semibold'>Students</h1>
      <Image src={'/moreDark.png'} alt="" width={20} height={20} />
    </div>
    {/* Title  */}
    {/* CHART  */}
    <div className='relative w-full h-[75%]'>
        <CountChart boys={boys} girls={girls} />
        <Image src={"/maleFemale.png"} alt="" width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
    </div>
    {/* Bottom  */}
    <div className='flex justify-center gap-16'>
      <div className='flex flex-col gap-1'>
        <div className='w-5 h-5 bg-uSky rounded-full' />
        <h1 className='font-bold text-u'>{boys}</h1>
        <h2 className='text-xs text-gray-300'>Boys ({Math.round((boys/(boys + girls)) * 100)}%)</h2>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='w-5 h-5 bg-uYellow rounded-full' />
        <h1 className='font-bold'>{girls}</h1>
        <h2 className='text-xs text-gray-300'>{"Girls " + (Math.round((girls/(boys + girls)) * 100)) + "%"}</h2>
      </div>
    </div>
    </div>
    </> );
}

export default CountChartContainer;