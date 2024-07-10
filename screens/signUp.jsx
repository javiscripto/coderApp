import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useSignUpMutation } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../components/loader"
import { CustomButton } from "../components/customButton";



export const SignUp = () => {

    //crear usuarios
    const { navigate } = useNavigation()
    const [trigerSignUp, { isLoading }] = useSignUpMutation();

    const handleSignUp = async () => {
        try {
            const payload = await trigerSignUp({ email: email.trim().toLowerCase(), password, displayName: username });
            //ir a login despues de registrarse
            navigate("login");


        } catch (error) {
            console.error(`ha ocurrido un error : ${error}`)
        }
    }


    //-----------------

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleUsernameChange = (text) => {
        setUsername(text)
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    };





    return (
        <SafeAreaView style={styles.container}>

            {isLoading && (<Loader />)}

            <Text style={styles.title}>registrate</Text>

            <TextInput
                placeholder="nombre de usuario"
                onChangeText={handleUsernameChange}
                value={username}
                style={styles.input}
            />

            <TextInput
                placeholder="correo electronico"
                onChangeText={handleEmailChange}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="contraseña"
                onChangeText={handlePasswordChange}
                value={password}
                secureTextEntry
                style={styles.input}
            />

            <CustomButton onPress={handleSignUp}>
                registrarse
            </CustomButton>


        </SafeAreaView>
    )
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
        fontFamily: "Bungee-Regular",
        color: "#d62828"
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
})
