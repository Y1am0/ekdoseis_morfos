// app/blog/page.tsx
import BlogList from '@/components/blog/blogList';
import Footer from '@/components/layout/footer';

export default function BlogPage() {
  return (
    <>
      <BlogList />
      <Footer />
    </>
  );
}
