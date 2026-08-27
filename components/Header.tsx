"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-to-use", label: "How to Use" },
];

export default function Header() {
  const pathname = usePathname();

  function toggleNav() {
    const menu = document.getElementById("nav-menu");
    const btn = document.querySelector<HTMLButtonElement>(".nav-toggle");
    if (!menu || !btn) return;
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">&#9881;</span>
          <span className="logo-text">ENGINEERTOOLS</span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded="false"
            aria-controls="nav-menu"
            onClick={toggleNav}
          >
            <span className="hamburger"></span>
          </button>
          <ul id="nav-menu" className="nav-menu">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={active ? "nav-link active" : "nav-link"}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
