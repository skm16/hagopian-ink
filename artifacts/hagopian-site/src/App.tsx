import { Router, Route, Switch } from 'wouter';
import { Homepage } from '@/pages/HomePage';
import { ExpertisePage } from '@/pages/ExpertisePage';
import { WorkPage } from '@/pages/WorkPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

export default function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/expertise" component={ExpertisePage} />
        <Route path="/work" component={WorkPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/contact" component={ContactPage} />
        <Route><Homepage /></Route>
      </Switch>
    </Router>
  );
}
