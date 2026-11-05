import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DesignPreview from "./DesignPreview";

export default function Index() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
    return () => cancelAnimationFrame(frame);
  }, [location.hash]);
  return <DesignPreview />;
}
