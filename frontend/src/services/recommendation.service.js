// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: 'MultipleProducts',
  },
  products
) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  const calculateItemsSelected = (product) => {
    const preferences = product.preferences.filter((preference) =>
      selectedPreferences?.includes(preference)
    );
    const features = product.features.filter((feature) =>
      selectedFeatures?.includes(feature)
    );

    return preferences.length + features.length;
  };

  const filteredProducts = products
    .map((product, index) => ({
      ...product,
      itemsSelected: calculateItemsSelected(product),
      position: index,
    }))
    .filter((product) => product.itemsSelected > 0);

  if (selectedRecommendationType === 'SingleProduct') {
    const sortedProducts = Array.from(filteredProducts).sort(
      (a, b) => b.itemsSelected - a.itemsSelected
    );

    const firstPosition = sortedProducts[0];
    const secondPosition = sortedProducts[1];

    const hasBreakEven =
      firstPosition?.itemsSelected === secondPosition?.itemsSelected;

    const item = hasBreakEven ? secondPosition : firstPosition;

    return [item];
  }

  return filteredProducts;
};

const recommendationsService = {
  getRecommendations,
};

export default recommendationsService;
