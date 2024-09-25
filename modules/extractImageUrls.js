(() => {
  // 获取所有 ssd-module-wrap 下的 ssd-module 元素
  const getModules = () => {
      return document.querySelectorAll('.ssd-module-wrap .ssd-module');
  };

  // 提取背景图片 URL
  const extractImageUrl = (module) => {
      const style = window.getComputedStyle(module);
      const backgroundImage = style.getPropertyValue('background-image');
      const urlMatch = backgroundImage.match(/url\("?(.+?)"?\)/);
      if (urlMatch && urlMatch[1]) {
          let imageUrl = urlMatch[1];
          if (!imageUrl.startsWith('http')) {
              imageUrl = 'https:' + imageUrl;
          }
          return imageUrl;
      }
      return null;
  };

  // 生成图片名称
  const generateImageName = (count) => {
      return `详情页_${String(count).padStart(2, '0')}.jpg`;
  };

  // 处理所有模块，提取图片并生成相应的名称
  const processModules = () => {
      const modules = getModules();
      let imageUrls = [];
      let imageCount = 1;

      modules.forEach(module => {
          const imageUrl = extractImageUrl(module);
          if (imageUrl) {
              imageUrls.push({
                  url: imageUrl,
                  name: generateImageName(imageCount)
              });
              imageCount++;
          }
      });

      return imageUrls;
  };

  // 将函数挂载到 window 对象
  window.processModules = processModules;

    console.log('processModules function is defined.');
})();