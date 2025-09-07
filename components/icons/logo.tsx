import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="relative font-bold text-2xl text-white tracking-wide">
        Trendly
        {/* Red dot accent */}
        <span className="absolute -top-1 -right-3 w-2.5 h-2.5 bg-[#ff3b8d] rounded-full"></span>
      </span>
    </Link>
  );
};

export default Logo;
