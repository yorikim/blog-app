import * as ImagePicker from 'expo-image-picker';
import ImagePickerE2E from './ImagePicker.e2e';

let imagePicker = ImagePicker;

if (process.env.APP_ENV === 'test') {
  imagePicker = ImagePickerE2E;
}

export default imagePicker;
