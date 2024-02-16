import { useEffect, useState } from "react";
import GraphKPI from "../components/GraphKPI";
import { newOrdersApi } from "../services/orders";
import InfoTable from "../components/InfoTable";
import { toast } from "react-toastify";

const Orders = () => {
    document.title = "Orders - The NeighbourHOOOD Admin Dashboard";
    const [orderData, setOrderData] = useState(null);

    const fetchNewOrders = async () => {
        try {
            const response = await newOrdersApi()
            console.log(response.data)
            setOrderData(response.data)

        } catch (error) {
            console.log("Error while Fetching Data", error)
        }
    }
    useEffect(() => {
        fetchNewOrders(); // Call the fetchNewOrders function
    }, [orderData]);


    console.log("New orders Data Fetched", orderData)

    return (
        <div className="w-full h-full  px-2 md:px-6">
            <div className=" h-auto">
                <div className="flex gap-4 ">
                    <div className="w-full h-86 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-4">
                        <div className='w-full'>
                            <GraphKPI name={'Total Orders'} data={2560} />
                        </div>
                        <div className='w-full'>
                            <GraphKPI name={'Total Delivered'} data={2560} />
                        </div>
                        <div className='w-full'>
                            <GraphKPI name={'Returns'} data={2560} />
                        </div>
                        <div className='w-full'>
                            <GraphKPI name={'Net Sales'} data={2560} />
                        </div>

                    </div>
                </div>
            </div>
            <div className="py-6">
                <div className="mt-12">
                    <InfoTable name={"New Orders Received"} data={orderData} />
                </div>
            </div>

            <div className="py-6">
                <div className="mt-12">
                    <InfoTable name={"Refunds"} data={orderData} />
                </div>
            </div>
            <div className="py-6">
                <div className="mt-12">
                    <InfoTable name={"Delivered"} data={orderData} />
                </div>
            </div>
        </div>
    )
}

export default Orders;