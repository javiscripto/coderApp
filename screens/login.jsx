import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setProfileImage, setUser } from '../features/authSlice';
import { useLoginMutation } from '../services/authService';
import { useGetProfileImageQuery } from "../services/shopService"
import { Loader } from "../components/loader"

export const Login = () => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    //querys
    const [triggerLogin, response] = useLoginMutation();
    const [localId, setLocalId] = useState(null);

    const { data: imageData, refetch: refetchProfileImage , isLoading:imageIsLoading } = useGetProfileImageQuery(localId, {skip: !localId,});


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const isLoading = response.isLoading || imageIsLoading;



    const handleLogin = async () => {
        try {
            const payload = await triggerLogin({ email, password });
            console.log(payload)
            if (!payload.data) {
                Alert.alert("Datos incorrectos, intente nuevamente");
                return;
            }

            setLocalId(payload.data.localId)
            dispatch(setUser(payload));

        } catch (error) {
            console.error(`Ha ocurrido un error: ${error}`);
        }
    };


    useEffect(() => {
        if (localId) {
            refetchProfileImage();
            console.log(imageData)
            dispatch(setProfileImage(imageData))

        }
    }, [localId, imageData]);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && (<Loader />)}

            <Text style={styles.title}>Inicia sesión</Text>

            <TextInput
                placeholder="Correo electrónico"
                onChangeText={handleEmailChange}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Contraseña"
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry
                style={styles.input}
            />

            <Pressable
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.text}>Login</Text>
            </Pressable>

            <Text>o</Text>

            <Pressable onPress={() => navigate("sign up")}>
                <Text style={styles.link}>Regístrate</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
    link: {
        textDecorationLine: "underline"
    }
});
