import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Form, Input, Item, Label, Text, Textarea } from 'native-base';
import CoverPicker from "./CoverPicker";
import { useNavigation } from '@react-navigation/native';
import withTestID from "./tests/withTestID";
import { Controller, useForm } from "react-hook-form";

const styles = StyleSheet.create({
  body: {
    width: '100%',
    marginTop: 10,
    paddingLeft: 0,
  },
  buttonContainer: {
    marginTop: 40
  }
});

const PostForm = ({ post, savePost }) => {
  const { control, handleSubmit, errors } = useForm();
  const [cover, setCover] = useState(post.cover);
  const navigation = useNavigation();

  const onSubmit = ({ title, body }) => savePost(navigation, post.id, title, body, cover)

  return (
    <Form>
      <Item
        stackedLabel
        error={!!errors.title}
      >
        <Label>Title</Label>
        <Controller
          testID="title"
          name="title"
          as={Input}
          control={control}
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue={post.title}
        />
      </Item>
      <Item stackedLabel>
        <Label>Text</Label>
        <Controller
          testID="body"
          name="body"
          as={Textarea}
          rowSpan={4}
          control={control}
          style={styles.body}
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue={post.body}
        />
      </Item>
      <Item stackedLabel>
        <Label>Cover</Label>
        <CoverPicker
          testID="coverPicker"
          image={cover}
          setImage={setCover}
        />
      </Item>

      <View style={styles.buttonContainer}>
        <Button
          testID="saveButton"
          full
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Save</Text>
        </Button>
      </View>
    </Form>
  )
}

export default withTestID(PostForm);
