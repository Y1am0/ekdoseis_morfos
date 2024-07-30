// app/blog/[id]/page.tsx
import BlogPost from '@/components/blog/blogPost';
import Footer from '@/components/layout/footer';

export default function BlogPostPage() {
  return (
    <>
      <BlogPost />
      <Footer />
    </>
  );
}
