      
'use client';
import Announcement from "@/components/Announncement";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import dynamic from "next/dynamic";

const ParentPage = () => {
  return <div className="pp-4 flex gap-4 flex-col xl:flex-row ">
    {/* left */}
    <div className="w-full xl:w-2/3">
    <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold">Schedule (babu rao)</h1>
        <BigCalendar/>
    </div>

    </div>
    {/* right */}
    <div className="w-full xl:w-1/3 flex flex-col gap-8">
      <EventCalendar/>
      <Announcement/> 
      
      </div>
  </div>;
};




export default ParentPage;
