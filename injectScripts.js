(() => {
    // List of scripts to inject into the page
    const scriptsToInject = [
        'libs/jszip.min.js',
        'libs/FileSaver.min.js',
        'modules/getProductName.js',
        'modules/extractImageUrls.js',
        'modules/extractMainImages.js',
        'modules/downloadImages.js'
    ];

    // Function to inject scripts sequentially
    const injectScriptsSequentially = (scripts, index = 0) => {
        if (index >= scripts.length) {
            console.log('All scripts injected successfully.');
            return;
        }
        const filePath = scripts[index];
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL(filePath);
        script.onload = () => {
            console.log(`Injected script: ${filePath}`);
            script.remove(); // Clean up after loading
            // Inject next script
            injectScriptsSequentially(scripts, index + 1);
        };
        script.onerror = () => {
            console.error(`Failed to inject script: ${filePath}`);
        };
        (document.head || document.documentElement).appendChild(script);
    };

    // Start injecting scripts sequentially
    injectScriptsSequentially(scriptsToInject);
})();