(() => {
  // 获取 .spec-list ul.lh 下的图片元素
  const getMainImageElements = () => {
      return document.querySelectorAll('.spec-list ul.lh img');
  };

  // 提取并修改图片 URL
  const extractAndModifyImageUrls = (img) => {
      let imageUrl = img.getAttribute('src') || img.getAttribute('data-lazy-img');
      if (!imageUrl.startsWith('http')) {
          imageUrl = 'https:' + imageUrl;
      }
      const n1Url = imageUrl.replace(/n\d/, 'n1');
      const n0Url = imageUrl.replace(/n\d/, 'n0');
      return { n1Url, n0Url };
  };

  // 生成主图文件名称
  const generateMainImageName = (count, type) => {
      if (type === 'JDHD') {
          return `主图_${String(count).padStart(2, '0')}_JDHD.jpg`;
      }
      return `主图_${String(count).padStart(2, '0')}.jpg`;
  };

  // 处理所有主图，提取图片并生成相应的名称
  const processMainImages = () => {
      const images = getMainImageElements();
      let imageUrls = [];
      let imageCount = 1;

      images.forEach(img => {
          const { n1Url, n0Url } = extractAndModifyImageUrls(img);

          imageUrls.push({
              url: n1Url,
              name: generateMainImageName(imageCount, 'default')
          });
          imageUrls.push({
              url: n0Url,
              name: generateMainImageName(imageCount, 'JDHD')
          });

          imageCount++;
      });

      return imageUrls;
  };

  // 将函数挂载到 window 对象
  window.processMainImages = processMainImages;
  console.log('processMainImages function is defined.');
})();