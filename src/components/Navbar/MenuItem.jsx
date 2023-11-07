import Link from "next/link";
const MenuItem = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <ul className="text-orange-500 text-xl hidden lg:flex items-center ">
        <li className="py-2 px-8 flex">
          <Link href={'/event'}>Events</Link>
        </li>
        <li className="py-2 px-8 flex">
          <Link href={'/about'}>About</Link>
        </li>
        <li className="py-2 px-8 flex">
          <Link href={'/admin'}>Admin</Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuItem;
