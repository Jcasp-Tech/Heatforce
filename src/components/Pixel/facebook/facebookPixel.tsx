"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import * as pixel from "./lib/fpixel";

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!loaded) return;
    // console.log(pathname,"pathname")
if(pathname==='/')
{
  pixel.event(pixel.EVENTENUMS.ViewContent)
}
if(pathname==='/thankyou/')
{
  console.log("thankyou page")
  pixel.event(pixel.EVENTENUMS.Lead,{'context':'thankyou-Page CONFIRM lead submission'})
}
    pixel.pageview();
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
    </div>
  );
};

export default FacebookPixel;
