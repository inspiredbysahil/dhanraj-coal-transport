import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Truck } from "lucide-react";

export function TransportScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "85%"]);
  return <div ref={ref} className="transport-band overflow-hidden py-12">
    <div className="site-shell">
      <p className="eyebrow">Trusted transport across India</p>
      <div className="mt-4 h-28 border-b border-border/70">
        <motion.div style={{ x }} className="flex h-20 w-28 items-center justify-center text-primary">
          <Truck className="h-16 w-16" strokeWidth={1.2} />
        </motion.div>
      </div>
      <p className="mt-5 max-w-2xl text-muted-foreground">Verified drivers, GPS-tracked trucks and on-time delivery to every state — built on trust, delivered with care.</p>
    </div>
  </div>;
}