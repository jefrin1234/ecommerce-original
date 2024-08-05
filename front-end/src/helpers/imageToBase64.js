const imageToBase64 = async (image) => {
  const reader = new FileReader();

  // Start reading the image file as a data URL
  reader.readAsDataURL(image);

  // Return a promise to handle asynchronous reading
  const data = await new Promise((resolve, reject) => {
    // Set up a load event handler
    reader.onload = () => {
      // Resolve the promise with the result when successful
      resolve(reader.result);
    };

    // Set up an error event handler
    reader.onerror = (error) => {
      // Reject the promise with the error when there's an issue
      reject(error);
    };
  });

  // Return the Base64 data URL string
  return data;
};

export default imageToBase64;
