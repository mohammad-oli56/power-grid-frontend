"use server"
import React from 'react'
import Mainprofile from '../component/Mainprofile'
import { getMe } from '@/service/getMe'

const page =async () => {
     const data = await getMe()
  
  return (
    <div>
      <Mainprofile data={data.data} ></Mainprofile>
    </div>
  )
}

export default page
