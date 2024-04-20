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

const preloadVideo = async (src: string): Promise<HTMLVideoElement> => {
  const res = await fetch(src);
  const blob = await res.blob();
  const preloadedVideo = document.createElement("video");
  preloadedVideo.src = URL.createObjectURL(blob);
  return preloadedVideo;
}

const parseTransform = (element: HTMLElement) => {
  let transform = window.getComputedStyle(element).transform
  return transform
    .split(/\(|,|\)/)
    .slice(1, -1)
    .map(function(v) {
      return parseFloat(v)
    })
};

export const nullifyTransforms = (element: HTMLElement) => {
  let {top, left, width, height} = element.getBoundingClientRect()
  let transformArr = parseTransform(element)

  if (transformArr.length == 6) {
    var t = transformArr
    let det = t[0] * t[3] - t[1] * t[2]

    return {
      width: width / t[0],
      height: height / t[3],
      left:
        (left * t[3] - top * t[2] + t[2] * t[5] - t[4] * t[3]) /
        det,
      top:
        (-left * t[1] + top * t[0] + t[4] * t[1] - t[0] * t[5]) /
        det,
    }
  } else {
    return { top, left, width, height };
  }
}