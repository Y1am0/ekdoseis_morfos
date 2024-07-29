import { SortFilterItem } from 'lib/constants';
import { Suspense } from 'react';
import FilterItemDropdown from './dropdown';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

// function FilterItemList({ list }: { list: ListItem[] }) {
//   return (
//     <>
//       {list.map((item: ListItem, i) => (
//         <FilterItem key={i} item={item} />
//       ))}
//     </>
//   );
// }

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {/* {title ? <h3 className="text-foreground hidden text-xs md:block">{title}</h3> : null}
        <ul className="hidden md:block">
          <Suspense fallback={null}>
            <FilterItemList list={list} />
          </Suspense>
        </ul> */}
        <ul>
          <Suspense fallback={null}>
            <FilterItemDropdown list={list} />
          </Suspense>
        </ul>
      </nav>
    </>
  );
}
