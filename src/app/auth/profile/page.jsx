"use client"
import React from 'react'
import {useGetSingleUserQuery} from '@/store/services/UserApi'
const Profile = () => {
  const {data} = useGetSingleUserQuery()
  const user = data?.data;
  console.log(data?.data)

  if (!user) return <h2>Loading...</h2>
  return (
    <div>
      <h2 className='text-center text-2xl'>Profile</h2>
      <h2>Your Name Is :{user?.username} </h2>
    </div>
  )
}

export default Profile
