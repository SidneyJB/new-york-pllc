export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? '';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const pageview = () => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'PageView');
};

export const event = (
  name: string,
  options: Record<string, any> = {}
) => {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', name, options);
};

