import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import close from "../assets/close.svg";
import arrow_left from "../assets/arrow_left.svg";
import Image from "next/image";
const Modal = ({
    title,
    content,
    setOpen,
    open,
    onClose = setOpen,
    size = "max-w-3xl",
    showBackButton = false,
    BackButtonClick = () => { }
}) => {

    return (
        <>
            {open && (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-[100] " onClose={onClose}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>
                        <div className="w-rounded-2xl">
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel
                                            className={`relative transform overflow-hidden rounded-3xl
                     bg-white text-left shadow-xl transition-all xs:my-8 xs:w-full xs:max-w-lg  ${size}`}
                                        >
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div
                                                    onClick={() => {
                                                        setOpen(false);
                                                    }}
                                                    className="flex items-center justify-center float-right w-[36px] h-[37px] cursor-pointer mb-3"
                                                >
                                                    <Image
                                                        src={close}
                                                        alt=""
                                                        height={24}
                                                        width={24}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                {showBackButton && (
                                                    <p onClick={() => BackButtonClick("")}>
                                                        <Image
                                                            src={arrow_left}
                                                            alt=""
                                                            height={24}
                                                            width={24}
                                                        />
                                                    </p>
                                                )}
                                                <div className="sm:flex sm:items-center sm:justify-center">
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-[32px] xs:text-[24px] font-bold font-sans text-[#140C00] leading-6 text-center"
                                                        >
                                                            {title}
                                                        </Dialog.Title>
                                                        <div className="mt-2">{content}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            )}
        </>
    );
};

export default Modal;