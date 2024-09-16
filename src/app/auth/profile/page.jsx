"use client"
import React from 'react'
import {useGetSingleUserQuery} from '@/store/services/UserApi'
const Profile = () => {
  const { data, error, isLoading } = useGetSingleUserQuery();
const user = data?.data
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
