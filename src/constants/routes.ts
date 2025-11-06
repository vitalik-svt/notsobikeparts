export const ROUTES = {
  HOME: '/',
  CAGE_FRONT: '/products/cage-front',
  CAGE_LITTLE: '/products/cage-little',
  CAGE_VOLUME: '/products/cage-volume',
  CAGE_PLUS: '/products/cage-plus',
  TOPCAPS: '/products/topcaps',
  TOPCAPS_CUSTOM: '/products/topcaps-custom',
  VOILE_STRAP: '/products/voile-strap',
  FEEDBAG_HANGER: '/products/feedbag-hanger',
  CHAIN_BREAKER: '/products/chain-breaker',
  ITCHY_AND_SCRATCHY: '/others/itchy-and-scratchy',
  MERCH: '/others/merch',
  TEST_RIDE: '/others/test-ride',
  CART: '/cart',
};

export type ProductLink = typeof ROUTES[keyof typeof ROUTES];