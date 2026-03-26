import { Metadata } from 'next';
import { Section, Container } from '@/components/craft';
import { WebsiteSpeedTest } from '@/components/speed-test/website-speed-test';

export const metadata: Metadata = {
  title: 'Free Website Speed Test & SEO Audit | Kumocode',
  description: 'Test your website speed, SEO, and performance for free. Uncover hidden issues that are costing you customers and get actionable insights.',
  alternates: {
    canonical: '/free-website-speed-test',
  },
  openGraph: {
    title: 'Free Website Speed Test & SEO Audit',
    description: 'Find out exactly why your website is losing traffic. Run a free performance and SEO audit powered by Google Lighthouse instantly.',
    url: 'https://kumocode.co.za/free-website-speed-test',
    type: 'website',
  },
};

export default function FreeWebsiteSpeedTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Website Speed Test & SEO Audit",
    "url": "https://kumocode.co.za/free-website-speed-test",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "description": "Test your website speed, SEO, and performance for free. Uncover hidden issues that are costing you customers and get actionable insights.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "ZAR"
    },
    "provider": {
      "@type": "Organization",
      "name": "Kumocode",
      "url": "https://kumocode.co.za"
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="bg-muted/30 pb-0">
        <Container className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Free Website Speed & <span className="text-primary">SEO Audit</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Is your website turning away potential customers? Run a free, comprehensive performance and SEO test to find out what's slowing you down.
          </p>
        </Container>
      </Section>
      <Section>
        <Container>
          <WebsiteSpeedTest />
        </Container>
      </Section>
      <Section className="bg-muted/30">
        <Container className="grid md:grid-cols-3 gap-8 text-center mt-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold">Enter Your URL</h3>
            <p className="text-muted-foreground">Drop your website link and email into our tool to start the comprehensive audit.</p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold">Get Instant Scores</h3>
            <p className="text-muted-foreground">We analyze your site using Google Lighthouse metrics for Performance, SEO, and Accessibility.</p>
          </div>
          <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold">Fix & Optimize</h3>
            <p className="text-muted-foreground">Receive actionable insights in your inbox, or let our experts fix them for you.</p>
          </div>
        </Container>
      </Section>
      <Section className="border-t pb-20">
        <Container className="max-w-4xl text-left bg-card p-8 md:p-12 rounded-3xl border shadow-sm">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Why Website Speed and Core Web Vitals Matter</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In today's competitive digital landscape, having a beautiful website isn't enough. If your site takes longer than three seconds to load, over <strong>53% of mobile users will simply abandon it</strong>. Search engines have also made <a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Core Web Vitals</a> a primary ranking factor. A slow site doesn't just annoy users—it actively pushes you deeply down the search results.
            </p>
            
            <h3 className="text-2xl font-bold tracking-tight mt-8">What Are Core Web Vitals?</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Core Web Vitals are specific factors that Google considers critical for a webpage's overall user experience. Our free audit tool leverages the official Lighthouse API to analyze:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg text-muted-foreground">
              <li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance. For a seamless user experience, your main content should load within 2.5 seconds.</li>
              <li><strong>First Contentful Paint (FCP):</strong> Marks the exact time at which the first text or image is painted onto the screen.</li>
              <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability. Pages shouldn't unpredictably jump around as assets load in the background.</li>
              <li><strong>Total Blocking Time (TBT):</strong> Measures the total amount of time where the browser is completely blocked from responding to user input (like clicks or taps).</li>
            </ul>

            <h3 className="text-2xl font-bold tracking-tight mt-8">Building Trust Through E-E-A-T</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Demonstrating <strong>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T)</strong> starts with providing a reliable, responsive, and secure experience. A slow, buggy, or poorly accessible website immediately breaks trust with your audience. By optimizing your site's technical foundations, you send strong signals of credibility to both your customers and search algorithms.
            </p>

            <h3 className="text-2xl font-bold tracking-tight mt-8">Expert WordPress & Shopify Optimization</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At our agency, our developers specialize in tearing down and rebuilding clunky, slow code architecture. Whether you run a high-traffic Shopify store or a complex WordPress instance, our deep technical expertise allows us to decisively identify and resolve the bottlenecks holding you back from top-tier conversions. 
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
