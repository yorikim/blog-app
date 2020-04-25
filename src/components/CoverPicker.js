import React from 'react';
import { Button, Image } from 'react-native';
import ImagePicker from './ImagePicker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ActionSheet } from "native-base";

const BUTTONS = ["Make a photo", "Pick from a library", "Cancel"];
const CANCEL_INDEX = BUTTONS.length - 1;

const getPermissions = async (permission) => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions!');
    }
  }
}

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
}

const CoverPicker = ({ image, setImage }) => {
  const getCameraRollPermissionsAsync = async () => await getPermissions(Permissions.CAMERA_ROLL);
  const getCameraPermissionsAsync = async () => await getPermissions(Permissions.CAMERA);

  const showActionSheet = () => {
    ActionSheet.show({ options: BUTTONS, cancelButtonIndex: CANCEL_INDEX },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          await updateImage(getCameraPermissionsAsync, ImagePicker.launchCameraAsync);
        }
        if (buttonIndex === 1) {
          await updateImage(getCameraRollPermissionsAsync, ImagePicker.launchImageLibraryAsync);
        }
      }
    )
  };

  const updateImage = async (getPermissions, action) => {
    try {
      await getPermissions();
      let result = await action(imagePickerOptions);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <Button testID="pickImage" title="Pick an image" onPress={showActionSheet}/>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/>}
    </>
  );
}

export default CoverPicker;
