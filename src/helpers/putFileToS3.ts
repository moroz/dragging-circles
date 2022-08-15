export const putFileToS3 = (
  url: string,
  file: File | Blob,
  progressCallback: (progress: number) => any
) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);

    xhr.upload.addEventListener("progress", function (ev) {
      if (ev.lengthComputable) {
        progressCallback((ev.loaded / ev.total) * 100);
      }
    });
    xhr.addEventListener("load", function () {
      resolve(xhr.response);
    });
    xhr.send(file);
  });
};
