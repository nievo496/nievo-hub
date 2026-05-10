import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Links | NievoHub",
  description: "Official social media, community links, and support for NievoHub.",
  keywords: ["NievoHub links", "Nievo Twitch", "Nievo YouTube", "Disney Speedstorm community"],
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