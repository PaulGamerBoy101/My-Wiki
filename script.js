document.addEventListener('DOMContentLoaded', function() {
    // Placeholder for search (disabled for static site)
    const searchInput = document.querySelector('#nav-search input[type="search"]');
    searchInput.addEventListener('focus', function() {
        this.placeholder = 'Search disabled for static site';
    });
});
