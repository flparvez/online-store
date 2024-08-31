
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <h2>Category List</h2>
      <h3><Link href='/admin/category/add'>Add Category</Link></h3>
    </div>
  )
}

export default page
