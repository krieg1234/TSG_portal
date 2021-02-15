//функция фильтрации элемента списка объявлений в зависимости от настроек в фильтрбаре

export const salesFilter = (saleItem, filters) => {
  if (!saleItem) {
    return false
  }
  const { header, content, price, categoryId } = saleItem;
  const { currentCategory, priceRange, textFilter } = filters;
  if (currentCategory) { //по категории
    if (currentCategory.id !== categoryId) return false;
  }
  if (textFilter) { //по тексту объявления
    const isHeaderInclude = header.includes(textFilter);
    const isContentIncludes = content.includes(textFilter);
    if (!isHeaderInclude && !isContentIncludes) return false;
  }
  const [lowLimit, upperLimit] = priceRange; 
  if (lowLimit !== 0 || upperLimit !== Infinity) { //по цене
    const isInRange = lowLimit <= price && upperLimit >= price;
    if (!isInRange) return false;
  }
  return true;
};
