import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Tablets: aproximadamente 768px o más
  const isTablet = width >= 768;

  // Teléfonos grandes / aproximadamente 6 pulgadas
  const isLargePhone = width >= 390 && width < 768;

  // Teléfonos pequeños
  const isSmallPhone = width < 390;

  const horizontalPadding = isTablet ? 32 : isLargePhone ? 20 : 16;

  const maxContentWidth = isTablet ? 900 : '100%';

  const cardColumns = isTablet ? 2 : 1;

  const titleSize = isTablet ? 34 : isLargePhone ? 30 : 26;

  const descriptionSize = isTablet ? 16 : 14;

  return {
    width,
    height,

    isTablet,
    isLargePhone,
    isSmallPhone,

    horizontalPadding,
    maxContentWidth,
    cardColumns,
    titleSize,
    descriptionSize,
  };
}