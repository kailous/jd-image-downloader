(() => {
    console.log('Executing downloadImages.js');

    // Ensure required functions are available
    if (typeof window.getProductName !== 'function') {
        console.error('Function window.getProductName is not defined.');
    }
    if (typeof window.processModules !== 'function') {
        console.error('Function window.processModules is not defined.');
    }
    if (typeof window.processMainImages !== 'function') {
        console.error('Function window.processMainImages is not defined.');
    }

    if (typeof window.getProductName !== 'function' ||
        typeof window.processModules !== 'function' ||
        typeof window.processMainImages !== 'function') {
        console.error('Required functions are not defined. Please check the script loading order.');
        return;
    }

    // Ensure that JSZip and saveAs are available
    if (typeof JSZip === 'undefined' || typeof saveAs === 'undefined') {
        console.error('JSZip or FileSaver is not loaded. Please check if the libraries are correctly injected.');
        return;
    }

    console.log('All required functions and libraries are available.');

    const productName = window.getProductName();
    const detailImageUrls = window.processModules();
    const mainImageUrls = window.processMainImages();

    const allImageUrls = detailImageUrls.concat(mainImageUrls);

    // Function to download images and create ZIP
    const downloadImagesAsZip = async (imageUrls, productName) => {
        const zip = new JSZip();
        const skuFolder = zip.folder(productName);
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

                console.log(`Downloaded image: ${name}`);
            } catch (error) {
                console.error(`Failed to fetch image ${url}:`, error);
            }
        }

        zip.generateAsync({ type: "blob" }).then(function (content) {
            const zipFileName = `${productName}.zip`;
            saveAs(content, zipFileName);
            console.log('Download complete');
        });
    };

    // Start the download process
    downloadImagesAsZip(allImageUrls, productName);
})();