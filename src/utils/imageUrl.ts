/**
 * Utility to format and resolve dish image URLs safely across Vite, Vercel, GitHub, and cPanel hosting.
 * Handles spaces, URL encoding, hyphenated aliases, subdirectories, and automatic resilient fallback.
 */

export function resolveImageUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
  }

  // Base64 data URLs or absolute HTTP URLs are returned as-is
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Ensure clean leading slash
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('./') && (cleanUrl.startsWith('uploads/') || cleanUrl.startsWith('assets/'))) {
    cleanUrl = '/' + cleanUrl;
  }

  // Encode special characters like spaces, accents, and parentheses for safe cPanel / Vercel / Apache fetching
  try {
    return encodeURI(decodeURI(cleanUrl));
  } catch (e) {
    return cleanUrl;
  }
}

/**
 * Handles image loading errors on <img> tags.
 * If a URL like /uploads/Langostinos%20dorados.jpg fails, tries hyphens, spaces, aliases,
 * relative paths without leading slash (for cPanel subdirectories), or dot fixes.
 * If all attempts fail, sets a reliable high quality Chifa dish fallback.
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
    // If it has hyphens, try spaces with %20
    if (currentSrc.includes('-')) {
      img.src = currentSrc.replace(/-/g, '%20');
      return;
    }
  } else if (retries === 1) {
    img.dataset.retry = '2';
    // Handle double-dot extension ..jpg vs .jpg
    if (currentSrc.includes('..jpg')) {
      img.src = currentSrc.replace('..jpg', '.jpg');
      return;
    }
    if (currentSrc.includes('.jpg') && !currentSrc.includes('..jpg')) {
      img.src = currentSrc.replace('.jpg', '..jpg');
      return;
    }
    // Handle .png vs .jpg
    if (currentSrc.includes('.png')) {
      img.src = currentSrc.replace('.png', '.jpg');
      return;
    }
    if (currentSrc.includes('.jpg')) {
      img.src = currentSrc.replace('.jpg', '.png');
      return;
    }
  } else if (retries === 2) {
    img.dataset.retry = '3';
    // Inca kola aliases
    if (currentSrc.toLowerCase().includes('inca') && currentSrc.toLowerCase().includes('kola')) {
      if (currentSrc.includes('296')) {
        img.src = currentSrc.replace(/Inca%20kola%20296%20ml\.jpg/i, 'inca%20kola.jpg');
        return;
      } else {
        img.src = currentSrc.replace(/inca%20kola\.jpg/i, 'Inca%20kola%20296%20ml.jpg');
        return;
      }
    }
    // Try decoded raw URL
    try {
      img.src = decodeURI(currentSrc);
      return;
    } catch {
      // ignore
    }
  } else if (retries === 3) {
    img.dataset.retry = '4';
    // Try relative path from current origin without leading slash for cPanel subfolder installations
    try {
      const urlObj = new URL(currentSrc);
      const pathname = urlObj.pathname;
      if (pathname.startsWith('/uploads/')) {
        img.src = 'uploads/' + pathname.slice(9);
        return;
      }
    } catch {
      // ignore
    }
  }

  // Final fallback to high-quality Chifa wok image
  img.src = 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
}
