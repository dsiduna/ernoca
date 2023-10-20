
import React from "react";
import { useSelector } from "react-redux";
import Modal from '../Modal';
import Congratulations from '../adminComponents/Congratulations';
import EnlistCar from "../publicModals/EnlistCar";
import EnlistAccessory from "../publicModals/enlistAccessory";

function PublicModalHOC({ open, setOpen }) {
    const { modal: menu } = useSelector((state) => state?.modal);
    switch (menu) {
        case 'Enlist Car':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    content={<EnlistCar />}
                    title="Enlist Car"
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
        case 'Enlist Accessory':
            return (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    size='w-[600px] h-[548px]'
                    content={<EnlistAccessory />}
                    title="Enlist Accessory"
                />
            );
        default:
            break;
    }
}
export default PublicModalHOC;