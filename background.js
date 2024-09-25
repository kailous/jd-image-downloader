// Import the necessary libraries
importScripts('libs/jszip.min.js', 'libs/FileSaver.min.js');
// background.js
import JSZip from './libs/jszip.min.js';
import { saveAs } from './libs/FileSaver.min.js';

let productName = '';
let detailImageUrls = [];
let mainImageUrls = [];

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'setProductName') {
    productName = message.data.productName;
  }

  if (message.action === 'setDetailImages') {
    detailImageUrls = message.data.imageUrls;
  }

  if (message.action === 'setMainImages') {
    mainImageUrls = message.data.imageUrls;
  }

  // When all data is received, proceed to download
  if (productName && detailImageUrls.length > 0 && mainImageUrls.length > 0) {
    const allImageUrls = detailImageUrls.concat(mainImageUrls);
    downloadImagesAsZip(allImageUrls, productName);

    // Reset data
    productName = '';
    detailImageUrls = [];
    mainImageUrls = [];
  }
});

// Download images and package them into a ZIP file
async function downloadImagesAsZip(imageUrls, productName) {
  const zip = new JSZip();

  // Create a folder with the product name
  const skuFolder = zip.folder(productName);

  // Create '详情页' and '主图' folders inside the product folder
  const detailsFolder = skuFolder.folder('详情页');
  const mainImagesFolder = skuFolder.folder('主图');

  for (let i = 0; i < imageUrls.length; i++) {
    const { url, name } = imageUrls[i];
    try {
      const response = await fetch(url);
      const imageBlob = await response.blob();

      if (name.startsWith('主图')) {
        mainImagesFolder.file(name, imageBlob);
      } else if (name.startsWith('详情页')) {
        detailsFolder.file(name, imageBlob);
      }
    } catch (error) {
      console.error(`Failed to fetch image ${url}:`, error);
    }
  }

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const zipFileName = `${productName}.zip`;
    saveAs(content, zipFileName);
  });
}