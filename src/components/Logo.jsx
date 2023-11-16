import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image
          className="hidden md:block cursor-pointer"
          src="/images/logo.png"
          height="50"
          width="50"
          alt="EventyPro"
        />
        <h2 className="font-black text-2xl text-center text-orange-500 uppercase">
          EventifyPro
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
