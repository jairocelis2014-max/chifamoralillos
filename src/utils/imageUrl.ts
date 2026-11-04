/**
 * Utility to format and resolve dish image URLs safely across Vite, Vercel, and GitHub.
 * Handles spaces, URL encoding, hyphenated aliases, and automatic fallback.
 */

export function resolveImageUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') {
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
  }

  // Base64 data URLs or absolute HTTP URLs are returned as-is
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Ensure clean leading slash
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('/') && (cleanUrl.startsWith('uploads/') || cleanUrl.startsWith('assets/'))) {
    cleanUrl = '/' + cleanUrl;
  }

  return cleanUrl;
}

/**
 * Handles image loading errors on <img> tags.
 * If a URL like /uploads/Alitas fritas con limón.jpg fails, tries /uploads/Alitas-fritas-con-limón.jpg
 * or encoded URI. If all fail, sets a reliable Chifa dish fallback.
 */
export function handleDishImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  const currentSrc = img.src;

  const retries = Number(img.dataset.retry || '0');

  if (retries === 0) {
    img.dataset.retry = '1';
    // If it has spaces or %20, try hyphenated filename
    if (currentSrc.includes('%20') || currentSrc.includes(' ')) {
      img.src = currentSrc.replace(/%20/g, '-').replace(/ /g, '-');
      return;
    }
    // If it has hyphens, try spaces
    if (currentSrc.includes('-')) {
      img.src = currentSrc.replace(/-/g, '%20');
      return;
    }
  }

  // Final fallback to high-quality Chifa wok image
  img.src = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
}
