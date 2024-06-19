import { View, Text, StyleSheet, Image, Pressable, Alert, Button } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';





export default function ImageSelector() {

    const [image, setImage] = useState(null);




    const verifyPermissions = async () => {
        

            const result = await PermissionStatus.askAsync(
                Permissions.CAMERA_ROLL,
                Permissions.CAMERA
            )
            if (result.status !== "granted") {
                Alert.alert(`permisos insuficientes`,
                    `necesitas dar permisos para utilizar la camara del dispositivo`,

                )
                return false
            }
            return true

        

    };


    //---------------------------------
    const pickImage = async () => {
        try {

            //const hasPermission = await verifyPermissions()
            //if (!hasPermission) return
            // No permissions request is necessary for launching the image library
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
            console.error("error :", error)
        }

    };

 
    //---------------------------------
    const confirmImage = () => {

    }




 


    return (
        <View style={styles.container} >
            {
                image ?
                    <View style={styles.container}>
                        <Image source={{ uri: image }} style={styles.img} />
                        <Pressable style={styles.button} onPress={pickImage}>
                            <Text style={styles.buttonText} >tomar otra foto</Text>
                        </Pressable>


                        <Pressable style={styles.button} onPress={confirmImage}>
                            <Text style={styles.buttonText} >confirmar foto</Text>
                        </Pressable>
                    </View>
                    :
                    <>
                        <View style={styles.secondaryContainer}>
                            <Text>no hay una foto</Text>
                        </View>
                        <Pressable style={styles.button} onPress={pickImage}>
                            <Text style={styles.buttonText} >tomar una foto</Text>
                        </Pressable>

                    </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
    img: {
        width: 200,
        height: 200,
        borderRadius:100
    },
    secondaryContainer: {
        width: 200,
        height: 200,
        padding: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: '#d62828',
        padding: 16,
        borderRadius: 8,
    },
    buttonText:{
        color:"#fff"
    }
})

