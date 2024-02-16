const KPI = ({ kpiData, kpiName, kpiLogo }) => {
    return (
        <div className="h-36 w-full rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all ease-out duration-300 bg-primary-color flex items-center justify-evenly">
            <div className="flex items-center justify-between w-full">
                <div className="w-3/4 flex flex-col items-start justify-between gap-6 ml-12">
                    <span className="text-md font-light capitalize">{kpiName}</span>
                    <span className="text-3xl font-semibold">{kpiData}</span>
                </div>
                <div className="w-1/4 text-5xl text-secondary-color">
                    {kpiLogo}
                </div>
            </div>
        </div>
    );
};

export default KPI;
