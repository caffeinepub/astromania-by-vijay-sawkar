import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet, Link } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import GemstoneShop from './pages/GemstoneShop';
import BookConsultation from './pages/BookConsultation';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a1628', color: '#f0e8d0' }}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0a1628' }}>
      <div className="text-center">
        <h1 className="font-serif text-6xl text-gold mb-4">404</h1>
        <p className="text-xl mb-6" style={{ color: '#f0e8d0' }}>Page not found</p>
        <Link to="/" className="btn-gold px-6 py-3 rounded-full inline-block">
          Return Home
        </Link>
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services,
});

const gemstoneShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gemstone-shop',
  component: GemstoneShop,
});

const bookConsultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book-consultation',
  component: BookConsultation,
});

const testimonialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/testimonials',
  component: Testimonials,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  gemstoneShopRoute,
  bookConsultationRoute,
  testimonialsRoute,
  contactRoute,
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
