import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"
import ProductForm from "./ProductFrom"

const InfoTable = ({ name, columns, data }) => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(null)
    const [showUpdateForm, setShowUpdateForm] = useState(false)

    const handleRowClick = (index) => {
        setSelectedItemIndex(index === selectedItemIndex ? null : index)
    }

    useEffect(() => { }, [showUpdateForm])

    return (
        <div className="w-full">
            <h1 className="text-center text-2xl text-primary-color p-6 font-semibold">{name}</h1>

            <div className="bg-primary-color rounded-t-2xl rounded-b-xl px-2 md:px-4 py-4 md:py-4">
                <div className=" w-full text-text-color mx-auto">
                    <div className="capitalize text-secondary-color">
                        <ul className="flex justify-between">
                            {columns && columns.map((item, key) => (
                                <li key={key}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full">
                        {data ? (
                            data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ul
                                        onClick={() => handleRowClick(index)}
                                        className={` flex justify-between hover:bg-secondary-color/20 rounded-xl border-b-[2px] border-secondary-color/10 ${selectedItemIndex === index ? 'bg-secondary-color/20' : ''}`}
                                    >
                                        <li className="p-5">{item.pid}</li>
                                        <li className="p-5">{item.name}</li>
                                        <li className="p-5">{item.stock}</li>
                                        <li className="p-5">{item.sold || 0}</li>
                                    </ul>
                                    <div className="w-full mx-auto">
                                        {(selectedItemIndex === index) && (
                                            <ProductForm
                                                existingData={item}
                                                showProductForm={showUpdateForm}
                                                setShowProductForm={setShowUpdateForm}
                                            />
                                        )}
                                    </div>
                                </React.Fragment>
                            ))
                        ) : (
                            <div>
                                <div className="w-0">
                                    <Spinner />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoTable
