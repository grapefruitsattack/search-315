"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { hasAnalyticsConsent } from "@/lib/analytics";

const ScriptGoogleAnalytics = () => {
    const [hasMovedMouse, setHasMovedMouse] = useState(false);
 
    useEffect(() => {
      window.addEventListener("scroll", insertScriptGa);
    }, []);
 
    const insertScriptGa = () => {
      window.removeEventListener("scroll", insertScriptGa);
      setHasMovedMouse(true);
    };

    if (!hasMovedMouse) return <></>;

    if (!hasAnalyticsConsent()) {
      return null;
    };

  return (
    <>
      <Script
        defer
        id="ga-connect"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        defer
        id="ga-track"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", '${process.env.NEXT_PUBLIC_GA_ID}');
        `,
        }}
      />
    </>
  );
};

export default ScriptGoogleAnalytics;