import { Bar, Line } from 'react-chartjs-2';

import { revenueGraphData, revenueGraphOptions } from '../constants/dashboardConfig';
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

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const GraphKPI = ({ name, data }) => {
    return (
        <div className="w-full h-auto bg-primary-color h-auto p-6 rounded-2xl flex flex-col items-start justify-evenly gap-6 ">
            <h2 className="text-2xl  font-thin">{name}</h2>
            <div className="flex flex-col w-full h-auto text-lg justify-start items-between gap-2">

                <span className="font-bold text-2xl">{data}</span>


            </div>
            <div className="bg-primary-color rounded h-auto w-full">
                <Bar data={revenueGraphData} options={revenueGraphOptions} />
            </div>

        </div>
    )
}

export default GraphKPI;