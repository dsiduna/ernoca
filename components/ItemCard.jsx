import Image from "next/image";
import React from "react";
import { formatCurrency } from '../utils/formatCurrency'
import Link from "next/link";


export default function ItemCard(props) {

    const {
        id,
        description,
        price,
        year,
        mileage,
        colour,
        make,
        model,
        images,
        transmission,
        fuel,
        condition,
        location,
    } = props;


    return (
        <Link href={`/${id}`} target='_blank'>
            <div

                className="flex flex-col h-full border hover:scale-105 bg-white hover:bg-slate-50 cursor-pointer  justify-start items-start border-slate-100 "
            >
                <div className="h-64 w-full relative">
                    <Image
                        src={images ?
                            images[0] :
                            "https://www.intlmag.org/global_graphics/default-store-350x350.jpg"
                        }
                        alt="product image"
                        fill
                        // className=" h-60 "
                        //height={300}
                        //width={320}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </div>

                <div className="p-3">
                    <h1 className="text-xl font-bold">{`${make} ${model || "Item name"}`}</h1>
                    <h1 className="text-sm line-clamp-2 py-1 font-base ">
                        {condition ? condition : 'Pre-owned'}, {transmission ? transmission : 'Automatic'} {fuel} Engine Car
                    </h1>

                    <div className="my-auto"></div>

                    {/*<h1 className="text-2xl font-semibold py-2">
                    {/* ${e.price}{" "} */}{formatCurrency(price)}
                    <h1 className="text-sm text-slate-400">{colour}</h1>
                    <h1 className="text-xs text-slate-800 font-semibold">
                        Mnf: {year}, Mileage: {mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km.
                    </h1>
                    {location &&
                        <div className="flex items-center justify-center text-slate-400 pt-2 gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                width={18}
                                height={18}
                                color='#94a3b8'
                            >
                                <path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602"
                                />
                            </svg>
                            <span className="text-sm text-slate-400">

                                {location}
                            </span>
                        </div>
                    }
                </div>
            </div>
        </Link>
    );
}

export function SearchItemCard(props) {
    const {
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images,
    } = props;

    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/product-details/${id}`)}
            className="grid-cols-5 grid items-center lg:px-10 border-b justify-center cursor-pointer hover:bg-slate-50 p-3"
        >
            <div className="h-40 w-full relative">
                <Image
                    src={
                        thumbnail ??
                        "https://www.intlmag.org/global_graphics/default-store-350x350.jpg"
                    }
                    alt="product image"
                    layout="fill" // required
                    objectFit="cover"
                // className=" h-60 "
                />
            </div>

            <div className="col-span-2 md:col-span-3 mx-5   ">
                <p className="text-2xl line-clamp-1">
                    {title ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>
                <p className="text-base line-clamp-2">
                    {description ??
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eum sapiente expedita laudantium, debitis quisquam est, quae optio fugiat rem eos temporibus quis accusantium distinctio? Blanditiis eius possimus error suscipit beatae exercitationem fugit, velit libero. Quam, sit incidunt dolore at minus consequuntur tempore veritatis vel, pariatur ab vero magni unde."}
                </p>
                <h1 className="text-base font-semibold flex flex-row items-center text-blue-500">
                    {[...Array(Math.floor(rating))].map((e, i) => (
                        <svg
                            key={e}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4 text-yellow-400"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ))}{" "}
                    {/* ( {data.rating.count}) */}548
                </h1>

                <h1 className="text-2xl font-semibold py-2">
                    {/* ${e.price}{" "} */}${price}
                    <span className="line-through text-base text-slate-500 font-normal px-3">
                        {((price / 100) * 12.96 + price).toFixed(2)}
                        {/* 879 */}
                    </span>
                    <span className=" text-base text-red-500 font-medium">
                        {/* {(e.price + e.price * 0.36).toFixed(2)} */}
                        {discountPercentage}%OFF
                    </span>
                </h1>

                <h1 className="text-sm text-slate-400">10% Off on Select Cards</h1>
                <h1 className="text-sm text-slate-800 font-semibold">
                    Delivery within 2 days
                </h1>
            </div>
        </div>
    );
}

export const ItemLoadingCard = () => {
    return (
        <div className="p-4 border rounded bg-gray-200 animate-pulse">
            <div className="h-64 w-full bg-gray-300 rounded"></div>
            <div className="mt-4">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-2"></div>
            </div>
        </div>
    );
};
