import Footer from '@/components/layout/footer';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      {/* <Carousel />
      <ThreeItemGrid /> */}
      <Footer />
    </>
  );
}
