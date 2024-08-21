import Image from 'next/image';
import CartIcon from 'public/shoppingbag.svg';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative text-base max-md:grid max-md:h-16 max-md:w-16 max-md:place-items-center max-md:rounded-full max-md:bg-white max-md:shadow-xl max-md:shadow-[#2563eb]/20 md:flex lg:gap-12 lg:text-lg xl:text-xl">
      <div className="flex items-center gap-2 py-3 xl:gap-3">
        <Image
          src={CartIcon}
          alt={'Cart Icon'}
          width={64}
          height={64}
          className="h-auto max-md:w-6 w-4 md:w-5 xl:w-6"
        />
        <span className="hidden md:block">καλάθι</span>
        <span className="absolute bottom-0 left-0 w-full md:h-1 md:origin-left md:scale-x-0 md:transform md:bg-[#2563eb] md:transition-transform md:duration-300 md:group-hover:scale-x-100"></span>
      </div>

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-1 -mt-1 h-6 w-6 rounded-full bg-blue-600 text-xs font-medium text-white md:h-4 md:w-4 xl:-mr-2 xl:-mt-2 xl:h-5 xl:w-5">
          <div className="grid h-full w-full place-items-center">{quantity}</div>
        </div>
      ) : null}
    </div>
  );
}
