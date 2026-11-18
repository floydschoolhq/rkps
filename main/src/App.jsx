import React, { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsNewDrawer from './components/WhatsNewDrawer';

// Pages (home is eager, the rest are code-split)
import HomePage from './pages/HomePage';
const VisionMissionPage = lazy(() => import('./pages/VisionMissionPage'));
const SchoolLegacyPage = lazy(() => import('./pages/SchoolLegacyPage'));
const PrincipalsDeskPage = lazy(() => import('./pages/PrincipalsDeskPage'));
const DirectorsDeskPage = lazy(() => import('./pages/DirectorsDeskPage'));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage'));
const DownloadsPage = lazy(() => import('./pages/DownloadsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Global Interactive Modals
import AdmissionModal from './components/modals/AdmissionModal';
import VisitModal from './components/modals/VisitModal';
import ErpLoginModal from './components/modals/ErpLoginModal';
import VirtualTourModal from './components/modals/VirtualTourModal';

function SubpageWrapper({ children }) {
  return (
    <div className="pt-[64px] sm:pt-[72px] animate-fadeIn">
      {children}
    </div>
  );
}

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [erpOpen, setErpOpen] = useState(false);
  const [erpRole, setErpRole] = useState('parent');
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = useState(false);

  /**
   * Unified dispatcher for every Menu link, Search result, Quick Link,
   * What's New card, and Footer item. Ensures ZERO dead links.
   */
  const handleNavigateAction = useCallback(
    (item) => {
      if (!item) return;

      if (item.action) {
        switch (item.action) {
          case 'admission':
            setAdmissionOpen(true);
            return;
          case 'visit':
            setVisitOpen(true);
            return;
          case 'virtual-tour':
            setVirtualTourOpen(true);
            return;
          case 'erp-parent':
            setErpRole('parent');
            setErpOpen(true);
            return;
          case 'erp-student':
            setErpRole('student');
            setErpOpen(true);
            return;
          case 'erp-staff':
            setErpRole('staff');
            setErpOpen(true);
            return;
          default:
            return;
        }
      }

      if (item.href) {
        if (item.external) {
          window.open(item.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = item.href;
        }
        return;
      }

      if (item.to) {
        // Handle same-page hash navigation cleanly
        const [targetPath, targetHash] = item.to.split('#');
        const normalizedPath = targetPath || '/';
        if (normalizedPath === location.pathname && targetHash) {
          const el = document.getElementById(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }
        navigate(item.to);
      }
    },
    [navigate, location.pathname]
  );

  return (
    <div className="min-h-screen bg-white text-[#2b2b2b] flex flex-col font-sans antialiased selection:bg-[#a22634] selection:text-white">
      <ScrollToTop />

      {/* 0. Left-Docked SAS "WHAT'S NEW?" Slide-Out Sidebar */}
      <WhatsNewDrawer
        isOpen={whatsNewOpen}
        onClose={() => setWhatsNewOpen(false)}
        onNavigateAction={handleNavigateAction}
      />

      {/* 1. Global SAS Header, Slide-Down Search & 2-Column Split Mega-Menu */}
      <Header
        onNavigateAction={handleNavigateAction}
        onToggleWhatsNew={() => setWhatsNewOpen((prev) => !prev)}
      />

      {/* 2. All Application Routes (Homepage + All 9 Old Website Subpages) */}
      <main className="flex-1">
        {/* Subpages load on demand; the home page stays in the main bundle. */}
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigateAction={handleNavigateAction}
                onOpenAdmission={() => setAdmissionOpen(true)}
                onOpenVisit={() => setVisitOpen(true)}
              />
            }
          />
          <Route
            path="/vision-mission"
            element={
              <SubpageWrapper>
                <VisionMissionPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/school-legacy"
            element={
              <SubpageWrapper>
                <SchoolLegacyPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/principals-desk"
            element={
              <SubpageWrapper>
                <PrincipalsDeskPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/directors-desk"
            element={
              <SubpageWrapper>
                <DirectorsDeskPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/facilities"
            element={
              <SubpageWrapper>
                <FacilitiesPage
                  onOpenAdmission={() => setAdmissionOpen(true)}
                  onOpenVirtualTour={() => setVirtualTourOpen(true)}
                />
              </SubpageWrapper>
            }
          />
          <Route
            path="/admissions"
            element={
              <SubpageWrapper>
                <AdmissionsPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/downloads"
            element={
              <SubpageWrapper>
                <DownloadsPage onOpenAdmission={() => setAdmissionOpen(true)} />
              </SubpageWrapper>
            }
          />
          <Route
            path="/gallery"
            element={
              <SubpageWrapper>
                <GalleryPage
                  onOpenAdmission={() => setAdmissionOpen(true)}
                  onOpenVirtualTour={() => setVirtualTourOpen(true)}
                />
              </SubpageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <SubpageWrapper>
                <ContactPage />
              </SubpageWrapper>
            }
          />
          {/* Catch-all fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onNavigateAction={handleNavigateAction}
                onOpenAdmission={() => setAdmissionOpen(true)}
                onOpenVisit={() => setVisitOpen(true)}
              />
            }
          />
        </Routes>
        </Suspense>
      </main>

      {/* 3. Institutional 3-Column Footer with All Working Links */}
      <Footer onNavigateAction={handleNavigateAction} />

      {/* 4. Global Interactive Modals */}
      <AdmissionModal
        isOpen={admissionOpen}
        onClose={() => setAdmissionOpen(false)}
      />

      <VisitModal
        isOpen={visitOpen}
        onClose={() => setVisitOpen(false)}
      />

      <ErpLoginModal
        isOpen={erpOpen}
        onClose={() => setErpOpen(false)}
        initialRole={erpRole}
      />

      <VirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
