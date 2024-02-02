import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import clsx from "clsx";
import css from "./App.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const SharedLayout = () => {
  return (
    <>
      <header>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
      </main>
    </>
  );
};

export default SharedLayout;
