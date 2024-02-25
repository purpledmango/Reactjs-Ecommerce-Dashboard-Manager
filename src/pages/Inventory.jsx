import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import GraphKPI from "../components/GraphKPI"
import KPI from "../components/KPI"
import InfoTable from '../components/InfoTable';
import Button from '../components/Button';
import ProductFrom from '../components/ProductFrom';
import { allCategories, recentlyAddedProductsAPI, allTags, allProductsKPI, activeProductsKPI } from '../services/inventoryAPIS';

import CategoryManager from '../components/Widgets/CategoryManager';
import TagManager from '../components/Widgets/TagManager';
import Spinner from '../components/Spinner';

const Inventory = () => {
    document.title = "Inventory Status - The NeighbourHOOOD Admin Dashboard";
    const [showProductForm, setShowProductForm] = useState(false)
    const [recentlyAdded, setRecentlyAdded] = useState([])
    const [categoryData, setCategoryData] = useState(null)
    const [allProdKPI, setAllProdKPI] = useState(null)
    const [activeProdKPI, setActiveProdKPI] = useState(null)
    const [tagData, setTagData] = useState(null)
    const columns = [
        "name",
        "sold",
        "in-stock",
        "profit"
        // Add more columns as needed
    ];

    const fetchKPIData = async () => {
        try {

            const productRes = await allProductsKPI();

            setAllProdKPI(productRes.data)
            const activeRes = await activeProductsKPI();
            setActiveProdKPI(activeRes.data)

        } catch (error) {
            console.log("Error with fetching KPI")
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await allCategories()
            setCategoryData(response.data)
        } catch (error) {
            console.log("Error whiel Fetching Category", error)
        }
    }
    const fetchTags = async () => {
        try {
            const response = await allTags()
            setTagData(response.data)
        } catch (error) {
            console.log("Error whiel Fetching Tags", error)
        }
    }

    // Dummy data, replace it with your actual product data
    const data = [
        { pid: "456-98", name: 'Blue Jacket', stock: 5665, sold: 652 },
        { pid: "4598", name: 'Brown Dress', stock: 5665, sold: 652 },
        { pid: "655-98", name: 'Woolen Cap', stock: 5665, sold: 652 },
        { pid: "8965-98", name: 'Gloves', stock: 5665, sold: 652 },
        { pid: "458965", name: 'Tall Boots', stock: 5665, sold: 652 },
        { pid: "49ss8", name: 'Bell Bootoms', stock: 5665, sold: 652 },

    ];
    const fetchRecentlyAddedData = async () => {
        try {
            const resposne = await recentlyAddedProductsAPI()
            setRecentlyAdded(resposne.data)
            console.log("Response of Recently Added Products", resposne)

        } catch (error) {
            console.log("Error while Fetching", error)
        }
    }

    useEffect(() => {
        fetchRecentlyAddedData();
        fetchTags();
        fetchCategories();
        fetchKPIData();

        // Fetch data every 15 seconds
        const intervalId = setInterval(() => {
            fetchRecentlyAddedData();
            fetchCategories();
        }, 15000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const triggerProductForm = () => {
        setShowProductForm(!showProductForm);
    };

    return (
        <div className="w-full h-auto bg-background-color p-4 md:p-12">
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-4">
                <div className='w-full'>
                    <KPI kpiName={'Total Category'} kpiData={categoryData ? categoryData.length : <Spinner />} />
                </div>
                <div className='w-full'>
                    <KPI kpiName={'Tags'} kpiData={tagData ? tagData.length : <Spinner />} />
                </div>
                <div className='w-full'>
                    <KPI kpiName={'All Products'} kpiData={allProdKPI ? allProdKPI : <Spinner />} />
                </div>
                <div className='w-full'>
                    <KPI kpiName={'Active Products'} kpiData={activeProdKPI ? activeProdKPI : <Spinner />} />
                </div>


            </div>
            <div className='grid grid-cols-12 py-6 gap-4'>

                {/* Manage Categories */}

                <div className=' col-span-12 md:col-span-6 '>

                    <CategoryManager />
                </div>


                <div className=' col-span-12 md:col-span-6 '>

                    <TagManager />
                </div>





            </div>
            <div className='flex w-full flex-col justify-center my-6 '>
                <div className='w-full flex items-center justify-between'>
                    {!showProductForm && (<div onClick={triggerProductForm} className=' h-full'>
                        <Button text="Add Products" />
                    </div>)}

                </div>

                <div className={`mt-4 w-full overflow-hidden transform transition-all duration-500 ${showProductForm ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 mt-0 h-0"}`}>
                    <ProductFrom showProductForm={showProductForm} setShowProductForm={setShowProductForm} />
                </div>

                <div className='w-full'>

                    <InfoTable name={"Recently Added Products"} columns={columns} data={recentlyAdded} />

                </div>

            </div>

            <div className="my-6">

                {/* <ProductTable columns={columns} data={data} /> */}
                <div className='grid grid-cols-12 gap-12  '>
                    <div className='col-span-12 md:col-span-6'>
                        <InfoTable name={"Most Sold Products"} columns={columns} data={recentlyAdded} />
                    </div>
                    <div className='col-span-12 md:col-span-6'>
                        <InfoTable name={"Almost Out of stuck"} columns={columns} data={recentlyAdded} />
                    </div>

                </div>

            </div>


        </div >
    );
};

export default Inventory;
