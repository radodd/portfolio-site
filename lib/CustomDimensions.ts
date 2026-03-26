// Each PNG has a different intrinsic canvas size (designer inconsistency),
// so widths are hand-computed to preserve aspect ratio at a consistent display height.

export const customWidthByIndexMadasa = (
  index: number,
  isMobile: boolean,
  isTablet: boolean
): number => {
  if (isMobile)  return index === 2 ? 31 : 42;
  if (isTablet)  return index === 2 ? 56 : 75;
  return index === 2 ? 71 : 96;
};

export const customHeightByIndexMadasa = (
  _index: number,
  isMobile: boolean,
  isTablet: boolean
): number => {
  if (isMobile) return 42;
  if (isTablet) return 75;
  return 96;
};

export const customWidthByIndex = (
  index: number,
  isMobile: boolean,
  isTablet: boolean
): number => {
  const mobile:  Record<number, number> = { 0: 27, 1: 28, 2: 19, 3: 19, 4: 20, 5: 27, 6: 25, 7: 6,  8: 29, 9: 20 };
  const tablet:  Record<number, number> = { 0: 49, 1: 51, 2: 35, 3: 35, 4: 37, 5: 49, 6: 45, 7: 11, 8: 52, 9: 37 };
  const desktop: Record<number, number> = { 0: 62, 1: 65, 2: 44, 3: 44, 4: 46, 5: 62, 6: 57, 7: 14, 8: 66, 9: 46 };
  if (isMobile) return mobile[index]  ?? 20;
  if (isTablet) return tablet[index]  ?? 37;
  return desktop[index] ?? 46;
};

export const customHeightByIndex = (
  _index: number,
  isMobile: boolean,
  isTablet: boolean
): number => {
  if (isMobile) return 30;
  if (isTablet) return 54;
  return 66;
};
