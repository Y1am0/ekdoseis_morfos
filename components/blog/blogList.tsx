'use client';

import { Article } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';
import { CardComponent } from '../ui/cardComponent';

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

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const createSnippet = (html: string) => {
    const cleanText = stripHtml(html);
    return cleanText.substring(0, 250) + '...';
  };

  if (!articles.length)
    return (
      <div className="bg-background flex min-h-screen w-full flex-col px-4 md:px-16 pt-12">
        <main className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group w-full">
              <div className="animate-loading relative">
                <div className="text-foreground absolute left-4 top-4 z-20 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-gray-200 shadow-lg lg:-left-4 lg:-top-4"></div>
                <div className="rounded-md p-2 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
                  <div className="relative mx-auto flex h-96 w-full flex-col justify-end overflow-hidden rounded-md p-4 shadow-xl">
                    <div className="animate-loading absolute left-0 top-0 h-full w-full bg-gray-100"></div>
                    <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-t from-gray-300 via-transparent to-transparent opacity-60"></div>
                    <div className="relative z-10">
                      <div className="animate-loading relative z-10 my-4 h-6 w-3/4 rounded-md bg-gray-100"></div>
                      <div className="animate-loading relative z-10 my-4 h-4 w-1/2 rounded-md bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    );

  return (
    <div className="bg-background flex min-h-screen w-full flex-col px-4 md:px-16 pt-12">
      <main className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => (
          <div key={article.id}>
            <CardComponent
              title={article.title}
              snippet={article.summary_html ? createSnippet(article.summary_html) : createSnippet(article.body_html)}
              image={article.image?.src || '/placeholder.svg'}
              link={`/blog/${article.id}`}
              date={article.published_at || 'Unknown'}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default BlogList;
