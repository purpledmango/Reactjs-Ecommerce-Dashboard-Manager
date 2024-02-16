const KPIMultiData = ({ kpiName, kpiLogo, kpiData }) => {
    return (
        <div className="h-56 w-full pr-6 pt-6  rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all ease-out duration-300 bg-primary-color flex flex-col items-center justify-evenly">
            <div className="flex items-center justify-between w-full mx-auto">
                <div className="w-3/4 flex flex-col items-start justify-between gap-6 ">
                    <h6 className="text-xl font-base capitalize ml-6">{kpiName}</h6>

                </div>
                <div className="w-1/4 text-5xl text-secondary-color flex justify-end mr-6">
                    {kpiLogo}
                </div>

            </div>
            {kpiData && (
                <div className="px-8 w-full h-full flex flex-col items-center justify-center gap-6">
                    {kpiData.map((item, key) => {
                        return (
                            <div className="w-full flex items-center justify-between">
                                <span className="font-bold text-lg text-secondary-color capitalize"> {item.name}</span>
                                <span className="text-xl ">{item.data}</span>
                            </div>

                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default KPIMultiData;
