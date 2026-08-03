import { lazy, Suspense } from "react";

const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
const Page = lazy(
  normalizedPath === "/connect"
    ? () => import("./ConnectPage.jsx")
    : () => import("./App.jsx"),
);

function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

export default AppRouter;
