import "./globals.css";

import { Section, Container } from "@/components/craft";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MobileNav } from "@/components/nav/mobile-nav";
import { Analytics } from "@vercel/analytics/react";
import { Button } from "@/components/ui/button";

import { mainMenu, contentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";


import Logo from "@/public/kumocode.png";
import cat from "@/public/luckycat.png";
import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { defaultSeoConfig } from "@/lib/seo-config";
import { getSiteOptions } from "@/lib/wordpress";
import { SocialFollow } from "@/components/blog/social-follow";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site_domain),
  title: {
    default: defaultSeoConfig.defaultTitle,
    template: defaultSeoConfig.titleTemplate,
  },
  description: defaultSeoConfig.description,
  openGraph: defaultSeoConfig.openGraph,
  twitter: defaultSeoConfig.twitter,
};

import { OrganizationJsonLd } from "next-seo";

import { BackToTop } from "@/components/back-to-top";
import { TableEnhancer } from "@/components/ui/table-enhancer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://secure.gravatar.com" />
        <link rel="dns-prefetch" href="https://secure.gravatar.com" />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <OrganizationJsonLd
            url={siteConfig.site_domain}
            logo={`${siteConfig.site_domain}/kumocode.png`}
            name={siteConfig.site_name}
          />
          <Nav />
          {children}
          <BackToTop />
          <TableEnhancer />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-7xl mx-auto py-4 px-6 sm:px-0 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo"
            priority
            className="dark:invert"
            width={170}
            height={26.44}
          ></Image>

        </Link>
        {children}
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="hidden sm:flex">
            <Link href="/#contact">Get Started</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

const Footer = async () => {
  const siteOptions = await getSiteOptions();

  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1fr_0.5fr_0.5fr_0.5fr] gap-8">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <Image
                src={cat}
                alt="cat"
                loading="lazy"
                className="dark:invert"
                width={80}
                height={26.44}
              ></Image>
            </Link>
            <p>{siteConfig.site_description}</p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold uppercase tracking-widest text-sm">Follow Us</h5>
            <SocialFollow links={siteOptions?.social_links} />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-bold uppercase tracking-widest text-sm mb-2">Service Areas</h5>
            <Link className="hover:underline underline-offset-4 font-medium" href="/web-development-cape-town">Cape Town</Link>
            <Link className="hover:underline underline-offset-4 font-medium" href="/web-development-johannesburg">Johannesburg</Link>
            <Link className="hover:underline underline-offset-4 font-medium" href="/web-development-durban">Durban</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-bold uppercase tracking-widest text-sm mb-2">Links</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4 font-medium"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <p className="text-muted-foreground">
            &copy; <a href="https://www.kumocode.co.za">Kumocode.co.za</a>. All rights reserved.
            2026.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link className="hover:underline underline-offset-4" href="/privacy-policy">Privacy Policy</Link>
            <Link className="hover:underline underline-offset-4" href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="hover:underline underline-offset-4" href="/cookie-policy">Cookie Policy</Link>
          </div>
        </Container>
      </Section>
    </footer>
  );
};
