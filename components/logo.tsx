import LogoIcon from '@/public/Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={LogoIcon}
        alt="Logo Image"
        height={60}
        width={230}
        className="h-auto w-[200px] md:w-[160px] lg:w-[200px] xl:w-[230px]"
      />
    </Link>
  );
};

export default Logo;
