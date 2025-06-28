function parseMarkdown(markdownText) {
    // Split the text into lines
    const lines = markdownText.split('\n').filter(line => line.trim() !== '');
    let html = '';
    let inList = false;

    for (let line of lines) {
        line = line.trim();

        // Headings (# and ##)
        if (line.startsWith('## ')) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h2>${line.slice(3)}</h2>`;
        } else if (line.startsWith('# ')) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<h1>${line.slice(2)}</h1>`;
        }
        // Unordered lists (-)
        else if (line.startsWith('- ')) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            html += `<li>${processInline(line.slice(2))}</li>`;
        }
        // Paragraphs (default for non-empty lines that aren't headings or lists)
        else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += `<p>${processInline(line)}</p>`;
        }
    }

    // Close any open list
    if (inList) {
        html += '</ul>';
    }

    return html;

    // Process inline Markdown (bold, italic, links)
    function processInline(text) {
        // Bold (**text**)
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Italic (*text*)
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // Links ([text](url))
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        return text;
    }
}

// Fetch and render the Markdown file
fetch('elaris.md')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load Markdown file');
        }
        return response.text();
    })
    .then(data => {
        const htmlContent = parseMarkdown(data);
        document.getElementById('markdown-content').innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('markdown-content').innerHTML = '<p>Error loading Markdown file.</p>';
    });
