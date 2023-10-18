
import React from "react";
import { useSelector } from "react-redux";
import Modal from '../Modal'
import AddCar from '../adminComponents/AddCar'
import Congratulations from '../adminComponents/Congratulations'
import ViewCar from '../adminComponents/ViewCar'
import ViewAccessory from "../adminComponents/ViewAccessory";
import DeleteItem from '../adminComponents/DeleteItem';
import UpdateItem from '../adminComponents/UpdateItem';
import AddAccessory from '../adminComponents/AddAccessory';
import UpdateAccessory from '../adminComponents/UpdateAccessory';

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
                    size='w-[550px] h-[580px]'
                    title='Car'
                    content={<ViewCar />}
                />
            );
        case 'Delete Item':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[380px] h-[220px]'
                    title='Delete'
                    content={<DeleteItem closeModal={() => setOpen(false)} />}
                />
            );
        case 'Edit Item':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[550px] h-[540px]'
                    title='Edit'
                    content={<UpdateItem />}
                />
            );
        case 'Add Accessory':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    content={<AddAccessory />}
                    title="Add Accessory"
                />
            );
        case 'View Accessory':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[480px] h-[520px]'
                    title='Accessory'
                    content={<ViewAccessory />}
                />
            );
        case 'Update Accessory':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    content={<UpdateAccessory />}
                    title="Update Accessory"
                />
            )
        default:
            break;
    }
}
export default AdminModalHOC;