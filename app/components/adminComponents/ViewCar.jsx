import React from 'react'
import { useSelector } from 'react-redux'

export const ViewCar = () => {
    const car = useSelector((state) => state.modal.car)
    console.log(car);
    return (
        <div>ViewCar</div>
    )
}
