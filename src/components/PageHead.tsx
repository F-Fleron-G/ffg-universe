import { useEffect } from "react";

type Props = {
  title: string;
  description?: string;
  iconHref?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

export default function PageHead({
  title,
  description,
  iconHref,
  ogTitle,
  ogDescription,
  ogImage,
}: Props) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }

    // Favicon
    if (iconHref) {
      let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "icon");
        document.head.appendChild(link);
      }
      link.setAttribute("href", iconHref);
    }

    const setOG = (property: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[property='${property}']`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setOG("og:title", ogTitle ?? title);
    setOG("og:description", ogDescription ?? description);
    setOG("og:image", ogImage);

    // helper for <meta name="..."> (Twitter uses name=)
    const setName = (name: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[name='${name}']`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Make og:image absolute so sharing bots can fetch it
    const absoluteImage =
      ogImage
        ? (ogImage.startsWith("http") ? ogImage : `${location.origin}${ogImage}`)
        : undefined;

    // Open Graph
    setOG("og:title", ogTitle ?? title);
    setOG("og:description", ogDescription ?? description);
    setOG("og:image", absoluteImage);
    setOG("og:url", window.location.href);
    setOG("og:type", "website");
    setOG("og:site_name", "FFG Universe");

    // Twitter (mirrors OG)
    setName("twitter:card", "summary_large_image");
    setName("twitter:title", ogTitle ?? title);
    setName("twitter:description", ogDescription ?? description);
    setName("twitter:image", absoluteImage);


  }, [title, description, iconHref, ogTitle, ogDescription, ogImage]);

  return null;
}
