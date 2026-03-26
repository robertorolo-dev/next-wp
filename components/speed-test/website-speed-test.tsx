"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  acceptedTerms: z.boolean().refine(val => val === true, { message: "You must check the box to run the audit." })
});

export function WebsiteSpeedTest() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      email: "",
      acceptedTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setAnalyzing(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("/api/speed-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze website.");
      }

      setResults(data.scores);
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setAnalyzing(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 50) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  const getScoreCircleColor = (score: number) => {
    if (score >= 90) return "stroke-emerald-500";
    if (score >= 50) return "stroke-amber-500";
    return "stroke-red-500";
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border bg-background shadow-xl">
      <div className="p-8 md:p-12">
        {!results && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Start Your Free Website Audit</h3>
                <p className="text-muted-foreground">Discover what's slowing down your website and hurting your SEO rankings.</p>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 text-red-600 flex items-center gap-3 text-sm">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="https://yourwebsite.com"
                        className="h-14 text-lg px-6 rounded-2xl bg-muted/50 focus-visible:bg-background"
                        disabled={analyzing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Your work email address"
                        className="h-14 text-lg px-6 rounded-2xl bg-muted/50 focus-visible:bg-background"
                        disabled={analyzing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptedTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2 p-2">
                    <div className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <input 
                          type="checkbox" 
                          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={analyzing}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <label className="text-sm cursor-pointer" onClick={() => !analyzing && field.onChange(!field.value)}>
                          I am human and consent to being contacted with my site audit.
                        </label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold rounded-2xl group"
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing website (this takes ~10s)...
                  </>
                ) : (
                  <>
                    Run Full Audit <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By clicking "Run Full Audit", you agree to receive your results and occasional updates from our team. We never spam.
              </p>
            </form>
          </Form>
        )}

        {results && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 text-emerald-500 rounded-full mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Your Audit is Complete</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We've analyzed your website. Our lead developers will review these issues and email you a personalized action plan.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Performance", score: results.performance },
                { label: "SEO", score: results.seo },
                { label: "Accessibility", score: results.accessibility },
                { label: "Best Practices", score: results.bestPractices },
              ].map((cat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center p-6 rounded-3xl border ${getScoreColor(cat.score)} transition-all hover:scale-105 duration-300`}>
                  
                  {/* Circular Score */}
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-muted fill-none"
                        strokeWidth="3"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${getScoreCircleColor(cat.score)} fill-none animate-[dash_1.5s_ease-out_forwards]`}
                        strokeWidth="3"
                        strokeDasharray={`${cat.score}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold tracking-tighter">{cat.score}</span>
                    </div>
                  </div>

                  <span className="font-semibold text-center text-foreground">{cat.label}</span>
                  {cat.score < 50 && <span className="text-xs font-bold mt-1 text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Needs Work</span>}
                  {cat.score >= 50 && cat.score < 90 && <span className="text-xs font-bold mt-1 text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Average</span>}
                  {cat.score >= 90 && <span className="text-xs font-bold mt-1 text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">Great</span>}
                </div>
              ))}
            </div>

            {results.vitals && (
              <div className="pt-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold">Core Web Vitals</h3>
                  <p className="text-sm text-muted-foreground mt-1">Google's official metrics for user experience</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "First Contentful Paint", vital: results.vitals.fcp, desc: "Time to first text or image" },
                    { label: "Largest Contentful Paint", vital: results.vitals.lcp, desc: "Time for largest content to load" },
                    { label: "Total Blocking Time", vital: results.vitals.tbt, desc: "Time interface is unresponsive" },
                    { label: "Cumulative Layout Shift", vital: results.vitals.cls, desc: "Visual stability score" },
                  ].map((item, i) => {
                    // Extract values and status
                    const { display, status } = item.vital || { display: 'N/A', status: 'unknown' };
                    
                    let statusColor = "bg-muted text-muted-foreground";
                    let statusText = "Unknown";
                    
                    if (status === 'good') {
                      statusColor = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
                      statusText = "Good";
                    } else if (status === 'needs-improvement') {
                      statusColor = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
                      statusText = "Needs Improvement";
                    } else if (status === 'poor') {
                      statusColor = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                      statusText = "Poor";
                    }

                    return (
                      <div key={i} className="bg-muted/30 rounded-xl p-4 border flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-bold mb-1">{display}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 ${statusColor}`}>
                          {statusText}
                        </span>
                        <span className="font-semibold text-sm leading-tight">{item.label}</span>
                        <span className="text-xs text-muted-foreground mt-1">{item.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl text-center space-y-6">
              <h3 className="text-2xl font-bold">Want to turn these red scores into green?</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Slow websites hurt your conversion rate and SEO rankings. Book a free consultation and let our experts show you exactly how to fix these issues.
              </p>
              <Button size="lg" className="h-14 px-8 text-lg rounded-2xl group" asChild>
                <a href="/#contact">
                  Chat with a Developer <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            
            <div className="flex justify-center mt-6 pt-6 border-t">
                 <Button variant="ghost" onClick={() => { setResults(null); form.reset(); }}>
                     Test another website
                 </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
