const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_\-]+$/;

export function youtubeThumbnailUrl(videoId: string, variant: string) {
  return `https://img.youtube.com/vi/${videoId}/${variant}.jpg`;
}

export function extractYoutubeId(url: string) {
  if (url.match(YOUTUBE_ID_REGEX)) return url;
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "www.youtube.com" &&
      parsed.searchParams.get("v")?.match(YOUTUBE_ID_REGEX)
    ) {
      return parsed.searchParams.get("v");
    }
    if (
      parsed.hostname === "youtu.be" &&
      parsed.pathname.slice(1).match(YOUTUBE_ID_REGEX)
    ) {
      return parsed.pathname.slice(1);
    }
  } catch (e) {
    return null;
  }
}

export function validateByThumbnail(youtubeId: string) {
  return new Promise((resolve) => {
    if (!youtubeId) {
      return resolve(false);
    }
    const img = document.createElement("img");
    img.addEventListener("load", () => {
      resolve(img.width !== 120);
    });
    img.src = youtubeThumbnailUrl(youtubeId, "mqdefault");
  });
}

export async function fetchMetadata(youtubeId: string) {
  const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  return fetch(`https://youtube.com/oembed?url=${videoUrl}&format=json`).then(
    (raw) => raw.json()
  );
}
