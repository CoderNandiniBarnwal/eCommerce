export default function Banner() {
    return (<>
        <div className="relative w-full">
            <img
                src="banner.jpg"
                alt="banner"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 flex justify-center md:justify-end items-center px-4 md:px-10">
                <div className="w-full md:w-1/2 text-center md:text-right">
                    <span className="bg-orange-600 px-3 py-1 text-sm sm:text-base md:text-2xl font-semibold mb-2 inline-block">
                        Best Prices
                    </span>
                    <h1 className="font-extrabold text-3xl sm:text-4xl md:text-6xl leading-snug">
                        Incredible Prices on All Your Favorite Items
                    </h1>
                    <p className="text-sm sm:text-lg md:text-3xl font-bold text-gray-400 mt-2">
                        Get more for less on selected brands
                    </p>
                    <button className="mt-4 md:mt-6 bg-orange-600 px-4 py-2 sm:px-6 sm:py-3 md:px-4 md:py-2 font-bold text-lg sm:text-xl md:text-2xl rounded-2xl">
                        Shop Now
                    </button>
                </div>
            </div>
        </div></>)
}