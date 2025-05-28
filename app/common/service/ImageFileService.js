import HttpService from './HttpService';

export const ImageUpload = async formData => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/fileupload/imageupload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('image upload', response.data);
    return response.data;
  } catch (error) {
    console.error('image upload error:', error);
    throw error;
  }
};


export const RemoveImage = async imageName => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/fileupload/deleteimage',
      {
        imageName: imageName,
      },
    );
    console.log('image remove', response.data);
    return response.data;
  } catch (error) {
    console.error('image remove error:', error);
    throw error;
  }
};

export const FileUpload = async formData => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/fileupload/fileupload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('file upload', response.data);
    return response.data;
  } catch (error) {
    console.error('file upload error:', error);
    throw error;
  }
};

export const RemoveFile = async imageName => {
  try {
    const response = await HttpService.techForgeAPI.post(
      '/fileupload/deletefile',
      {
        imageName: imageName,
      },
    );
    console.log('image remove', response.data);
    return response.data;
  } catch (error) {
    console.error('image remove error:', error);
    throw error;
  }
};
