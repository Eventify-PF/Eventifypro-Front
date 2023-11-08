import { PlusIcon } from '@heroicons/react/24/outline';
import Search from "../Search";
import Event from "./Event";
import Link from 'next/link';
const EventList = ({ events }) => {
  return (
    <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
      <div className="mt-4 mx-4 flex w-full items-center justify-between">
      <h1 className="text-3xl uppercase">Events</h1>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search event..." />
          <Link
            href="/admin/create-ticket"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-2 mx-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <span className="hidden md:block">Create Ticket</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
          </Link>
      </div>
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
