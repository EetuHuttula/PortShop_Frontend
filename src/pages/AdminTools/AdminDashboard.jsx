import React from 'react'
import CategoriesList from '../../components/CategoryList.js'
import AddCategory from '../../components/AddCategory.js';
import AddProduct from '../../components/AddProduct.js'


export default function AdminDashboard() {
  return (
    <div className="container d-flex flex-row">
        <h1 className="">Admin dashboard</h1>
        <AddCategory/>
        <AddProduct />
        <CategoriesList />
    </div>
  )
}
