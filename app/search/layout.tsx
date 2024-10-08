import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black">
        <Collections />
        <FilterList list={sorting} title="Ταξινόμηση:" />
        <div className="min-h-screen w-full md:order-none">{children}</div>
      </div>
      <Footer />
    </>
  );
}
