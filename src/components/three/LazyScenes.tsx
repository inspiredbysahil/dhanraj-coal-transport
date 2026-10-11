import { lazy, Suspense, useEffect, useState, type ComponentProps } from "react";
import { ClientOnly } from "@tanstack/react-router";

const load = () => import("./Scenes");
const LazyHero = lazy(() => load().then((m) => ({ default: m.HeroScene })));
const LazyProduct = lazy(() => load().then((m) => ({ default: m.ProductScene })));
const LazyGlobe = lazy(() => load().then((m) => ({ default: m.GlobeScene })));

/** Wait until the browser is idle after first paint before pulling in Three.js. */
function useIdle() {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) { w.requestIdleCallback(() => setIdle(true), { timeout: 2000 }); }
    else { const t = window.setTimeout(() => setIdle(true), 1200); return () => window.clearTimeout(t); }
  }, []);
  return idle;
}

function canRun3D(minWidth = 0) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return false;
  return window.innerWidth >= minWidth;
}

function Gate({ children, fallback, minWidth }: { children: React.ReactNode; fallback: React.ReactNode; minWidth?: number }) {
  const idle = useIdle();
  const [ok, setOk] = useState(false);
  useEffect(() => { setOk(canRun3D(minWidth)); }, [minWidth]);
  if (!idle || !ok) return <>{fallback}</>;
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

const placeholder = (cls: string) => <div className={cls} aria-hidden />;

export function HeroScene() {
  return <ClientOnly fallback={null}><Gate fallback={null} minWidth={768}><LazyHero /></Gate></ClientOnly>;
}

export function ProductScene(props: ComponentProps<typeof LazyProduct>) {
  const fb = placeholder("h-full min-h-80 w-full bg-muted");
  return <ClientOnly fallback={fb}><Gate fallback={fb}><LazyProduct {...props} /></Gate></ClientOnly>;
}

export function GlobeScene(props: ComponentProps<typeof LazyGlobe>) {
  const fb = placeholder("h-full min-h-96 bg-card");
  return <ClientOnly fallback={fb}><Gate fallback={fb}><LazyGlobe {...props} /></Gate></ClientOnly>;
}
