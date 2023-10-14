
import React from "react";
import { useSelector } from "react-redux";
import Modal from '../Modal'
import AddCar from '../adminComponents/AddCar'
import Congratulations from '../adminComponents/Congratulations'
import { ViewCar } from "../adminComponents/ViewCar";

function AdminModalHOC({ open, setOpen }) {
    const { data: menu } = useSelector((state) => state?.modal);
    switch (menu) {
        case 'Add Car':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    content={<AddCar />}
                    title="Add Car"
                />
            );
        case 'Congratulations':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size="w-[380px] h-[260px]"
                    content={<Congratulations
                        closeModal={() => setOpen(false)}
                    />
                    }
                    title=''
                />
            );
        case 'View Car':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    title='Car'
                    content={<ViewCar />}
                />
            )
        default:
            break;
    }
}
export default AdminModalHOC;