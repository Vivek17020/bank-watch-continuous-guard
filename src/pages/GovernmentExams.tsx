import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export default function GovernmentExams() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: papers, isLoading } = useQuery({
    queryKey: ["all-exam-papers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exam_papers")
        .select("*")
        .order("exam_name", { ascending: true })
        .order("year", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const examGroups = useMemo(() => {
    if (!papers) return [];
    
    const groups = papers.reduce((acc, paper) => {
      const examName = paper.exam_name;
      if (!acc[examName]) {
        acc[examName] = {
          name: examName,
          slug: examName.toLowerCase().replace(/\s+/g, '-'),
          paperCount: 0,
          years: new Set<number>(),
        };
      }
      acc[examName].paperCount++;
      acc[examName].years.add(paper.year);
      return acc;
    }, {} as Record<string, any>);

    return Object.values(groups).sort((a: any, b: any) => a.name.localeCompare(b.name));
  }, [papers]);

  const filteredExams = examGroups.filter((exam: any) =>
    exam.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [
    { name: "Home", url: window.location.origin },
    { name: "Government Exams", url: window.location.href }
  ];

  return (
    <>
      <Helmet>
        <title>Government Exams Previous Year Question Papers PDF - Download Free</title>
        <meta name="description" content="Download previous year question papers for SSC, UPSC, Banking, Railway, Defence and other government exams. Free PDF downloads in English and Hindi." />
        <meta name="keywords" content="government exams, previous year papers, SSC papers, UPSC papers, banking exam papers, railway exam papers, defence exam papers, PDF download" />
        <link rel="canonical" href={`${window.location.origin}/government-exams`} />
      </Helmet>
      
      <BreadcrumbSchema items={breadcrumbs} />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                Government Exams Previous Year Question Papers
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Access free previous year question papers for all major government exams including SSC, UPSC, Banking, Railway, Defence, and more. Download PDFs in English and Hindi.
              </p>
            </header>

            <div className="mb-8">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for exams (SSC, UPSC, Banking, etc.)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted rounded w-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-10 bg-muted rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredExams && filteredExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam: any) => (
                  <Card key={exam.slug} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-start gap-2">
                        <FileText className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                        <span>{exam.name}</span>
                      </CardTitle>
                      <CardDescription>
                        {exam.paperCount} papers available • Years: {Array.from(exam.years).sort((a: any, b: any) => a - b).join(', ')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <Link to={`/government-exams/${exam.slug}`}>
                          <Download className="mr-2 h-4 w-4" />
                          View Question Papers
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No exams found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query" : "Check back soon for updates"}
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
