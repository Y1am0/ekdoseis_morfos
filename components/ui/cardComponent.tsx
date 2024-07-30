'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CardComponentProps {
  title: string;
  snippet: string;
  image: string;
  link: string;
  date: string;
}

export function CardComponent({ title, snippet, image, link, date }: CardComponentProps) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('el-GR', { month: 'short' });

  return (
    <div className="group w-full max-w-xs">
      <div className="relative">
        <div className="text-foreground absolute left-4 top-4 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-lg lg:-left-4 lg:-top-4">
          <span className="text-xl font-bold">{day}</span>
          <span className="text-sm">{month}</span>
        </div>
        <div className="rounded-md p-2 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
          <Link
            href={link}
            className={cn(
              'relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl'
            )}
          >
            <div
              className="absolute left-0 top-0 h-full w-full bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url('${image}?auto=format&fit=crop&w=1651&q=80')` }}
            ></div>
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"></div>
            <div className="relative z-10">
              <h1 className="relative z-10 text-xl font-bold text-gray-50 md:text-2xl">{title}</h1>
              <div
                className="relative z-10 my-4 text-sm font-normal text-gray-50"
                dangerouslySetInnerHTML={{ __html: snippet }}
              ></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
