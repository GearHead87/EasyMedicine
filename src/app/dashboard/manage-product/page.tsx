"use client"
import ProductTable from '@/components/component/ProductTable';
import { useGetProductsQuery } from '@/redux/services/productApi';
import React from 'react';

const ManageProductPage = () => {
    const {data, error, isLoading} = useGetProductsQuery({})
    if(isLoading){
        return <p>Loading...</p>
    }
    console.log(data);
    return (
        <div>
            {/* <h2>this is its</h2> */}
            <ProductTable />
        </div>
    );
};

export default ManageProductPage;