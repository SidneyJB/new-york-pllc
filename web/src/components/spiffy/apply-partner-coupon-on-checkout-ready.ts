type SpiffyApi = {
  on: (event: 'ready', callback: () => void) => void
  checkout?: (url: string, options?: { coupon?: string }) => unknown
}

type ApplyPartnerCouponOptions = {
  checkoutUrl: string
  coupon: string | null
  spiffy?: SpiffyApi
}

function hasCheckout(spiffy: SpiffyApi): spiffy is SpiffyApi & Required<Pick<SpiffyApi, 'checkout'>> {
  return typeof spiffy.checkout === 'function'
}

function applyCoupon(spiffy: SpiffyApi, checkoutUrl: string, coupon: string): boolean {
  if (!hasCheckout(spiffy)) return false

  spiffy.checkout(checkoutUrl, { coupon })
  return true
}

export function applyPartnerCouponOnCheckoutReady({
  checkoutUrl,
  coupon,
  spiffy = typeof window === 'undefined' ? undefined : (window as typeof window & { spiffy?: SpiffyApi }).spiffy,
}: ApplyPartnerCouponOptions): boolean {
  if (!coupon || !spiffy || typeof spiffy.on !== 'function') return false

  const appliedImmediately = applyCoupon(spiffy, checkoutUrl, coupon)

  if (!appliedImmediately) {
    spiffy.on('ready', () => {
      applyCoupon(spiffy, checkoutUrl, coupon)
    })
  }

  return appliedImmediately
}
