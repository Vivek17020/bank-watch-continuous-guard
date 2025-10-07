import { SEOHead } from "@/utils/seo";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

const SEOAudit = () => {
  const indexingIssues = [
    {
      issue: "Duplicate without user-selected canonical",
      severity: "high",
      meaning: "Multiple URLs with similar content exist, but no canonical tag specifies the preferred version",
      identification: "GSC Coverage Report > Excluded > Duplicate without user-selected canonical",
      fix: [
        "Add canonical tags to all article pages pointing to clean URLs",
        "Ensure canonical uses https://www.thebulletinbriefs.in format",
        "Strip all query parameters (?utm_source, ?ref, etc.)",
        "Verify vercel.json redirects non-www to www"
      ],
      status: "fixed",
      manualIndex: "yes"
    },
    {
      issue: "Crawled but not indexed",
      severity: "medium",
      meaning: "Google crawled the page but chose not to index it due to quality, content, or technical issues",
      identification: "GSC Coverage Report > Excluded > Crawled - currently not indexed",
      fix: [
        "Improve content quality and uniqueness (300+ words minimum)",
        "Add internal links from high-authority pages",
        "Enhance meta descriptions and titles with keywords",
        "Ensure proper heading structure (H1, H2, H3)",
        "Add images with descriptive alt text",
        "Check Core Web Vitals performance"
      ],
      status: "needs-review",
      manualIndex: "yes"
    },
    {
      issue: "Discovered – currently not indexed",
      severity: "medium",
      meaning: "Google found the URL but hasn't crawled it yet, often due to low priority or crawl budget",
      identification: "GSC Coverage Report > Excluded > Discovered - currently not indexed",
      fix: [
        "Submit URLs via GSC URL Inspection tool",
        "Add to sitemap.xml and news-sitemap.xml",
        "Increase internal linking to these pages",
        "Share on social media to increase signals",
        "Improve page speed and mobile usability"
      ],
      status: "monitoring",
      manualIndex: "yes"
    },
    {
      issue: "Alternate page with proper canonical tag",
      severity: "low",
      meaning: "Page is correctly marked as duplicate with canonical pointing to the preferred version",
      identification: "GSC Coverage Report > Excluded > Alternate page with proper canonical tag",
      fix: [
        "No action needed - this is correct behavior",
        "Verify canonical tags point to the right URLs",
        "Ensure www version is always canonical"
      ],
      status: "normal",
      manualIndex: "no"
    },
    {
      issue: "Blocked by robots.txt",
      severity: "high",
      meaning: "Your robots.txt file prevents Google from crawling these URLs",
      identification: "GSC Coverage Report > Excluded > Blocked by robots.txt",
      fix: [
        "Review robots.txt for unintended Disallow rules",
        "Ensure only admin and API paths are blocked",
        "Test with GSC robots.txt tester tool",
        "Remove blocks from important content pages"
      ],
      status: "verify",
      manualIndex: "yes"
    },
    {
      issue: "Noindex tag or meta directive",
      severity: "high",
      meaning: "Page has a noindex meta tag or X-Robots-Tag header preventing indexing",
      identification: "GSC Coverage Report > Excluded > Excluded by 'noindex' tag",
      fix: [
        "Check page source for <meta name='robots' content='noindex'>",
        "Review response headers for X-Robots-Tag: noindex",
        "Remove noindex from pages you want indexed",
        "Verify no conflicting robots meta tags"
      ],
      status: "check",
      manualIndex: "yes"
    },
    {
      issue: "Soft 404 errors",
      severity: "medium",
      meaning: "Page returns 200 status but appears to be an error page or has thin content",
      identification: "GSC Coverage Report > Excluded > Soft 404",
      fix: [
        "Return proper 404 status for missing pages",
        "Add substantial content to thin pages",
        "Implement proper error handling",
        "Use 301 redirects for moved content"
      ],
      status: "review",
      manualIndex: "no"
    },
    {
      issue: "Server errors (5xx)",
      severity: "critical",
      meaning: "Server returned 500-series error when Google tried to crawl",
      identification: "GSC Coverage Report > Error > Server error (5xx)",
      fix: [
        "Check edge function logs in Supabase dashboard",
        "Monitor server uptime and response times",
        "Review database query performance",
        "Implement proper error handling and fallbacks",
        "Check Vercel deployment logs"
      ],
      status: "monitor",
      manualIndex: "yes"
    },
    {
      issue: "Sitemap inclusion issues",
      severity: "medium",
      meaning: "URLs not in sitemap or sitemap has errors",
      identification: "GSC Sitemaps > Submitted vs. Indexed count mismatch",
      fix: [
        "Verify sitemap.xml and news-sitemap.xml are accessible",
        "Ensure all published articles are in sitemaps",
        "News sitemap should only include last 48 hours",
        "Submit sitemaps in GSC if not already done",
        "Check sitemap format and XML validity"
      ],
      status: "verified",
      manualIndex: "no"
    },
    {
      issue: "Internal linking problems",
      severity: "medium",
      meaning: "Pages lack sufficient internal links from other pages",
      identification: "Low PageRank or orphaned pages in crawl analysis",
      fix: [
        "Add related articles sections to all posts",
        "Include category and tag navigation",
        "Create topic clusters with pillar pages",
        "Add breadcrumb navigation",
        "Link from homepage to important content"
      ],
      status: "ongoing",
      manualIndex: "no"
    },
    {
      issue: "Content quality issues",
      severity: "medium",
      meaning: "Thin, duplicate, or low-quality content",
      identification: "Manual review + GSC crawled but not indexed",
      fix: [
        "Ensure articles are 500+ words minimum",
        "Add unique analysis and insights",
        "Use original images and media",
        "Implement proper heading structure",
        "Check plagiarism and originality",
        "Add author expertise and credentials"
      ],
      status: "content-review",
      manualIndex: "yes"
    },
    {
      issue: "URL parameter conflicts",
      severity: "low",
      meaning: "Query parameters creating duplicate content versions",
      identification: "Multiple URLs with ?utm_source, ?ref, ?page, etc.",
      fix: [
        "Canonical tags strip all parameters (already implemented)",
        "Use GSC URL Parameters tool to tell Google how to handle them",
        "Implement parameter handling in robots.txt if needed",
        "Avoid unnecessary URL parameters"
      ],
      status: "handled",
      manualIndex: "no"
    }
  ];

  const currentImplementation = [
    {
      feature: "Canonical Tags",
      status: "implemented",
      details: "Normalized to https://www.thebulletinbriefs.in, strips query params"
    },
    {
      feature: "301 Redirects",
      status: "implemented",
      details: "Non-www to www redirect in vercel.json"
    },
    {
      feature: "Sitemaps",
      status: "implemented",
      details: "Both regular sitemap.xml and news-sitemap.xml (48hr window)"
    },
    {
      feature: "Robots.txt",
      status: "implemented",
      details: "Blocks admin/, api/, allows all other content"
    },
    {
      feature: "Structured Data",
      status: "implemented",
      details: "NewsArticle schema with all required fields"
    },
    {
      feature: "Meta Tags",
      status: "implemented",
      details: "Open Graph, Twitter Cards, auto-generated keywords"
    },
    {
      feature: "Performance",
      status: "needs-review",
      details: "Core Web Vitals tracking implemented, monitor scores"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any }> = {
      critical: { variant: "destructive", icon: XCircle },
      high: { variant: "destructive", icon: AlertTriangle },
      medium: { variant: "secondary", icon: Info },
      low: { variant: "outline", icon: CheckCircle2 }
    };
    const config = variants[severity] || variants.low;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {severity}
      </Badge>
    );
  };

  return (
    <>
      <SEOHead
        title="SEO Audit Report"
        description="Comprehensive SEO audit and indexing analysis for TheBulletinBriefs"
        url={`${window.location.origin}/seo-audit`}
      />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">SEO Audit Report</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of Google Search Console indexing issues and fixes
              </p>
            </div>

            {/* Current Implementation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Current SEO Implementation
                </CardTitle>
                <CardDescription>
                  Status of SEO features already implemented on your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {currentImplementation.map((item) => (
                    <div key={item.feature} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.feature}</h3>
                        <Badge variant={item.status === "implemented" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>How to Check Your Google Search Console</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Search Console</a></li>
                  <li>Select your property (www.thebulletinbriefs.in)</li>
                  <li>Navigate to Coverage Report or Pages section</li>
                  <li>Review "Why pages aren't indexed" section</li>
                  <li>Cross-reference with the issues below</li>
                </ol>
              </AlertDescription>
            </Alert>

            {/* Detailed Issues Table */}
            <Card>
              <CardHeader>
                <CardTitle>Google Search Console Indexing Issues</CardTitle>
                <CardDescription>
                  Complete reference guide for all possible indexing issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Issue</TableHead>
                        <TableHead className="w-[100px]">Severity</TableHead>
                        <TableHead>What It Means</TableHead>
                        <TableHead>How to Identify</TableHead>
                        <TableHead>How to Fix</TableHead>
                        <TableHead className="w-[120px]">Manual Index?</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {indexingIssues.map((issue) => (
                        <TableRow key={issue.issue}>
                          <TableCell className="font-medium">{issue.issue}</TableCell>
                          <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
                          <TableCell className="text-sm">{issue.meaning}</TableCell>
                          <TableCell className="text-sm">{issue.identification}</TableCell>
                          <TableCell>
                            <ul className="text-sm space-y-1 list-disc list-inside">
                              {issue.fix.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell>
                            <Badge variant={issue.manualIndex === "yes" ? "default" : "outline"}>
                              {issue.manualIndex}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Immediate Action Plan</CardTitle>
                <CardDescription>
                  Priority tasks to improve indexing and rankings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-red-600 mb-2">🔴 Critical (Do Now)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Check for server errors (5xx) in Vercel/Supabase logs</li>
                      <li>• Verify no pages have noindex tags unintentionally</li>
                      <li>• Review robots.txt isn't blocking important content</li>
                      <li>• Submit key pages for manual indexing in GSC</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-yellow-600 mb-2">🟡 High Priority (This Week)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Request indexing for all "Discovered - not indexed" pages</li>
                      <li>• Improve content on "Crawled but not indexed" pages</li>
                      <li>• Add internal links from high-authority pages</li>
                      <li>• Verify all sitemaps are submitted and accessible</li>
                      <li>• Check canonical tags on all articles</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-blue-600 mb-2">🔵 Medium Priority (Ongoing)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Monitor Core Web Vitals scores</li>
                      <li>• Enhance content quality (500+ words, unique insights)</li>
                      <li>• Build internal linking structure</li>
                      <li>• Monitor GSC for new issues weekly</li>
                      <li>• Track indexing progress and ranking changes</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-green-600 mb-2">🟢 Low Priority (Future)</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Configure GSC URL Parameters tool</li>
                      <li>• Implement topic clusters and pillar pages</li>
                      <li>• Add FAQ schema where applicable</li>
                      <li>• Build backlinks from quality sources</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manual Indexing Guide */}
            <Card>
              <CardHeader>
                <CardTitle>How to Request Manual Indexing</CardTitle>
                <CardDescription>
                  Step-by-step guide for requesting Google to index your pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 list-decimal list-inside">
                  <li className="text-sm">
                    <strong>Go to GSC URL Inspection:</strong> Enter the full URL you want indexed
                  </li>
                  <li className="text-sm">
                    <strong>Check current status:</strong> Wait for Google to analyze the URL
                  </li>
                  <li className="text-sm">
                    <strong>If not indexed:</strong> Click "Request Indexing" button
                  </li>
                  <li className="text-sm">
                    <strong>Wait for test:</strong> Google will test if the page can be indexed
                  </li>
                  <li className="text-sm">
                    <strong>Fix any issues:</strong> Address any errors shown before requesting again
                  </li>
                  <li className="text-sm">
                    <strong>Monitor progress:</strong> Check back in 1-2 days to see if indexed
                  </li>
                  <li className="text-sm">
                    <strong>Limit:</strong> You can request ~10 URLs per day, prioritize important pages
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Monitoring Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly SEO Monitoring Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Check GSC Coverage Report for new errors
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Review "Pages not indexed" count - aim for &lt;5%
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Monitor sitemap submission status
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Check Core Web Vitals scores
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Review new article indexing speed (should be &lt;24hrs)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Track organic traffic trends in GSC Performance
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Check for manual actions or security issues
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SEOAudit;
