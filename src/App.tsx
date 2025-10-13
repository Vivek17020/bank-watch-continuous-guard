import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { CSPHeaders } from "@/components/security/csp-headers";
import { ErrorBoundary } from "@/components/error/error-boundary";
import { OptimizedCoreWebVitals } from "@/components/performance/optimized-core-web-vitals";
import NewsHomepage from "./pages/NewsHomepage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import RSSFeed from "./pages/RSSFeed";
import SitemapXML from "./pages/SitemapXML";
import NewsSitemapXML from "./pages/NewsSitemapXML";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import EditorialGuidelines from "./pages/EditorialGuidelines";
import SubscriptionPage from "./pages/SubscriptionPage";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCanceled from "./pages/SubscriptionCanceled";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import AdminNewArticle from "./pages/AdminNewArticle";
import AdminEditArticle from "./pages/AdminEditArticle";
import AdminEngagement from "./pages/AdminEngagement";
import AdminSettings from "./pages/AdminSettings";
import NewsletterPreferencesPage from "./pages/NewsletterPreferences";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import WebsiteAudit from "./pages/WebsiteAudit";
import AuditReport from "./pages/AuditReport";

const GovernmentExams = lazy(() => import("@/pages/GovernmentExams"));
const GovernmentExamPapers = lazy(() => import("@/pages/GovernmentExamPapers"));
const AdminExamPapers = lazy(() => import("@/pages/AdminExamPapers"));
const PreviousYearPapers = lazy(() => import("@/pages/PreviousYearPapers"));
const ExamPaperDetail = lazy(() => import("@/pages/ExamPaperDetail"));
const ComingSoon = lazy(() => import("@/pages/ComingSoon"));

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <ErrorBoundary>
                <CSPHeaders />
                <OptimizedCoreWebVitals />
                <Toaster />
                <Sonner />
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<NewsHomepage />} />
                    <Route path="/article/:slug" element={<ArticlePage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/rss" element={<RSSFeed />} />
                    <Route path="/sitemap.xml" element={<SitemapXML />} />
                    <Route path="/news-sitemap.xml" element={<NewsSitemapXML />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/subscription" element={<SubscriptionPage />} />
                    <Route path="/subscription-success" element={<SubscriptionSuccess />} />
                    <Route path="/subscription-canceled" element={<SubscriptionCanceled />} />
                    <Route path="/editorial-guidelines" element={<EditorialGuidelines />} />
                    <Route path="/newsletter-preferences" element={<NewsletterPreferencesPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/audit" element={<WebsiteAudit />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/government-exams" element={<GovernmentExams />} />
          <Route path="/government-exams/:slug" element={<GovernmentExamPapers />} />
          <Route path="/jobs/previous-year-papers" element={<PreviousYearPapers />} />
          <Route path="/jobs/previous-year-papers/:slug" element={<ExamPaperDetail />} />
          <Route path="/jobs/admit-cards" element={<ComingSoon title="Admit Cards" />} />
          <Route path="/jobs/results" element={<ComingSoon title="Results" />} />
          <Route path="/jobs/syllabus" element={<ComingSoon title="Syllabus" />} />
          <Route path="/admin/pyq" element={<AdminExamPapers />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="articles" element={<AdminArticles />} />
                      <Route path="articles/new" element={<AdminNewArticle />} />
                      <Route path="articles/:id/edit" element={<AdminEditArticle />} />
                      <Route path="engagement" element={<AdminEngagement />} />
                      <Route path="audit-report" element={<AuditReport />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="exam-papers" element={<AdminExamPapers />} />
                      <Route path="upload-pyqs" element={<AdminExamPapers />} />
                    </Route>
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
