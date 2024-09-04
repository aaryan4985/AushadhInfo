import React from "react";
import Box from "@/components/Box";

interface WebsiteLinkProps {
  name: string;
  url: string;
  description: string;
}

const WebsiteLink: React.FC<WebsiteLinkProps> = ({
  name,
  url,
  description,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-2 bg-black rounded-lg shadow hover:bg-neutral-800 transition duration-200"
    >
      <h4 className="text-xl font-bold text-white mb-2">{name}</h4>
      <p className="text-gray-500">{description}</p>
    </a>
  );
};

const General: React.FC = () => {
  return (
    <Box className="flex-1 p-2 overflow-y-auto bg-sky-400">
      <h2 className="text-xl font-bold text-white mb-4">
        Healthcare and Medicare Websites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <WebsiteLink
          name="National Health Portal of India"
          url="https://www.nhp.gov.in/"
          description="Provides information on health-related topics, government health schemes, and policies in India."
        />
        <WebsiteLink
          name="Pradhan Mantri Jan Aushadhi Yojana (PMJAY)"
          url="http://janaushadhi.gov.in/"
          description="A government initiative to provide affordable generic medicines to the people of India through Jan Aushadhi Kendras."
        />
        <WebsiteLink
          name="Central Drugs Standard Control Organization (CDSCO)"
          url="https://cdsco.gov.in/"
          description="The regulatory body for pharmaceuticals and medical devices in India."
        />
        <WebsiteLink
          name="All India Institute of Medical Sciences (AIIMS)"
          url="https://www.aiims.edu/en.html"
          description="One of India's top medical institutes providing comprehensive medical education and healthcare services."
        />
        <WebsiteLink
          name="National Health Mission (NHM)"
          url="https://nhm.gov.in/"
          description="A government initiative to improve healthcare delivery across India with a focus on rural areas."
        />
      </div>
    </Box>
  );
};

export default General;
