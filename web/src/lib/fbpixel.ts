// Facebook Pixel ID - fallback to production ID if env var not set
export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? '2917033441818560';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/** Wait for Meta pixel stub/script when loaded via lazyOnload. */
export async function waitForFbq(timeoutMs = 4000): Promise<boolean> {
  if (typeof window === 'undefined') return false
  if (window.fbq) return true

  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, 50))
    if (window.fbq) return true
  }
  return false
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
