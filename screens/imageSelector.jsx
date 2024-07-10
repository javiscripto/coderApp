import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setProfileImage, setUserPhoto } from '../features/authSlice';
import { useSaveProfileImageMutation } from '../services/shopService';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../components/customButton';

export default function ImageSelector() {
    const [image, setImage] = useState(null);
    const { localId, photo, userName } = useSelector(state => state.auth.value.user);


    const { goBack } = useNavigation()
    const dispatch = useDispatch();
    const [triggerSaveProfileImage, result] = useSaveProfileImageMutation();

    useEffect(() => {
        if (photo) {
            setImage(photo);
        }
    }, [photo]);

    const handleLogout = () => {
        dispatch(clearUser());
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64: true,
                aspect: [1, 1],
                quality: 0.3,
            });

            if (!result.canceled) {
                setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
            }
        } catch (error) {
            console.error("error :", error);
        }
    };

    const confirmImage = async () => {
        try {
            dispatch(setUserPhoto(image));
            const response = await triggerSaveProfileImage({ image, localId });
            Alert.alert("Éxito", "Imagen guardada correctamente");
            goBack()
        } catch (error) {
            console.error("Error al guardar la imagen:", error);
            Alert.alert("Error", "No se pudo guardar la imagen");
        }
    };

    return (
        <View style={styles.container}>
            <Text>usuario: {userName}</Text>
            <Pressable style={styles.logout} onPress={handleLogout}>
                <Text style={styles.logout}>logout</Text>
            </Pressable>
            {image ? (
                <View style={styles.container}>
                    <Image source={{ uri: image }} style={styles.img} />


                    <CustomButton onPress={pickImage}>
                        tomar otra foto
                    </CustomButton>
                    <CustomButton onPress={confirmImage}>
                        confirmar foto
                    </CustomButton>
                </View>
            ) : (
                <>
                    <View style={styles.secondaryContainer}>
                        <Text>no hay una foto</Text>
                    </View>
                    <Pressable style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>tomar una foto</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    logout: {
        color: "grey",
        textDecorationLine: "underline",
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    secondaryContainer: {
        width: 200,
        height: 200,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },

});
