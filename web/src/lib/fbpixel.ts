// Facebook Pixel ID - fallback to production ID if env var not set
export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? '2917033441818560';

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

  // Filter out blocked parameters that violate Meta's terms
  const filteredOptions = { ...options };
  delete filteredOptions.owner_dob;
  delete filteredOptions.date_of_birth;
  delete filteredOptions.dob;
  delete filteredOptions.birth_date;
  delete filteredOptions.birthdate;

  window.fbq('track', name, filteredOptions);
};

