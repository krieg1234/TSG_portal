export const salesFilter = (saleItem, filters) => {
  if (!saleItem) {
    return false
  }
  const { header, content, price, categoryId } = saleItem;
  const { currentCategory, priceRange, textFilter } = filters;
  if (currentCategory) {
    if (currentCategory.id !== categoryId) return false;
  }
  if (textFilter) {
    const isHeaderInclude = header.includes(textFilter);
    const isContentIncludes = content.includes(textFilter);
    if (!isHeaderInclude && !isContentIncludes) return false;
  }
  const [lowLimit, upperLimit] = priceRange;
  if (lowLimit !== 0 || upperLimit !== Infinity) {
    const isInRange = lowLimit <= price && upperLimit >= price;
    if (!isInRange) return false;
  }
  return true;
};
