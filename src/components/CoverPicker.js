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

const CoverPicker = ({ image, setImage }) => {
  const getCameraRollPermissionsAsync = async () => await getPermissions(Permissions.CAMERA_ROLL);
  const getCameraPermissionsAsync = async () => await getPermissions(Permissions.CAMERA);

  const showActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          makePhoto();
        }
        if (buttonIndex === 1) {
          pickImage();
        }
      }
    )
  };

  const makePhoto = async () => {
    try {
      await getCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const pickImage = async () => {
    try {
      await getCameraRollPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

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
