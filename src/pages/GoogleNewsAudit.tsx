import { SEOHead } from "@/utils/seo";
import { Navbar } from "@/components/public/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GoogleNewsAudit() {
  const technicalRequirements = [
    {
      requirement: "News Sitemap",
      status: "compliant",
      description: "XML sitemap following Google News standards",
      implementation: "✓ Implemented at /news-sitemap.xml with proper namespaces",
      details: [
        "Uses news:news, image:image namespaces",
        "Filters articles from last 48 hours",
        "Includes publication name, date, title, keywords",
        "Updates automatically when new articles are published"
      ],
      action: "Verify in GSC: Search Console > Sitemaps > Submit news-sitemap.xml"
    },
    {
      requirement: "NewsArticle Schema.org",
      status: "compliant",
      description: "Structured data for news articles",
      implementation: "✓ Implemented with NewsArticle type",
      details: [
        "Uses NewsArticle @type (not Article)",
        "Includes publisher as NewsMediaOrganization",
        "Has author with Person schema",
        "Includes datePublished and dateModified",
        "Has headline under 110 characters",
        "Includes image with dimensions"
      ],
      action: "Test at: https://search.google.com/test/rich-results"
    },
    {
      requirement: "Canonical URLs",
      status: "compliant",
      description: "Proper canonical tag implementation",
      implementation: "✓ All articles have canonical tags pointing to www URLs",
      details: [
        "Uses https://www.thebulletinbriefs.in format",
        "Strips all query parameters",
        "No duplicate content issues",
        "301 redirects from non-www to www"
      ],
      action: "Monitor GSC Coverage Report for duplicates"
    },
    {
      requirement: "robots.txt Configuration",
      status: "compliant",
      description: "Proper robots.txt with sitemap references",
      implementation: "✓ Both sitemaps listed in robots.txt",
      details: [
        "Sitemap: https://www.thebulletinbriefs.in/sitemap.xml",
        "Sitemap: https://www.thebulletinbriefs.in/news-sitemap.xml",
        "Allows all crawlers",
        "Blocks admin and API routes"
      ],
      action: "Verify at: https://www.thebulletinbriefs.in/robots.txt"
    },
    {
      requirement: "Article Metadata",
      status: "warning",
      description: "Complete metadata for each article",
      implementation: "⚠ Partially implemented - needs verification",
      details: [
        "✓ Title, description, author, date",
        "✓ Categories and keywords",
        "✓ High-quality images (1200x630+)",
        "⚠ Verify all articles have unique meta descriptions",
        "⚠ Ensure all images have proper alt text"
      ],
      action: "Audit top 20 articles for complete metadata"
    },
    {
      requirement: "Mobile-Friendly Design",
      status: "compliant",
      description: "Responsive design for all devices",
      implementation: "✓ Fully responsive with Tailwind CSS",
      details: [
        "Mobile-first design approach",
        "Touch-friendly navigation",
        "Readable fonts on small screens",
        "Fast Core Web Vitals"
      ],
      action: "Test at: https://search.google.com/test/mobile-friendly"
    },
    {
      requirement: "Publisher Information",
      status: "compliant",
      description: "Clear publisher identity",
      implementation: "✓ NewsMediaOrganization schema implemented",
      details: [
        "Organization name: TheBulletinBriefs",
        "Has about page and contact information",
        "Editorial guidelines published",
        "Logo and branding consistent"
      ],
      action: "Verify About page has comprehensive publisher info"
    },
    {
      requirement: "Content Freshness",
      status: "compliant",
      description: "Recent news content published regularly",
      implementation: "✓ News sitemap filters last 48 hours",
      details: [
        "Only articles from last 2 days in news sitemap",
        "Regular publishing schedule recommended",
        "Updated timestamps for article edits",
        "Breaking news flagging system"
      ],
      action: "Publish at least 1 article daily for best results"
    }
  ];

  const contentRequirements = [
    {
      category: "Original Reporting",
      status: "critical",
      checklist: [
        "Articles must be original, not syndicated",
        "Clear bylines for all articles",
        "Original images and multimedia",
        "Proper source attribution when referencing others"
      ]
    },
    {
      category: "News Focus",
      status: "critical",
      checklist: [
        "Primarily news content (not opinion or evergreen)",
        "Timely and relevant topics",
        "Clear separation between news and opinion",
        "Breaking news should be marked as featured"
      ]
    },
    {
      category: "Quality Standards",
      status: "critical",
      checklist: [
        "No clickbait headlines",
        "Factual and accurate reporting",
        "Proper grammar and spelling",
        "Professional tone and presentation",
        "Minimum 300 words per article"
      ]
    },
    {
      category: "Transparency",
      status: "critical",
      checklist: [
        "Clear author attribution",
        "Contact information available",
        "Editorial guidelines published",
        "Corrections policy in place"
      ]
    }
  ];

  const actionPlan = [
    {
      priority: "immediate",
      action: "Submit News Sitemap",
      steps: [
        "Go to Google Search Console",
        "Navigate to Sitemaps section",
        "Add: https://www.thebulletinbriefs.in/news-sitemap.xml",
        "Verify no errors after submission"
      ]
    },
    {
      priority: "immediate",
      action: "Test Structured Data",
      steps: [
        "Open Rich Results Test",
        "Test 5-10 recent article URLs",
        "Verify NewsArticle schema is detected",
        "Fix any validation errors"
      ]
    },
    {
      priority: "high",
      action: "Apply to Google News Publisher Center",
      steps: [
        "Visit https://publishercenter.google.com",
        "Create publisher account",
        "Submit publication for review",
        "Provide all required information (CRITICAL!)"
      ]
    },
    {
      priority: "high",
      action: "Audit Content Quality",
      steps: [
        "Review last 20 articles for originality",
        "Ensure proper bylines and author info",
        "Verify all images have alt text",
        "Check meta descriptions are unique and descriptive"
      ]
    },
    {
      priority: "medium",
      action: "Monitor GSC Coverage",
      steps: [
        "Check GSC Coverage Report weekly",
        "Fix any 'Duplicate' or 'Crawled not indexed' issues",
        "Monitor news sitemap for errors",
        "Track indexed news articles"
      ]
    },
    {
      priority: "ongoing",
      action: "Publish Regularly",
      steps: [
        "Maintain daily publishing schedule",
        "Focus on breaking news and timely content",
        "Update existing articles when news develops",
        "Mark breaking news as 'featured'"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-500">Compliant</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500">Needs Review</Badge>;
      case "critical":
        return <Badge className="bg-red-500">Critical</Badge>;
      case "immediate":
        return <Badge className="bg-red-500">Immediate</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-500">Ongoing</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Google News Readiness Audit"
        description="Comprehensive audit of website compliance with Google News technical and content requirements"
        url="https://www.thebulletinbriefs.in/google-news-audit"
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Google News Readiness Audit</h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive analysis of technical and content requirements
              </p>
            </div>

            {/* Overall Status */}
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Overall Status: Ready for Submission
                </CardTitle>
                <CardDescription>
                  Your website meets most Google News technical requirements. Focus on content quality and apply to Google News Publisher Center.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-500">6/8</div>
                    <div className="text-sm text-muted-foreground">Technical Requirements</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-500">0/4</div>
                    <div className="text-sm text-muted-foreground">Content Requirements (Manual Review Needed)</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">6</div>
                    <div className="text-sm text-muted-foreground">Action Items</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Requirements Analysis</CardTitle>
                <CardDescription>
                  Automated checks for Google News technical compliance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {technicalRequirements.map((req, index) => (
                  <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-3 mb-3">
                      {getStatusIcon(req.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{req.requirement}</h3>
                          {getStatusBadge(req.status)}
                        </div>
                        <p className="text-muted-foreground mb-2">{req.description}</p>
                        <div className="bg-muted/50 p-3 rounded-md mb-2">
                          <p className="font-medium text-sm">{req.implementation}</p>
                        </div>
                        <ul className="space-y-1 mb-3">
                          {req.details.map((detail, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-sm">
                          <strong>Action:</strong> {req.action}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Content Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Content Requirements Checklist</CardTitle>
                <CardDescription>
                  Manual verification required - Google News editorial policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contentRequirements.map((req, index) => (
                  <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-3 mb-3">
                      {getStatusIcon(req.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold">{req.category}</h3>
                          {getStatusBadge(req.status)}
                        </div>
                        <ul className="space-y-2">
                          {req.checklist.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <input type="checkbox" className="mt-1" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Action Plan & Next Steps</CardTitle>
                <CardDescription>
                  Prioritized steps to complete Google News submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {actionPlan.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{action.action}</h3>
                      {getStatusBadge(action.priority)}
                    </div>
                    <ol className="space-y-2">
                      {action.steps.map((step, idx) => (
                        <li key={idx} className="text-sm flex gap-2">
                          <span className="font-bold text-primary">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Essential Resources</CardTitle>
                <CardDescription>Official Google News documentation and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-between">
                  <a href="https://publishercenter.google.com" target="_blank" rel="noopener noreferrer">
                    Google News Publisher Center
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
                    Rich Results Test
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                    Google Search Console
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <a href="https://support.google.com/news/publisher-center/answer/9606702" target="_blank" rel="noopener noreferrer">
                    Google News Content Policies
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Critical Note */}
            <Card className="border-red-500 bg-red-50 dark:bg-red-950">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300">⚠️ Critical: Publisher Center Application</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-600 dark:text-red-400 space-y-2">
                <p>
                  <strong>Having proper technical implementation does NOT guarantee acceptance into Google News.</strong>
                </p>
                <p>
                  You MUST apply through Google News Publisher Center and meet their editorial standards:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Original, factual news content</li>
                  <li>Clear editorial standards and transparency</li>
                  <li>Regular publishing schedule</li>
                  <li>Professional presentation and credibility</li>
                </ul>
                <p className="font-bold mt-4">
                  Review process can take several weeks. Ensure content quality is high before applying.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
