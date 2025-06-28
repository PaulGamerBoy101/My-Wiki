document.addEventListener('DOMContentLoaded', function() {
    // Get all anchor tags
    const links = document.getElementsByTagName('a');
    
    // Convert to array and process each link
    Array.from(links).forEach(link => {
        // Only check relative URLs (same domain)
        if (link.hostname === window.location.hostname) {
            fetch(link.href, { method: 'HEAD' })
                .then(response => {
                    // If page doesn't exist (404), color link red
                    if (!response.ok) {
                        link.style.color = 'red';
                    }
                })
                .catch(() => {
                    // If fetch fails (e.g., network error), assume non-existent
                    link.style.color = 'red';
                });
        }
    });
});
