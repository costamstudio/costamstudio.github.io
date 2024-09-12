export const getRandomNumberInRange = (min: number, max: number, except?: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number !== except ? number : getRandomNumberInRange(min, max, except);
};

export const loadImages = async (images: string[]): Promise<HTMLImageElement[]> => {
  const promises = await images.map(src => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = () => reject();
    });
  });
  return Promise.all(promises);
};

export const loadVideos = async (videos: string[]): Promise<HTMLVideoElement[]> => {
  return Promise.all(videos.map(src => preloadVideo(src)));
};

export const flattenMessages = ((nestedMessages: any, prefix = '') => {
  if (nestedMessages === null) {
    return {};
  }

  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value       = nestedMessages[key]
    const prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value })
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {});
});

const preloadVideo = async (src: string): Promise<HTMLVideoElement> => {
  const res = await fetch(src);
  const blob = await res.blob();
  const preloadedVideo = document.createElement("video");
  preloadedVideo.src = URL.createObjectURL(blob);
  return preloadedVideo;
}