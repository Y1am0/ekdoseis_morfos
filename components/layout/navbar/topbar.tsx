import Image from 'next/image';
import Link from 'next/link';
import phoneIcon from '../../../public/phone.svg';
import userIcon from '../../../public/user.svg';

const LINKS = [
  { href: '/', label: 'οι εκδόσεις' },
  { href: '/', label: 'επικοινωνία' },
  { href: '/', label: 'πολιτική απορρήτου' }
];

const ICON_LINKS = [
  { href: '/', icon: phoneIcon, label: '210 80 01 524' },
  { href: '/', icon: userIcon, label: 'Σύνδεση' }
];

const Topbar = () => {
  return (
    <div className="flex justify-end bg-gray-100 px-4 py-3 text-lg text-gray-400 md:justify-between md:px-8 md:text-sm lg:px-16 lg:text-base xl:text-lg">
      <div className="hidden space-x-6 md:flex lg:space-x-8">
        {LINKS.map((link) => (
          <Link
            key={link.label}
            className="transition-colors duration-150 hover:text-gray-600"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-6 max-md:w-full max-md:justify-between lg:gap-8">
        {ICON_LINKS.map((link) => (
          <Link
            key={link.label}
            className="group flex items-center transition-colors duration-150 hover:text-gray-600"
            href={link.href}
          >
            <span className="pr-3 md:pr-2 lg:pr-3">
              <Image
                className="h-auto w-5 group-hover:brightness-75 group-hover:filter md:w-4 lg:w-5"
                src={link.icon}
                alt={`${link.label} icon`}
                width={20}
                height={20}
              />
            </span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topbar;
