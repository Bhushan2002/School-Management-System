'use client'
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar= ()=>{
    return (
        <div className="flex items-center justify-between p-4">

            {/* searchbar             */}
            <div className="hidden md:flex items-center gap-2 text-xs  px-2  border-gray-300 border rounded-2xl">
                <Image src="/search.png" alt="" width={14} height={14}/>
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none " />
            </div>
            {/* user and icons */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="bg-white rounded-full justify-center w-7 h-7 items-center cursor-pointer ">
                    <Image src="/fees.png" alt="" width={20} height={20}/> 
                </div>
                <div className="bg-white rounded-full justify-center w-7 h-7 items-center cursor-pointer relative">
                    <Image src="/announcement.png" alt="" height={20} width={20 }/> 
                    <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs"  >1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">Bhushan Waghode</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                {/* <Image src="/avatar.png" alt="" height={36} width={36} className="rounded-full"/> */}
                <UserButton/>
            </div>

        </div>

    );
};

export default Navbar;