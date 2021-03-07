export const MEDIA_QUERIES = {
  SMALL_SCREEN: { type: 'max', size: 375 },
  MEDIUM_SCREEN: { type: 'max', size: 900 },
  LARGE_SCREEN: { type: 'min', size: 901 }
};

export const media = Object.keys(MEDIA_QUERIES).reduce((acc, key) => {
  const { type, size } = MEDIA_QUERIES[key];
  acc[key] = (style) => `
      @media (${type}-width: ${size}px) {
        ${style};
      }
    `;
  return acc;
}, {});
