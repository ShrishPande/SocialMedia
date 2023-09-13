import {v2 as cloudinary} from 'cloudinary';
          
import {CloudinaryStorage} from 'multer-storage-cloudinary'

cloudinary.config({ 
  cloud_name: 'dnyyhezmx', 
  api_key: '388551811168568', 
  api_secret: 'l8dXLrdwuDp9jGBtgx6BgeLf1o8' 
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg','png'],
    params:{
        folder: 'newSocial',
        transformations:[{width:500,height:500,crop:"limit"}]
    }
})

export default storage