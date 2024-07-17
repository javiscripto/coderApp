import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUserPhoto } from '../features/authSlice';
import { useSaveProfileImageMutation } from '../services/shopService';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '../components/customButton';
import Profile from '../assets/icons/profile';


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
            const hasPermission = await verifyPermissions()
            if (!hasPermission) return
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

    const verifyPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (!granted) {
            Alert.alert(
                'Permisos insuficientes',
                'Necesitas dar permisos para usar la cámara',
                [{ text: 'Ok' }]
            )
            return false
        }
        return true
    }

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
                        <Profile />
                        <Text>no hay una foto :c </Text>
                    </View>
                    <CustomButton onPress={pickImage}>
                        Tomar una foto
                    </CustomButton>
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
