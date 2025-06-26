// Get references to elements
const editor = document.getElementById('codeEditor');
const languageSelect = document.getElementById('languageSelect');
const outputDiv = document.getElementById('output');

// Run button click handler
document.getElementById('runButton').addEventListener('click', () => {
    const code = editor.value;
    const language = languageSelect.value;
    
    try {
        if (language === 'javascript') {
            // For JavaScript, we can actually run the code
            const result = eval(code);
            outputDiv.textContent = `Output:\n${result}`;
        } else if (language === 'html') {
            // Create a new iframe for HTML preview
            const iframe = document.createElement('iframe');
            iframe.style.width = '100%';
            iframe.style.height = '300px';
            iframe.style.border = 'none';
            iframe.style.marginTop = '10px';
            
            // Create HTML document
            const doc = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Preview</title>
                </head>
                <body>
                    ${code}
                </body>
                </html>
            `;
            
            // Set the HTML content
            iframe.srcdoc = doc;
            
            // Clear previous iframe if exists
            const prevIframe = outputDiv.querySelector('iframe');
            if (prevIframe) {
                prevIframe.remove();
            }
            
            // Add new iframe
            outputDiv.innerHTML = '<h3>HTML Preview:</h3>';
            outputDiv.appendChild(iframe);
        } else if (language === 'css') {
            // For CSS, show the code with syntax highlighting
            outputDiv.innerHTML = `
                <style>
                    pre {
                        background-color: #2d2d2d;
                        color: #fff;
                        padding: 10px;
                        border-radius: 5px;
                        overflow-x: auto;
                    }
                    .css-keyword { color: #569cd6; }
                    .css-selector { color: #dcdcaa; }
                    .css-value { color: #ce9178; }
                </style>
                <pre>${code}</pre>
            `;
        } else {
            // For other languages, just show the code
            outputDiv.textContent = `Code Preview:\n${code}`;
        }
    } catch (error) {
        outputDiv.textContent = `Error:\n${error.message}`;
    }
});

// Clear button click handler
document.getElementById('clearButton').addEventListener('click', () => {
    editor.value = '';
    outputDiv.textContent = '';
});

// Download button click handler
document.getElementById('downloadButton').addEventListener('click', () => {
    const code = editor.value;
    const language = languageSelect.value;
    const fileName = `code.${language}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
