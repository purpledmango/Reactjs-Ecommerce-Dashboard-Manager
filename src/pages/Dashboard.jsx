import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import { LiaTruckSolid } from 'react-icons/lia';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { PiUsersBold } from 'react-icons/pi';
import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { IoTicketSharp } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import KPI from '../components/KPI';


// coontant data
import { revenueGraphData, revenueGraphOptions, topProductsData, ticketsKpiData, marginsKpiData, deliveryKpiData } from "../constants/dashboardConfig"
import KPIMultiData from '../components/KPIMultiData';


// Register the necessary components for Chart.js v3
Chart.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    document.title = "Dashboard - The NeighbourHOOOD Admin Dashboard";

    const [chartType, setChartType] = useState('bar');

    const toggleChartType = () => {
        setChartType((prevType) => (prevType === 'bar' ? 'line' : 'bar'));
    };

    return (
        <div className="w-full h-full bg-background-color ">
            <div className="p-5 w-full h-full">
                {/* KPIS */}
                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* New order KPIS */}
                    <KPI kpiName={'new orders'} kpiData={6000} kpiLogo={<LiaTruckSolid />} />
                    {/* Tickets KPI */}
                    <KPI kpiName={'Customer Tickets'} kpiData={27} kpiLogo={<IoChatboxEllipsesOutline />} />
                    {/* SALES KPI    */}
                    <KPI kpiName={'Sales/Revenue'} kpiData={'INR. 5000'} kpiLogo={<RiMoneyDollarCircleLine />} />
                    {/* New Users KPI    */}
                    <KPI kpiName={'New Users'} kpiData={56} kpiLogo={<PiUsersBold />} />
                </div>

                {/* Revenue Graph */}
                <div className="w-full  md:h-auto  justify-center grid grid-cols-12 my-12 py-6 gap-6 lg:gap-0 ">

                    <div className='col-span-12 md:col-span-8 lg:p-5 bg-primary-color overflow-x-scroll rounded-2xl text-accent-color font-semibold relative h-full my-auto flex flex-col justify-center items-center'>
                        {chartType === 'bar' ? (
                            <Bar data={revenueGraphData} options={revenueGraphOptions} />
                        ) : (
                            <Line data={revenueGraphData} options={revenueGraphOptions} />
                        )}
                        <button className='absolute top-0 m- 2 bg-accent-color px-6 py-3 rounded-xl text-background-color md:text-primary-color font-semibold lg:opacity-30 hover:opacity-100 capitalize tansition-all duration-300 ease-out hover:scale-105' onClick={toggleChartType}>{chartType === "bar" ? "Switch to Line" : "Switch to Bar"}</button>
                    </div>
                    {/* product info */}

                    <div className='col-span-12 md:col-span-4 w-full'>

                        <div className='flex flex-col gap-8  md:w-[80%] mx-auto'>
                            {/* TABLE DATA FOR TOP SELLING PRODUCTS */}
                            <div className='w-full p-5 bg-primary-color rounded-2xl shadow-3xl'>
                                <h3 className='text-2xl font-semibold py-6'>Top Selling Products</h3>


                                <div className='w-full'>
                                    <table className='table-auto hover:table-fixed w-full text-lg'>
                                        <thead className=''>
                                            <tr className='' >
                                                <th className='font-thin text-left py-4'>Product Name</th>
                                                <th className='font-thin text-left'>Quantity Sold</th>
                                                <th className='font-thin text-left'>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {topProductsData.slice(0, 6).map((item, key) => (
                                                <tr key={key} className=' w-full '>
                                                    <td className='py-2'>{item.productName}</td>
                                                    <td>{item.quantitySold}</td>
                                                    <td>{item.stock}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>


                            {/* TABLE DATA FOR TOP SELLING PRODUCTS */}
                            <div className='w-full p-5 bg-primary-color rounded-2xl shadow-3xl'>
                                <h3 className='text-2xl font-semibold py-6'>Top Selling Products</h3>


                                <div className='w-full'>
                                    <table className='table-auto hover:table-fixed w-full text-lg'>
                                        <thead className=''>
                                            <tr className='' >
                                                <th className='font-thin text-left py-4'>Product Name</th>
                                                <th className='font-thin text-left'>Quantity Sold</th>
                                                <th className='font-thin text-left'>Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {topProductsData.slice(0, 6).map((item, key) => (
                                                <tr key={key} className=' w-full '>
                                                    <td className='py-2'>{item.productName}</td>
                                                    <td>{item.quantitySold}</td>
                                                    <td>{item.stock}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-full h-auto flex lg:gap-24 lg:gap-24'>


                    <KPIMultiData kpiData={ticketsKpiData} kpiName={"Customer Tickets"} kpiLogo={<IoTicketSharp />} />
                    <KPIMultiData kpiData={marginsKpiData} kpiName={"Monthly Margins"} kpiLogo={<BsGraphUpArrow />} />
                    {/* <KPIMultiData kpiData={ticketsKpiData} kpiName={"Monthly Spiments"} kpiLogo={<LiaTruckSolid />} /> */}
                    <KPIMultiData kpiData={deliveryKpiData} kpiName={"Monthly Logistics"} kpiLogo={<LiaTruckSolid />} />
                    {/* <KPIMultiData kpiData={ticketsKpiData} kpiName={"Customer Tickets"} kpiLogo={<IoTicketSharp />} /> */}

                </div>
            </div>
        </div >
    );
};

export default Dashboard;
