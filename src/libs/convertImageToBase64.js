// imgUrl: the image origin url
// callback: when the image is converted to base64, will call this function 
// we can wrap this function to Promise-based
//  function convertImageToBase64Async(imagUrl) {
//     return new Promise(resovle => convertImageToBase64(imgUrl, resolve))
//  } 

function convertImageToBase64(imgUrl, callback) {
  const image = new Image();
  image.crossOrigin='anonymous';
  image.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL();
    callback && callback(dataUrl)
  }
  image.src = imgUrl;
}


export async function convertImageToBase64Promise(imgURL) {
  return new Promise(resolve => convertImageToBase64(imgURL, resolve))
}

export function convertBase64ToImageSrc(base64) {
  const base64Data = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  const decodedBase64 = atob(base64Data)
  const uint8Array = new Uint8Array(decodedBase64.length);
  for (let i = 0; i < decodedBase64.length; i++) {
    uint8Array[i] = decodedBase64.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl
}