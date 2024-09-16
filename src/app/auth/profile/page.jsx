"use client"
import React from 'react'
import {useGetSingleUserQuery} from '@/store/services/UserApi'
import { useRouter } from 'next/navigation'
const Profile = () => {
  const router = useRouter()
  const { data, error, isLoading } = useGetSingleUserQuery();
const user = data?.data
if (!data) {
  router.push('/auth/login')
}
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>

  )
}

export default Profile
