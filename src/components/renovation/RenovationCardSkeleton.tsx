function RenovationCardSkeleton() {
    return (
        <div className='w-full gap-5 rounded-lg flex flex-col py-3.5 px-5 h-[385px] bg-white shadow-2xl animate-pulse'>
            <div className='flex w-full justify-end'>
                <div className='w-16 h-6 bg-gray-300 rounded-lg'></div>
            </div>
            <ul className='text-base flex flex-col gap-2'>
                {[...Array(5)].map((_, i) => (
                    <li key={i} className='flex justify-start border-b py-1 items-center gap-2'>
                        <div className='w-5 h-5 bg-gray-300 rounded'></div>
                        <div className='w-2/3 h-4 bg-gray-300 rounded'></div>
                    </li>
                ))}
                <li className='flex justify-start flex-col items-start gap-2'>
                    <div className='flex font-bold w-full text-sm justify-between'>
                        <div className='w-8 h-4 bg-gray-300 rounded'></div>
                        <div className='w-10 h-4 bg-gray-300 rounded'></div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-gray-300 h-full w-1/2 rounded-full" />
                    </div>
                </li>
            </ul>
            <div className='w-full h-10 bg-gray-300 rounded-lg'></div>
        </div>
    );
}

export default RenovationCardSkeleton;
