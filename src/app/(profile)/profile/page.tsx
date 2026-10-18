"use server"
import React from 'react'
import Mainprofile from '../component/Mainprofile'
import { getMe } from '@/service/getMe'

const page =async () => {
  
  
  return (
    <div>
      <Mainprofile  ></Mainprofile>
    </div>
  )
}

export default page
