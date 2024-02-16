import { useEffect } from "react"
import { useTable } from "react-table"
import Spinner from "./Spinner"

const InfoTable = ({ name, columns, data }) => {

    return (

        <div className="w-full">
            <h1 className="text-center text-2xl text-primary-color p-6 font-semibold"> {name}</h1>

            {/* filters */}

            <div className=" bg-primary-color rounded-t-2xl rounded-b-xl px-2 md:px-4 py-4 md:py-4">

                <table className="table-auto w-full text-text-color mx-auto ">

                    <thead className="capitalize text-secondary-color">

                        {columns ?
                            (
                                <tr>

                                    {columns.map((item, key) => {
                                        <td key={key}>
                                            {item}
                                        </td>
                                    })}


                                </tr>
                            ) :
                            <tr>

                                <td>
                                    PID
                                </td>
                                <td>
                                    Name
                                </td>
                                <td>
                                    In Stock
                                </td>
                                <td>
                                    Sold
                                </td>

                            </tr>
                        }

                    </thead>

                    <tbody>


                        {data ? (
                            data.map((item, key) => {
                                return (
                                    <tr key={key} className="hover:bg-secondary-color/20 rounded-xl border-b-[2px] border-secondary-color/10">
                                        <td className="p-5" >
                                            {item.pid}
                                        </td>
                                        <td className="p-5">
                                            {item.name}
                                        </td>
                                        <td className="p-5">
                                            {item.stock}
                                        </td>
                                        <td className="p-5">
                                            {item.sold || 0}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <div className="w-0">
                                <Spinner />
                            </div>
                        )}
                    </tbody>


                </table>
            </div>

        </div>

    )
}

export default InfoTable