import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Links | NievoHub",
  description: "Official social media, community links, and support for NievoHub.",
  keywords: ["NievoHub links", "Nievo", "Nievo links", "Nievo Bio", "Nievo Twitch", "Nievo YouTube", "Nievo Ko-fi", "Nievo Email", "Nievo Tier List", "Disney Speedstorm community"],
  openGraph: {
    title: "Connect with Nievo",
    description: "Social media links and community support for NievoHub.",
    url: "https://nievo-hub.vercel.app/links",
    siteName: "NievoHub",
    type: "website",
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
