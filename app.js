document.addEventListener('DOMContentLoaded', () => {
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    // Add manifest link
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest.json';
    document.head.appendChild(link);

    // Add download app functionality
    const downloadAppBtn = document.getElementById('downloadApp');
    downloadAppBtn.addEventListener('click', () => {
        // Create a zip file of the project
        const zip = new JSZip();
        
        // Add all necessary files
        zip.file('index.html', document.querySelector('html').outerHTML);
        zip.file('styles.css', document.querySelector('style').textContent);
        zip.file('main.js', document.querySelector('script[src="main.js"]').textContent);
        zip.file('app.js', document.querySelector('script[src="app.js"]').textContent);
        zip.file('manifest.json', document.querySelector('link[rel="manifest"]').href);
        
        // Generate the zip file
        zip.generateAsync({type:"blob"})
            .then(function(content) {
                // Create download link
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = 'code-editor.zip';
                a.click();
                URL.revokeObjectURL(a.href);
            });
    });
});
