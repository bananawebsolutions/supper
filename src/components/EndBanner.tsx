import Image from "next/image";
import Link from "next/link";
import { BannerData } from "../../types";
import { getBannersData } from "../lib/getData";
import { urlFor } from "../sanity/lib/image";

const EndBanner = async () => {
    const banners: BannerData[] = await getBannersData();
    const endBanner = banners[2];

    return (
        <div className="py-10">
            <div className="relative overflow-hidden bg-gray-100 rounded-2xl">
                {/* Content Container */}
                <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-10 py-10 lg:py-24">
                    <div className="max-w-2xl">
                        <h2
                            id="banner-heading"
                            className="text-3xl font-bold tracking-tight sm:text-4xl"
                        >
                            {endBanner?.title}
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            {endBanner?.description}
                        </p>

                        {/* Call to Action */}
                        <Link
                            href={"/paquetes"}
                            className="mt-8 inline-flex items-center rounded-full bg-primaryRed px-8 py-3 text-sm font-semibold text-white hover:bg-red-400 hoverEffect"
                        >
                            Ver Paquetes
                        </Link>
                    </div>
                </div>
                <div className="relative flex justify-center lg:absolute lg:right-0 -top-10 lg:top-0 bottom-0 bg-center">
                    <Image
                        src={urlFor(endBanner?.image).url()}
                        alt="Banner paquetes"
                        width={500}
                        height={500}
                        loading="lazy"
                        className="max-w-[400px] p-0 sm:p-6"
                    />
                </div>
            </div>
        </div>
    );
};

export default EndBanner;
