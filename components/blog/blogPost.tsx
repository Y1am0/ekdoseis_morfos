'use client';

import { Article } from 'lib/shopify/types';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BlogPost = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const response = await fetch(`/api/articles/${id}`);
        const data: Article = await response.json();
        setArticle(data);
      };

      fetchArticle();
    }
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      {article.image && (
        <Image
          src={article.image.src}
          alt={article.image.alt || article.title}
          width={article.image.width}
          height={article.image.height}
        />
      )}
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
      {article.published_at ? (
        <p>Published on {new Date(article.published_at).toLocaleDateString()}</p>
      ) : (
        <p>Publication date not available</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: article.body_html }} />
    </div>
  );
};

export default BlogPost;
