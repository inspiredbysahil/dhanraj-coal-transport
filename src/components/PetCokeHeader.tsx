import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fuel, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export function PetCokeHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const update = () => setStuck(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const close = () => setOpen(false);
  const links = <>
    {site.nav.filter(([name]) => ["About", "Products", "Rates", "Contact"].includes(name)).map(([name, hash]) => <Link key={hash} to="/" hash={hash} onClick={close}>{name}</Link>)}
    <Link to="/coal-mines" onClick={close}>Coal Mines</Link>
    <Link to="/pet-coke-price" onClick={close} aria-current="page" className="border-b-2 border-lime py-2 font-semibold text-foreground">Pet Coke</Link>
  </>;
  const brand = <Link to="/" className="brand-mark shrink-0" aria-label="Dhanraj Coal Transport home"><span className="brand-icon"><Fuel aria-hidden="true" /></span><span><strong>DHANRAJ</strong><small>COAL TRANSPORT</small></span></Link>;
  return <>
    <header className="page-chrome relative z-30">
      <div className="site-shell flex min-h-20 items-center justify-between gap-3">
        {brand}
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground xl:flex" aria-label="Main navigation">{links}</nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline" aria-label={`Call ${site.primaryPhone}`}><a href={site.primaryPhoneHref}><Phone aria-hidden="true" /><span className="hidden sm:inline">{site.primaryPhone}</span></a></Button>
          <div className="xl:hidden"><Button variant="circle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="pet-coke-mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</Button></div>
        </div>
      </div>
      {open && <nav id="pet-coke-mobile-menu" className="mobile-nav xl:hidden" aria-label="Mobile navigation">{links}</nav>}
    </header>
    {stuck && <div className="sticky-nav hidden xl:block"><div className="flex min-h-16 items-center justify-between gap-4 px-6">{brand}<nav className="flex items-center gap-5 text-sm text-muted-foreground" aria-label="Sticky navigation">{links}</nav><Button asChild variant="circle" aria-label={`Call ${site.primaryPhone}`}><a href={site.primaryPhoneHref}><Phone aria-hidden="true" /></a></Button></div></div>}
  </>;
}