import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';
import {
  User,
  Search,
  Menu,
  X,
  ChevronRight,
  Bell,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  FileText,
  Compass,
  MapPin,
  Calendar,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import logoImg from '@assets/logo.jpg';
import {
  MENU_TOP_BAR,
  MAIN_MENU_CATEGORIES,
  MENU_BOTTOM_TILES,
  PORTAL_LINKS,
  SEARCH_TOP_BAR,
  POPULAR_SEARCHES,
  SEARCH_QUICK_LINKS,
  SEARCH_INDEX
} from '../data/navigationData';

const iconRegistry = {
  ShieldCheck,
  Sparkles,
  GraduationCap,
  FileText,
  Compass,
  MapPin,
  Calendar
};

export default function Header({ onNavigateAction, onToggleWhatsNew }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState('about');
  const [mobileExpandedId, setMobileExpandedId] = useState('about');
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const portalsRef = useRef(null);
  const searchInputRef = useRef(null);

  // SAS-style smart sticky header: the bar turns solid after 40px, hides while
  // scrolling down past HIDE_AFTER, and comes back as soon as the user scrolls up.
  useEffect(() => {
    const HIDE_AFTER = 220; // header height + 150px, as on SAS
    const DELTA = 6; // ignore tiny wheel/trackpad jitter
    let last = window.scrollY;

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: () => {
        const y = window.scrollY;
        setIsScrolled(y > 40);
        if (Math.abs(y - last) < DELTA) return;
        setIsHidden(y > HIDE_AFTER && y > last);
        last = y;
      },
    });
    setIsScrolled(window.scrollY > 40);

    return () => st.kill();
  }, []);

  // Close all overlays on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setPortalsOpen(false);
  }, [location.pathname, location.hash]);

  // Body scroll lock when full-screen menu or search overlay is open
  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  // Escape key closes overlays + click outside closes portals dropdown
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
        setPortalsOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (portalsRef.current && !portalsRef.current.contains(e.target)) {
        setPortalsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-focus search input when search overlay slides open
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  const solidHeader = !isHome || isScrolled;

  const activeCategory =
    MAIN_MENU_CATEGORIES.find((c) => c.id === activeCategoryId) || MAIN_MENU_CATEGORIES[0];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const searchResults = trimmedQuery
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmedQuery) ||
          item.category.toLowerCase().includes(trimmedQuery) ||
          item.keywords.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const triggerItem = (item) => {
    setMenuOpen(false);
    setSearchOpen(false);
    setPortalsOpen(false);
    setSearchQuery('');
    onNavigateAction(item);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      triggerItem(searchResults[0]);
    }
  };

  return (
    <>
      {/* 0. Left-Docked Vertical Ribbon "WHAT'S NEW?" (Exact match of SAS Page 0) */}
      <button
        onClick={onToggleWhatsNew}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 bg-[#052051] hover:bg-[#a22634] text-white text-[11px] font-extrabold tracking-[0.14em] uppercase py-4 px-2.5 rounded-r-md shadow-2xl transition-all duration-400 ease-sas cursor-pointer flex items-center gap-2 [writing-mode:vertical-rl] rotate-180 border-r border-y border-white/20 hover:pl-3.5"
        title="What's New at RKPS"
        aria-label="Open What's New announcements and quick links"
      >
        <Bell className="w-3.5 h-3.5 rotate-90 text-[#faba28]" />
        <span>WHAT'S NEW?</span>
      </button>

      {/* 1. Global Header Bar (SAS cubic-bezier(0.34, 0.615, 0.4, 0.985) sticky transition) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-sas ${
          isHidden && !menuOpen && !searchOpen && !portalsOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          solidHeader
            ? 'bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] text-[#2b2b2b] py-2.5'
            : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent text-white py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: School Crest & Institutional Identity */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <img
              src={logoImg}
              alt="Radha Krishna Public School"
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full border-2 border-[#f0b429] object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col min-w-0">
              <span
                className={`font-bebas text-lg leading-[0.95] max-sm:max-w-[9.5em] sm:text-xl sm:truncate sm:leading-none lg:text-2xl lg:leading-none tracking-wider transition-colors duration-300 ${
                  solidHeader ? 'text-[#0b2a63]' : 'text-white'
                }`}
              >
                RADHA KRISHNA PUBLIC SCHOOL
              </span>
              <span
                className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-colors duration-300 mt-0.5 truncate ${
                  solidHeader ? 'text-[#a22634]' : 'text-[#faba28]'
                }`}
              >
                Est. 2004 • CBSE<span className="hidden lg:inline"> Affiliation #2132212</span>
              </span>
            </div>
          </Link>

          {/* Right Action Controls (Matching SAS Header: Portals, Search, Apply, Circular MENU ☰) */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Portals Dropdown */}
            <div className="relative hidden md:block" ref={portalsRef}>
              <button
                onClick={() => setPortalsOpen((prev) => !prev)}
                aria-expanded={portalsOpen}
                className={`flex items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase px-3.5 py-2 rounded-full transition-all duration-300 border cursor-pointer ${
                  solidHeader
                    ? 'border-slate-200 text-[#0b2a63] hover:bg-slate-50 hover:border-[#0b2a63]/40'
                    : 'border-white/35 text-white hover:bg-white/15'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#a22634]" />
                <span>PORTALS</span>
              </button>

              {/* Smooth Dropdown */}
              <div
                className={`absolute right-0 mt-2.5 w-64 bg-white text-[#2b2b2b] rounded-2xl shadow-2xl py-2.5 border border-slate-100 z-50 transition-all duration-300 ease-sas origin-top-right ${
                  portalsOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                {PORTAL_LINKS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerItem(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex flex-col cursor-pointer group"
                  >
                    <span className="text-xs font-extrabold text-[#0b2a63] group-hover:text-[#a22634] transition-colors flex items-center justify-between">
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#a22634] group-hover:translate-x-0.5 transition-all" />
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setPortalsOpen(false);
                setSearchOpen(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all duration-300 border cursor-pointer ${
                solidHeader
                  ? 'border-slate-200 text-[#0b2a63] hover:bg-slate-50 hover:border-[#0b2a63]/40'
                  : 'border-white/35 text-white hover:bg-white/15'
              }`}
              title="Search RKPS"
              aria-label="Open Site Search"
            >
              <Search className="w-4 h-4 text-[#a22634]" />
              <span className="hidden lg:inline text-xs font-extrabold tracking-wider uppercase">
                SEARCH
              </span>
            </button>

            {/* Quick Apply CTA */}
            <button
              onClick={() => triggerItem({ action: 'admission' })}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#a22634] hover:bg-[#7a1f2b] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              <span>APPLY NOW</span>
            </button>

            {/* Circular MENU ☰ Button (Exact SAS signature pill) */}
            <button
              onClick={() => {
                setSearchOpen(false);
                setPortalsOpen(false);
                setMenuOpen(true);
              }}
              className={`flex items-center gap-2.5 pl-1.5 sm:pl-3.5 pr-1.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer group ${
                solidHeader
                  ? 'border-[#0b2a63] text-[#0b2a63] hover:bg-[#0b2a63]/5'
                  : 'border-white/45 text-white hover:bg-white/15'
              }`}
              aria-label="Open Navigation Menu"
              aria-expanded={menuOpen}
            >
              <span className="hidden sm:inline text-xs font-extrabold tracking-widest uppercase">MENU</span>
              <span className="w-8 h-8 rounded-full bg-[#0b2a63] group-hover:bg-[#a22634] text-white flex items-center justify-center transition-colors duration-300">
                <Menu className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. SAS SLIDE-DOWN SEARCH OVERLAY (.search-menu)
          ===================================================================== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-sas ${
          searchOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!searchOpen}
      >
        {/* Dark Blurred Backdrop */}
        <div
          className={`fixed inset-0 bg-[#131313]/70 backdrop-blur-[2px] transition-opacity duration-500 ease-sas ${
            searchOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSearchOpen(false)}
        />

        {/* Slide-Down White Sheet */}
        <div
          className={`relative bg-white text-[#2b2b2b] w-full max-h-[90vh] shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-transform duration-500 ease-sas z-10 ${
            searchOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          {/* Centered Mini Crest Overlapping Bottom Border (Exact SAS .search-menu:after) */}
          <div className="hidden sm:flex absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border-2 border-[#0b2a63] items-center justify-center overflow-hidden z-20">
            <img src={logoImg} alt="RKPS" className="w-full h-full object-cover" />
          </div>

          {/* Crimson Circular 47px Close Trigger (Exact SAS .search-menu .close-trigger) */}
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-[#a22634] text-white border border-[#a22634] hover:bg-transparent hover:text-[#a22634] flex items-center justify-center transition-all duration-300 cursor-pointer z-20"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-12 overflow-y-auto max-h-[88vh]">
            {/* Search Top Utility Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 pr-14 pb-5 border-b border-slate-200">
              {SEARCH_TOP_BAR.map((item, idx) => {
                const IconComp = iconRegistry[item.icon] || Sparkles;
                return (
                  <button
                    key={idx}
                    onClick={() => triggerItem(item)}
                    className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#072761] hover:text-[#a22634] transition-colors cursor-pointer"
                  >
                    <IconComp className="w-4 h-4 text-[#a22634]" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Form */}
            <form onSubmit={handleSearchSubmit} className="mt-7 relative">
              <div className="flex items-center border-b-2 border-[#072761] focus-within:border-[#a22634] transition-colors pb-3 gap-3">
                <Search className="w-6 h-6 text-[#a22634] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search admissions, fee structure, labs, syllabus, ERP portal, toppers..."
                  className="w-full text-lg sm:text-2xl font-medium text-[#072761] placeholder-slate-400 outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold uppercase text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Results OR Popular Searches + Quick Links */}
            {trimmedQuery ? (
              <div className="mt-6">
                <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">
                  {searchResults.length > 0
                    ? `Matching Results (${searchResults.length})`
                    : 'No exact matches found'}
                </div>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map((res, i) => (
                      <button
                        key={i}
                        onClick={() => triggerItem(res)}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-[#072761] hover:text-white border border-slate-200 hover:border-[#072761] transition-all duration-300 text-left group cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#a22634] group-hover:text-[#faba28]">
                            {res.category}
                          </span>
                          <div className="text-sm font-bold text-[#072761] group-hover:text-white mt-0.5">
                            {res.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#faba28] group-hover:translate-x-1 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    Try searching for "Admissions", "Fee Structure", "Labs", "Library", "ERP", "Gallery", or "Principal".
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Popular Searches (Left 7 cols) */}
                <div className="md:col-span-7">
                  <h4 className="font-bebas text-2xl text-[#072761] tracking-wider uppercase mb-3">
                    POPULAR SEARCHES
                  </h4>
                  <ul className="divide-y divide-slate-100">
                    {POPULAR_SEARCHES.map((ps, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => triggerItem(ps)}
                          className="w-full py-2.5 text-left text-sm font-medium text-slate-700 hover:text-[#a22634] flex items-center justify-between group transition-colors cursor-pointer"
                        >
                          <span>{ps.label}</span>
                          {ps.external ? (
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#a22634]" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#a22634] group-hover:translate-x-1 transition-all" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links (Right 5 cols) */}
                <div className="md:col-span-5 md:border-l md:border-slate-200 md:pl-8">
                  <h4 className="font-bebas text-2xl text-[#072761] tracking-wider uppercase mb-3">
                    QUICK LINKS
                  </h4>
                  <ul className="space-y-2">
                    {SEARCH_QUICK_LINKS.map((ql, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => triggerItem(ql)}
                          className="w-full text-left py-1.5 text-sm font-bold text-[#072761] hover:text-[#a22634] flex items-center gap-2 group transition-colors cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#faba28] group-hover:bg-[#a22634] transition-colors" />
                          <span>{ql.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. SAS 2-COLUMN SPLIT SLIDE-OUT MEGA-MENU (.main-menu)
          ===================================================================== */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ease-sas ${
          menuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Blurred Dark Backdrop */}
        <div
          className={`fixed inset-0 bg-[#131313]/80 backdrop-blur-[2px] transition-opacity duration-500 ease-sas ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-In Drawer Container (max-w-[680px], #072761 with watermark) */}
        <div
          className={`relative w-full max-w-[680px] bg-[#072761] text-white h-full shadow-2xl flex flex-col overflow-hidden z-10 transition-transform duration-500 ease-sas ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Subtle Crest Watermark in Bottom-Left (Matching SAS .main-menu-container) */}
          <img
            src={logoImg}
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -left-36 -bottom-28 w-[420px] h-[420px] object-contain rounded-full opacity-[0.06] grayscale"
          />

          {/* Top-Right Circular 47px Close Button (Exact SAS .main-menu .close-trigger) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/80 text-white hover:bg-[#a22634] hover:border-[#a22634] flex items-center justify-center transition-all duration-400 ease-sas cursor-pointer z-20"
            aria-label="Close Navigation Menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Menu Top Bar (.menu-top-bar) */}
          <div className="px-6 sm:px-12 pt-8 pb-5 pr-20 border-b border-white/10 flex flex-wrap items-center gap-4 sm:gap-7 relative z-10">
            {MENU_TOP_BAR.map((item, idx) => {
              const IconComp = iconRegistry[item.icon] || ShieldCheck;
              return (
                <button
                  key={idx}
                  onClick={() => triggerItem(item)}
                  className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest uppercase text-white/90 hover:text-[#faba28] transition-colors duration-300 cursor-pointer"
                >
                  <IconComp className="w-4 h-4 text-[#faba28]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP: SAS 2-Column Split Interactive Navigation (lg+) */}
          <div className="hidden lg:grid lg:grid-cols-12 flex-1 relative overflow-hidden z-10">
            {/* Vertical Divider Hairline (Matching SAS ::before at ~52%) */}
            <div className="absolute top-8 bottom-8 left-[50%] w-px bg-white/25 pointer-events-none" />

            {/* Left Column: Level 1 Categories with Crimson Sliding Bar + Gold Shift */}
            <nav
              aria-label="Primary Categories"
              className="col-span-6 py-8 pl-12 pr-6 overflow-y-auto space-y-3"
            >
              {MAIN_MENU_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryId(cat.id)}
                    className="relative"
                  >
                    <button
                      onClick={() => setActiveCategoryId(cat.id)}
                      onFocus={() => setActiveCategoryId(cat.id)}
                      className={`group relative w-full text-left font-bebas text-[28px] leading-tight tracking-wider uppercase transition-all duration-400 ease-sas cursor-pointer flex items-center ${
                        isActive
                          ? 'text-[#faba28] translate-x-3'
                          : 'text-white hover:text-[#faba28] hover:translate-x-3'
                      }`}
                    >
                      {/* Crimson Sliding Horizontal Accent Bar (Exact SAS ::before) */}
                      <span
                        className={`absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-1.5 bg-[#a22634] transition-all duration-400 ease-sas ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                        }`}
                      />
                      <span>{cat.label}</span>
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* Right Column: Level 2 Sub-Links (Crossfade + Subtle Slide Reveal) */}
            <div className="col-span-6 py-8 pl-9 pr-10 overflow-y-auto">
              <div key={activeCategory.id} className="animate-sas-slide-right">
                <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#faba28] mb-4">
                  {activeCategory.label}
                </div>
                <ul className="space-y-1.5">
                  {activeCategory.subLinks.map((sub, i) => (
                    <li key={i}>
                      <button
                        onClick={() => triggerItem(sub)}
                        className="w-full text-left py-2 text-sm font-bold text-white/90 hover:text-[#faba28] transition-all duration-300 flex items-center justify-between group cursor-pointer"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {sub.label}
                        </span>
                        {sub.external ? (
                          <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#faba28] shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-[#faba28] group-hover:translate-x-1 transition-all shrink-0" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET: SAS Smooth Accordion Menu (< lg) */}
          <div className="lg:hidden flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/10 relative z-10">
            {MAIN_MENU_CATEGORIES.map((cat) => {
              const expanded = mobileExpandedId === cat.id;
              return (
                <div key={cat.id} className="py-1">
                  <button
                    onClick={() => setMobileExpandedId(expanded ? null : cat.id)}
                    aria-expanded={expanded}
                    className="w-full py-3.5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span
                      className={`font-bebas text-2xl tracking-wider uppercase transition-colors ${
                        expanded ? 'text-[#faba28]' : 'text-white'
                      }`}
                    >
                      {cat.label}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-white/70 transition-transform duration-300 ease-sas ${
                        expanded ? 'rotate-90 text-[#faba28]' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {/* Smooth Height Accordion Transition */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-sas ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="pb-3 pl-3 space-y-1 border-l-2 border-[#a22634] ml-1">
                        {cat.subLinks.map((sub, i) => (
                          <li key={i}>
                            <button
                              onClick={() => triggerItem(sub)}
                              className="w-full text-left py-2 px-3 text-sm font-semibold text-white/85 hover:text-[#faba28] transition-colors flex items-center justify-between cursor-pointer"
                            >
                              <span>{sub.label}</span>
                              {sub.external && <ExternalLink className="w-3.5 h-3.5 opacity-60" />}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Menu Bottom Utility Bar: 4 Alternating Dark-Navy Tiles (Exact SAS .menu-bottom-bar) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 shrink-0 relative z-10">
            {MENU_BOTTOM_TILES.map((tile, idx) => {
              const IconComp = iconRegistry[tile.icon] || GraduationCap;
              const tileBg = idx % 2 === 0 ? 'bg-[#092352]' : 'bg-[#071f4c]';
              return (
                <button
                  key={idx}
                  onClick={() => triggerItem(tile)}
                  className={`${tileBg} hover:bg-[#0a1b3b] py-5 px-3 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 group cursor-pointer border-r border-white/5 last:border-r-0`}
                >
                  <IconComp className="w-4 h-4 text-white group-hover:text-[#faba28] transition-colors duration-300 shrink-0" />
                  <span className="group-hover:text-[#faba28] transition-colors duration-300">
                    {tile.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
