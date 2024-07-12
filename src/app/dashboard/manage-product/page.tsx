//@ts-nocheck
"use client"
import ProductTable from '@/components/component/ProductTable';
import { useGetProductsQuery } from '@/redux/services/productApi';
import { useSession } from 'next-auth/react';
import React from 'react';

const ManageProductPage = () => {
    const { data: session, status } = useSession();
    const {data, error, isLoading} = useGetProductsQuery({})
    if(isLoading){
        return <p>Loading...</p>
    }

    if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session || session?.user?.role !== 'ADMIN') {
		return <div>Unauthorized access.</div>;
	}

    return (
        <div>
            {/* <h2>this is its</h2> */}
            <ProductTable />
        </div>
    );
};

export default ManageProductPage;