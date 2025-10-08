import { SEOHead } from "@/utils/seo";
import { Navbar } from "@/components/public/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function SEOAudit() {
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
      severity: "high",
      meaning: "Google crawled the page but decided not to index it",
      identification: "GSC Coverage Report > Excluded > Crawled - currently not indexed",
      fix: [
        "Improve content quality and uniqueness",
        "Add more internal links to these pages",
        "Ensure proper heading structure (H1, H2, H3)",
        "Verify page load speed is under 2.5 seconds",
        "Check for thin content (aim for 300+ words)"
      ],
      status: "needs_review",
      manualIndex: "yes_after_fixes"
    },
    {
      issue: "Discovered – currently not indexed",
      severity: "medium",
      meaning: "Google found the URL but hasn't crawled it yet",
      identification: "GSC Coverage Report > Excluded > Discovered - currently not indexed",
      fix: [
        "Submit URL via 'Request Indexing' in GSC",
        "Add to sitemap.xml if missing",
        "Improve internal linking to this page",
        "Increase crawl priority by linking from homepage"
      ],
      status: "ongoing",
      manualIndex: "yes"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fixed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "needs_review":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "ongoing":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-500">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-500">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="SEO Audit Report"
        description="Comprehensive SEO analysis and indexing issue diagnostics"
        url="https://www.thebulletinbriefs.in/seo-audit"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">SEO Audit Report</h1>
              <p className="text-xl text-muted-foreground">
                Google Search Console indexing analysis and recommendations
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common Indexing Issues</CardTitle>
                <CardDescription>
                  Analysis of potential Google Search Console issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {indexingIssues.map((item, index) => (
                  <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-3 mb-3">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{item.issue}</h3>
                          {getStatusBadge(item.severity)}
                        </div>
                        <p className="text-muted-foreground mb-2">{item.meaning}</p>
                        <div className="bg-muted/50 p-3 rounded-md mb-2">
                          <p className="font-medium text-sm">How to identify: {item.identification}</p>
                        </div>
                        <div className="space-y-1 mb-3">
                          <p className="font-semibold text-sm">Steps to fix:</p>
                          <ol className="list-decimal list-inside space-y-1">
                            {item.fix.map((step, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground">{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-sm">
                          <strong>Manual indexing needed:</strong> {item.manualIndex}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
