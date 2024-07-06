import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useLoginMutation } from '../services/authService';
import { Loader } from "../components/loader";
import { insertSession } from '../DB';

export const Login = () => {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    //querys
    const [triggerLogin, response] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };



    const handleLogin = async () => {
        try {
            await triggerLogin({ email: email.trim().toLowerCase(), password })

        } catch (error) {
            Alert.alert("Error", "datos incorrectos, por favor verifique")
            console.error(`Ha ocurrido un error: ${error}`);
        }
    };
    let isLoading = response.isLoading;



    useEffect(() => {
        if (response.data) {
         const { email, localId, idToken , displayName } = response.data;
            dispatch(setUser(response.data));
            insertSession({ email, localId, idToken , displayName})
                .then(() => {
                    console.log("Sesión insertada correctamente");
                })
                .catch((error) => {
                    console.error("Error insertando sesión:", error);
                });
        }
    }, [response.data]);

    

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
        backgroundColor: '#d628',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily:"Bungee-Regular",
        color:"#d62828"
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
        backgroundColor: '#d62828',
        borderRadius: 5,
    },
    text: {
        color: 'white',
    },
    link: {
        textDecorationLine: "underline"
    }
});
