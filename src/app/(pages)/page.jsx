import Link from "next/link";

const LadingPage = () => {
  return (
    <div className="max-w-[2520px] mx-autoxl:px-20 md:px-10 sm:px-2 px-4">
      <div className="flex bg-gray-100 py-24 justify-center">
        <div className="p-12 text-center max-w-2xl">
            <div className="md:text-3xl text-3xl font-bold">Discover and easily select your favorite events with us!</div>
            <div className="text-2xl font-normal mt-4">Enjoy your time!</div>
            <div className="mt-6 flex justify-center h-12 relative">
                <Link href={'/event'} className="flex shadow-md font-medium absolute py-2 px-4 text-white cursor-pointer bg-gray-800 rounded text-lg tr-mt  svelte-jqwywd uppercase">Events</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LadingPage
