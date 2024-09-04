"use client";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Box from "@/components/Box";
import NewsItem from "./NewsItems";
import Loader from "./Loader";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const News: React.FC = () => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=healthcare+OR+medicine&language=en&sortBy=publishedAt&apiKey=d4bc7b9933834781ae98e7f71b593ee1&pageSize=100`;
      const response = await fetch(url);
      const parsedData = await response.json();

      const filteredArticles = parsedData.articles.filter(
        (article: any) =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
      );

      setData(filteredArticles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const fetchMoreNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=d4bc7b9933834781ae98e7f71b593ee1&pageSize=12`;



    const response = await fetch(url);
    const parsedData = await response.json();

    if (parsedData.articles.length > 0) {
      const filteredArticles = parsedData.articles.filter(
        (article: any) =>
          article.title !== "[Removed]" &&
          article.description !== "[Removed]" &&
          article.urlToImage !== "[Removed]"
      );

      setData((prevData) => prevData.concat(filteredArticles));
      setTotalResults(parsedData.totalResults);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Box className="bg-white h-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-3 pl-3 pr-1">
          <div
            id="scrollableDiv"
            className="h-[85vh] overflow-y-auto"
          >
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreNews}
              hasMore={data.length < totalResults}
              scrollableTarget="scrollableDiv"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.map((element, index) => (
                  <div
                    className="col-span-1"
                    key={`${element.url}-${index}`}
                  >
                    <NewsItem
                      title={
                        element.title
                          ? element.title.length >= 50
                            ? `${element.title.slice(0, 50)}...`
                            : element.title
                          : ""
                      }
                      description={
                        element.description
                          ? element.description.length > 110
                            ? `${element.description.slice(0, 110)}...`
                            : element.description
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                      }
                      articleUrl={element.url}
                      publishedDate={element.publishedAt}
                      sourceName={
                        element.source.name
                          ? element.source.name.length > 20
                            ? `${element.source.name.slice(0, 20)}...`
                            : element.source.name
                          : ""
                      }
                    />
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </Box>
  );
};

export default News;