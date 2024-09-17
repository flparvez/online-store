"use client";
import axios from "axios";

import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useGetSingleUserQuery} from '@/store/services/UserApi'
import Link from "next/link";
import OrderTable from "@/components/user/orderTable"
export  default   function  ProfilePage() {
    const router = useRouter()
  const {data, isError} = useGetSingleUserQuery()
    const logout = async () => {
        try {
            await axios.get('/api/auth/logout')
            toast.success('Logout successful')
            router.push('/auth/login')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

const item =data?.data

if (!item) return <p>Loading...</p>;
if (isError) {
    router.push('/auth/login');
}
    return (

        <div className="flex">
     {/* SideBar */}
      <div className="flex-1 p-6">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="text-black">{item?.username}</h2>
          
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
        <OrderTable user={item} />
      </div>
    </div>
        <div>

       
        

     
</div>
            </div>
    )
}