import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

interface HeadMetaProp {
  property?: string | undefined;
  content?: string | undefined;
  name?: string;
}

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: HeadMetaProp[];
  title?: string;
}

function SEO({ description, lang, meta, title }: SEOProps) {
  const site = {
    title: 'Environment',
    author: 'Blank',
    description: 'Build Things',
  };
  const metaDescription = description || site.description;
  const metaProps: HeadMetaProp[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{ title ? `${title} | ${site.title}` : site.title }</title>
      { metaProps.map((prop) => <meta key={prop.name || prop.property} name={prop.name} content={prop.content} property={prop.property} /> )}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
