import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Search, Home, ChevronRight } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { useState, useMemo } from "react";
import slugify from "slugify";

export default function PreviousYearPapers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data: exams, isLoading } = useQuery({
    queryKey: ["exam-papers-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exam_papers")
        .select("exam_name, category")
        .order("exam_name", { ascending: true });
      
      if (error) throw error;
      
      // Group by exam_name and get unique categories
      const grouped = data.reduce((acc, paper) => {
        if (!acc[paper.exam_name]) {
          acc[paper.exam_name] = {
            exam_name: paper.exam_name,
            categories: new Set(),
          };
        }
        if (paper.category) {
          acc[paper.exam_name].categories.add(paper.category);
        }
        return acc;
      }, {} as Record<string, { exam_name: string; categories: Set<string> }>);

      return Object.values(grouped).map(item => ({
        exam_name: item.exam_name,
        categories: Array.from(item.categories),
        slug: slugify(item.exam_name, { lower: true, strict: true })
      }));
    },
  });

  // Get unique categories for filter
  const allCategories = useMemo(() => {
    if (!exams) return [];
    const cats = new Set<string>();
    exams.forEach(exam => exam.categories.forEach(cat => cats.add(cat)));
    return Array.from(cats).sort();
  }, [exams]);

  // Filter exams based on search and category
  const filteredExams = useMemo(() => {
    if (!exams) return [];
    return exams.filter(exam => {
      const matchesSearch = exam.exam_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !categoryFilter || exam.categories.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [exams, searchQuery, categoryFilter]);

  const breadcrumbs = [
    { name: "Home", url: window.location.origin },
    { name: "Education", url: `${window.location.origin}/education/previous-year-papers` },
    { name: "Previous Year Papers", url: window.location.href }
  ];

  return (
    <>
      <Helmet>
        <title>Previous Year Question Papers - Download Free PDFs | TheBulletinBriefs</title>
        <meta 
          name="description" 
          content="Download free PDFs of previous year question papers for SSC, Railway, Banking, Defence, UPSC, and more competitive exams. Prepare smarter with TheBulletinBriefs."
        />
        <meta 
          name="keywords" 
          content="previous year papers, question papers PDF, SSC papers, Railway papers, Banking papers, Defence papers, competitive exam papers"
        />
        <link rel="canonical" href={window.location.href} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Previous Year Question Papers",
            "description": "Download free previous year question papers for competitive exams",
            "url": window.location.href
          })}
        </script>
      </Helmet>

      <BreadcrumbSchema items={breadcrumbs} />

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Previous Year Papers</span>
            </nav>

            {/* Header */}
            <header className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                Previous Year Question Papers
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Download free PDFs of previous year papers for SSC, Railway, Banking, Defence, UPSC, and more competitive exams
              </p>
            </header>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exam name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-md border border-input bg-background text-foreground"
              >
                <option value="">All Categories</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Exams Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : filteredExams && filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam) => (
                  <Card key={exam.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-lg">{exam.exam_name}</CardTitle>
                          <CardDescription className="mt-2">
                            {exam.categories.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {exam.categories.map(cat => (
                                  <Badge key={cat} variant="secondary">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to={`/education/previous-year-papers/${exam.slug}`}>
                          View Papers
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No exams found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || categoryFilter 
                    ? "Try adjusting your search or filter criteria" 
                    : "Papers will be added soon"}
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}