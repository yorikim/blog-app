import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

export default {
  MediaTypeOptions: ImagePicker.MediaTypeOptions,
  launchImageLibraryAsync: async (options) => {
    const { uri } = await Asset.fromModule(require('../../e2e/fixtures/cover.jpg'));
    return ({
      uri,
      canceled: false
    });
  },
};
