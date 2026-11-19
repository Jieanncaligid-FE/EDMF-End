"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChartNoAxesCombined,
  ChevronDown,
  Database,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRoundCheck,
  UserRoundCog,
  Users,
  X,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Students", href: "/admin/students", icon: Users },
  { label: "Enrollment", href: "/admin/enrollment", icon: UserRoundCheck },
  { label: "Academics", href: "/admin/academics", icon: GraduationCap },
  { label: "Library", href: "/admin/library", icon: Library },
  { label: "Data Integration", href: "/admin/integration", icon: Database },
  { label: "Analytics", href: "/admin/analytics", icon: ChartNoAxesCombined },
  { label: "User Management", href: "/admin/users", icon: UserRoundCog },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname() ?? "/admin";
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const pageTitle =
    navigationItems.find((item) => item.href === pathname)?.label ??
    "Administration";
  const searchResults = navigationItems.filter((item) =>
    item.label.toLocaleLowerCase().includes(searchQuery.trim().toLocaleLowerCase()),
  );

  return (
    <div className="uc-dashboard-grid">
      <aside className="uc-sidebar md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="flex items-center justify-between gap-3 px-5 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold text-midnight">
              <GraduationCap aria-hidden="true" size={22} />
            </span>
            <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-white">
              UniConnect
            </span>
          </div>
          <button
            aria-controls="admin-primary-navigation"
            aria-expanded={mobileNavigationOpen}
            aria-label={
              mobileNavigationOpen ? "Close admin navigation" : "Open admin navigation"
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10 md:hidden"
            onClick={() =>
              setMobileNavigationOpen((isOpen) => !isOpen)
            }
            type="button"
          >
            {mobileNavigationOpen ? (
              <X aria-hidden="true" size={19} />
            ) : (
              <Menu aria-hidden="true" size={19} />
            )}
          </button>
        </div>

        <nav
          aria-label="Admin navigation"
          className={mobileNavigationOpen ? "block" : "hidden md:block"}
          id="admin-primary-navigation"
        >
          <ul className="uc-sidebar-nav gap-1 px-3 py-2 md:px-3 md:py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === pathname;

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "!text-midnight bg-gold hover:bg-gold"
                        : "!text-white/80 hover:bg-white/10"
                    }`}
                    href={item.href}
                    onClick={() => setMobileNavigationOpen(false)}
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
            <li className="md:mt-4">
              <Link
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium !text-white/80 transition-colors hover:bg-white/10"
                href="/login"
                onClick={() => setMobileNavigationOpen(false)}
              >
                <LogOut aria-hidden="true" size={18} />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="flex flex-col gap-4 border-b border-border bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs font-medium text-zinc-500">
              UniConnect / Administration
            </p>
            <h1 className="mt-1 text-2xl">{pageTitle}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
              <label className="sr-only" htmlFor="admin-page-search">
                Search admin pages
              </label>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={17}
              />
              <input
                aria-autocomplete="list"
                aria-controls="admin-search-results"
                className="uc-input pl-10"
                id="admin-page-search"
                onChange={(event) => {
                  setSearchQuery(event.currentTarget.value);
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  setSearchOpen(true);
                  setNotificationsOpen(false);
                  setProfileMenuOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearchOpen(false);
                }}
                placeholder="Search admin pages"
                type="search"
                value={searchQuery}
              />
              {searchOpen && searchQuery.trim() && (
                <div
                  aria-label="Admin page search results"
                  className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-border bg-white shadow-lg sm:min-w-64"
                  id="admin-search-results"
                  role="region"
                >
                  {searchResults.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto p-1">
                      {searchResults.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.href}>
                            <Link
                              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm !text-midnight hover:bg-zinc-50"
                              href={item.href}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <Icon aria-hidden="true" size={17} />
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="px-3 py-4 text-sm text-zinc-500" role="status">
                      No matching admin pages.
                    </p>
                  )}
                  <p className="border-t border-border px-3 py-2 text-xs text-zinc-500">
                    Search the Admin navigation
                  </p>
                </div>
              )}
            </div>

            <div className="relative shrink-0">
              <button
                aria-controls="admin-demo-notifications"
                aria-expanded={notificationsOpen}
                aria-label="Demonstration notifications"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-white text-navy hover:bg-zinc-50"
                onClick={() => {
                  setNotificationsOpen((isOpen) => !isOpen);
                  setProfileMenuOpen(false);
                  setSearchOpen(false);
                }}
                type="button"
              >
                <Bell aria-hidden="true" size={18} />
              </button>
              {notificationsOpen && (
                <div
                  aria-label="Demonstration notifications"
                  className="absolute right-0 top-full z-30 mt-2 w-72 rounded-lg border border-border bg-white p-4 shadow-lg"
                  id="admin-demo-notifications"
                  role="region"
                >
                  <h2 className="text-sm font-semibold text-midnight">
                    Demo notifications
                  </h2>
                  <ul className="mt-3 space-y-3">
                    <li className="border-b border-border pb-3">
                      <p className="text-sm text-zinc-700">
                        New student record added
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Sample activity · demonstration only
                      </p>
                    </li>
                    <li>
                      <p className="text-sm text-zinc-700">
                        Library synchronization pending
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Simulated status · no external system connected
                      </p>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative shrink-0">
              <button
                aria-controls="admin-profile-menu"
                aria-expanded={profileMenuOpen}
                aria-label="Administrator profile menu"
                className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1 hover:bg-zinc-50"
                onClick={() => {
                  setProfileMenuOpen((isOpen) => !isOpen);
                  setNotificationsOpen(false);
                  setSearchOpen(false);
                }}
                type="button"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                  AD
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold text-midnight">
                    Administrator
                  </span>
                  <span className="block text-xs text-zinc-500">
                    Demo account
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="text-zinc-500"
                  size={16}
                />
              </button>
              {profileMenuOpen && (
                <div
                  className="absolute right-0 top-full z-30 mt-2 w-52 rounded-lg border border-border bg-white p-2 shadow-lg"
                  id="admin-profile-menu"
                >
                  <Link
                    className="block rounded px-3 py-2 text-sm !text-midnight hover:bg-zinc-50"
                    href="/admin/settings"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Account settings
                  </Link>
                  <Link
                    className="block rounded px-3 py-2 text-sm !text-midnight hover:bg-zinc-50"
                    href="/login"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="uc-dashboard-content">{children}</main>
      </div>
    </div>
  );
}
