interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const defaultProps: Props = {
  description: "Developer and Tinkerer",
  ogImage: "https://deepso.sh/images/cover.jpg",
  title: "Deepso",
};

export const Head = (props: Props) => (
  <>
    <title>{props.title ?? defaultProps.title}</title>
    <meta
      name="description"
      content={props.description ?? defaultProps.description}
    />
    <link rel="canonical" href="https://deepso.com" />

    <meta property="og:title" content={props.title ?? defaultProps.title} />
    <meta
      property="og:description"
      content={props.description ?? defaultProps.description}
    />
    <meta property="og:image" content={props.ogImage ?? defaultProps.ogImage} />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="720" />
    <meta property="og:image:type" content="image/png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={props.title ?? defaultProps.title} />
    <meta name="twitter:description" content={props.description} />
    <meta
      name="twitter:image"
      content={props.ogImage ?? defaultProps.ogImage}
    />
    <meta name="twitter:image:width" content="1280" />
    <meta name="twitter:image:height" content="720" />
    <meta name="twitter:image:type" content="image/png" />

    <link
      rel="icon"
      href="/images/favicon.ico"
      sizes="48x48"
      type="image/x-icon"
    />
  </>
);
