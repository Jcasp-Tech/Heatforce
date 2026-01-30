export const FB_PIXEL_ID =process.env.NEXT_PUBLIC_FB_PIXEL_ID;
export const pageview = () => {
  (window as any)?.fbq("track", "PageView");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  (window as any).fbq("track", name, options);
};

export const enum EVENTENUMS{
  FindLocation='FindLocation',
  Search='Search',
  AddToBasket='AddToBasket',
  InitiateCheckout='InitiateCheckout',
  Lead='Lead',
  customiseProduct ='customiseProduct',
  ViewContent='ViewContent'
}