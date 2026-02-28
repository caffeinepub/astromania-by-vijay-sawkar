import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import GemstoneShop from './pages/GemstoneShop';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import BookConsultation from './pages/BookConsultation';

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const servicesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/services', component: Services });
const galleryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/gallery', component: Gallery });
const gemstonesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/gemstones', component: GemstoneShop });
const testimonialsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/testimonials', component: Testimonials });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const bookRoute = createRoute({ getParentRoute: () => rootRoute, path: '/book-consultation', component: BookConsultation });

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  galleryRoute,
  gemstonesRoute,
  testimonialsRoute,
  contactRoute,
  bookRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
