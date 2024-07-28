import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import bookIcon from '@/public/book.svg';
import paperClip from '@/public/paperclip.svg';
import searchIcon from '@/public/search.svg';
import Logo from 'components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';

export default function Navbar() {
  const NAV_ITEMS = [
    { href: 'search/all', icon: bookIcon, label: 'e-shop' },
    { href: '#', icon: searchIcon, label: 'αναζήτηση' },
    { href: 'blogs/news', icon: paperClip, label: 'επικαιρότητα' }
  ];

  return (
    <nav className="flex items-center justify-between bg-[#f9f9fb] px-4 py-5 md:px-8 lg:px-16">
      <Logo />
      <ul className="flex gap-8 pl-12 text-base lg:gap-12 lg:text-lg xl:text-xl">
        {NAV_ITEMS.map((item) => (
          <li key={item.label} className="group relative hidden md:flex">
            <Link className="flex items-center gap-2 py-3 xl:gap-3" href={`${item.href}`}>
              <span>
                <Image
                  src={item.icon}
                  alt={`${item.label} icon`}
                  width={24}
                  height={24}
                  className="h-auto w-3 lg:w-5 xl:w-6"
                />
              </span>
              {item.label}
            </Link>
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-blue-600 transition-transform duration-300 group-hover:scale-x-100"></span>
          </li>
        ))}
        <div className="flex gap-4">
          <li className="group relative">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </li>
          <Suspense fallback={null}>
            <MobileMenu />
          </Suspense>
        </div>
      </ul>
    </nav>
  );
}

{
  /* <div className="hidden justify-center md:flex md:w-1/3">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div> */
}
{
  /* <div className="flex justify-end md:w-1/3">
        <Suspense fallback={<OpenCart />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
} */
}
