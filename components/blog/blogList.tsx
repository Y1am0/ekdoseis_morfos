// components/BlogList.tsx
'use client';

import { Article } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BlogList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      const data: Article[] = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  if (!articles.length) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: '20px' }}>
            {article.image && (
              <Image
                src={article.image.src}
                alt={article.image.alt || article.title}
                width={article.image.width}
                height={article.image.height}
              />
            )}
            <h2>{article.title}</h2>
            <div>{article.summary_html}</div>

            <Link href={`/blog/${article.id}`}>Read More</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
