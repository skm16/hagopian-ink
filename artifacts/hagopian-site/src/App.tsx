import { Router, Route, Switch, useLocation } from 'wouter';
import { useEffect } from 'react';
import { Homepage } from '@/pages/HomePage';
import { ExpertisePage } from '@/pages/ExpertisePage';
import { WorkPage } from '@/pages/WorkPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { ContactPage } from '@/pages/ContactPage';
import { BrandIdentityPage } from '@/pages/BrandIdentityPage';
import { UxUiDesignPage } from '@/pages/UxUiDesignPage';
import { EmailMarketingPage } from '@/pages/EmailMarketingPage';
import { NonprofitPage } from '@/pages/NonprofitPage';
import { HealthMedTechPage } from '@/pages/HealthMedTechPage';
import { LuxuryLifestylePage } from '@/pages/LuxuryLifestylePage';
import { CaseStudyPage } from '@/pages/CaseStudyPage';

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location]);
  return null;
}

export default function App() {
  return (
    <Router base={base}>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/expertise" component={ExpertisePage} />
        <Route path="/expertise/brand-identity" component={BrandIdentityPage} />
        <Route path="/expertise/ux-ui-design" component={UxUiDesignPage} />
        <Route path="/expertise/email-marketing" component={EmailMarketingPage} />
        <Route path="/expertise/nonprofit-fundraising" component={NonprofitPage} />
        <Route path="/expertise/health-medtech" component={HealthMedTechPage} />
        <Route path="/expertise/luxury-lifestyle" component={LuxuryLifestylePage} />
        <Route path="/work" component={WorkPage} />
        <Route path="/work/:slug" component={CaseStudyPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/celebrating-20-years-at-hagopian-ink" component={BlogPostPage} />
        <Route path="/contact" component={ContactPage} />
        <Route><Homepage /></Route>
      </Switch>
    </Router>
  );
}
