

import errorOutLine from '../assets/errorOutline.svg';
import Image from 'next/image';

const AlertAtom = ({
    action,
    msg,
    buttonLabel,
    isHideButton = false,
    borderSize = 0,
    width = "auto",
    bg = "#fff1ed",
    py = 4,
    mt = 4,
    mb = 4,
    isLoading = false,
    isLoadingText = "",
}) => {
    return (
        <div
            onClick={() => {
                action();
            }}
            className={`flex justify-center bg-white-900 text-center py-${py} mt-${mt} mb-${mb}  `}
        >
            <div
                className={`w-[${width}]  border-[#FF9502] p-2 cursor-pointer items-center text-indigo-100 leading-none rounded-lg flex lg:inline-flex`}
                style={{ backgroundColor: bg, borderWidth: borderSize }}
                role="alert"
            >
                <Image
                    src={errorOutLine}
                    alt=''
                    width={24}
                    height={24}
                />
                <span
                    className="font-semibold mr-2 text-left flex-auto"
                    style={{ color: "#58534D", fontSize: 13 }}
                >
                    {msg}
                </span>
                {!isHideButton &&
                    (isLoading ? (
                        <>
                            <span className="text-[8px] text-[#58534D]">{isLoadingText}</span>
                        </>
                    ) : (
                        <span
                            className="flex rounded uppercase px-2 py-1 text-xs font-bold mr-3"
                            style={{ backgroundColor: "#ee2400", color: "#fff" }}
                        >
                            {buttonLabel}
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default AlertAtom