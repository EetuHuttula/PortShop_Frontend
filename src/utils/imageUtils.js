// Placeholder image (a simple gray placeholder SVG)
export const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%23999" text-anchor="middle" dy=".3em"%3EImage Not Available%3C/text%3E%3C/svg%3E';

// Handle image load error by setting placeholder
export const handleImageError = (e) => {
  e.target.src = PLACEHOLDER_IMAGE;
};
