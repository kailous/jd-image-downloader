(() => {
  const getProductName = () => {
      return document.querySelector('.product-intro .itemInfo-wrap .sku-name')?.innerText.trim() || '商品';
  };

  // Attach the function to the window object
  window.getProductName = getProductName;

  console.log('getProductName function is defined.');
})();