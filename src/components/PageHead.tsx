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
    // Title
    document.title = title;

    // <meta name="description">
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

    // Open Graph (nice to have)
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

  }, [title, description, iconHref, ogTitle, ogDescription, ogImage]);

  return null;
}
