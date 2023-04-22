import React from "react";
import Head from "next/head";
import siteMetadata from "../data/siteMetadata";

interface IHeadsProps {
  title: string;
  description: string;
  ogType: string;
  canonicalUrl: string;
  children?: React.ReactNode;
}

const HeadSEO: React.FunctionComponent<IHeadsProps> = ({
  title,
  description,
  ogType,
  canonicalUrl,
  children,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteMetadata.companyName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {children}
    </Head>
  );
};

export default HeadSEO;
