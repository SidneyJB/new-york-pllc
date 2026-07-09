export const CLICK_ATTR_COOKIE_NAME = 'nypllc_click_attr'
export const CLICK_ATTR_COOKIE_MAX_AGE_DAYS = 90

/** Query keys persisted for Spiffy checkout + CRM attribution. */
export const CLICK_ATTR_PARAM_KEYS = [
  'gclid',
  'wbraid',
  'gbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export type ClickAttrParamKey = (typeof CLICK_ATTR_PARAM_KEYS)[number]

export type ClickAttribution = Partial<Record<ClickAttrParamKey, string>>
