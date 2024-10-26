"use client";
import Image from 'next/image';
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, RadialBar, Legend, RadialBarChart } from 'recharts';


export default function CountChart({boys, girls}: {boys: number, girls: number}) {
  const data = [
    {
      name: 'Total',
      count: boys + girls,
      fill: "#fff",
    },
    {
      name: 'Girls',
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: 'Boys',
      count: boys,
      fill: "#C3EBFA",
    },
  ];

  return (

    <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" outerRadius="100%" innerRadius={"40%"} barSize={20} data={data}>
          <RadialBar label={{position: 'insideStart', fill: "#fff"}} background dataKey={"count"} />
        </RadialBarChart>
      </ResponsiveContainer>

  )



}
