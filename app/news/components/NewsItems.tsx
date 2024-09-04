import React from "react";

interface NewsItemProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  publishedDate: string;
  sourceName: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  imageUrl,
  articleUrl,
  publishedDate,
  sourceName,
}) => {
  if (
    title !== "[Removed]" &&
    description !== "[Removed]" &&
    imageUrl !== "[Removed]"
  ) {
    return (
      <a
        href={articleUrl}
        rel="noreferrer"
        target="_blank"
        className="no-underline"
      >
        <div className="flex flex-col bg-gray-200 hover:border-black hover:shadow-md hover:shadow-gray-400 border rounded-lg shadow-md overflow-hidden p-2">
          <img
            src={imageUrl}
            className="w-full h-28 rounded-md object-cover"
            alt="news"
          />
          <div className="flex flex-col p-2 flex-grow">
            <h5 className="text-lg font-bold text-gray-900 mb-2">{title}</h5>
            <p className="text-sm text-gray-600 flex-grow">
              {description.length > 110
                ? description.slice(0, 110) + "..."
                : description}
            </p>
            <small className="text-gray-500 mt-2 text-xs">{formatDate(publishedDate)}</small>
          </div>
        </div>
      </a>
    );
  } else {
    return null;
  }
};

export default NewsItem;
