const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = currentYear;
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="mt-12 bg-gray-100 text-sm text-gray-400">
      <div className="py-6 text-sm">
        <div className="mx-auto flex w-full flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-8 lg:px-16">
          <p>
            &copy; {copyrightDate} <span className="font-bold">{copyrightName}</span>
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>
            Created by{' '}
            <span className="hover:text-foreground font-bold transition-colors duration-300 ease-in-out">
              GeneratedByHumans
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
