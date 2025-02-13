'use client';
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id:1,
        title: "lorem",
        time:" 12:00 PM - 2:00 PM",
        description: "lsfksndfn askfnslk dfhkeijamfm kalsdlkans ldkas ",
    },
    {
        id:2,
        title: "lorem",
        time:" 12:00 PM - 2:00 PM",
        description: "lsfksndfn askfnslk dfhkeijamfm kalsdlkans ldkas ",
    },
    {
        id:3,
        title: "lorem",
        time:" 12:00 PM - 2:00 PM",
        description: "lsfksndfn askfnslk dfhkeijamfm kalsdlkans ldkas ",
    },
    {
        id:4,
        title: "lorem",
        time:" 12:00 PM - 2:00 PM",
        description: "lsfksndfn askfnslk dfhkeijamfm kalsdlkans ldkas ",
    },
]

const EventCalendar=()=>{
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className="">
            <Calendar className='bg-white p-4 rounded-md' onChange={onChange} value={value} />
            <div className="flex flex-row justify-between items-center p-4">
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image src='/moreDark.png' alt="" width={20} height={20}/>
            </div>
            <div className="flex flex-col gap-4 p-4">
                {events.map(event=>(
                    <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-sky-200 even:border-t-secondaryElement" key={event.id}>
                        <div className="flex items-center justify-between ">
                            <h1 className="font-semibold text-gray-600">{event.title}</h1>
                            <span className="text-gray-300">{event.time}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default EventCalendar;