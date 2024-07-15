import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useSignUpMutation } from "../services/authService";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../components/loader"
import { CustomButton } from "../components/customButton";
import { signupSchema } from "../validations/signUpSchema";
import { Input } from "../components/input";



export const SignUp = () => {


    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(``);

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')

    //crear usuarios
    const { navigate } = useNavigation()
    const [trigerSignUp, { isLoading }] = useSignUpMutation();





    const handleSignUp = async () => {
        try {
            setErrorEmail('');
            setErrorPassword('');
            setErrorConfirmPassword('');
            
            await signupSchema.validate({
                email,
                password,
                confirmPassword
            })



            const payload = await trigerSignUp({ email: email.trim().toLowerCase(), password, displayName: username });
            //ir a login despues de registrarse
            navigate("login");


        } catch (error) {
            if (error.name === 'ValidationError') {
                switch (error.path) {
                    case 'email':
                        setErrorEmail(error.message)
                        break
                    case 'password':
                        setErrorPassword(error.message)
                        break
                    case 'confirmPassword':
                        setErrorConfirmPassword(error.message)
                        break
                    default:
                        break
                }
            }
            console.error(`ha ocurrido un error : ${error}`)
        }
    }


    //-----------------



    return (
        <SafeAreaView style={styles.container}>

            {isLoading && (<Loader />)}

            <Text style={styles.title}>registrate</Text>

            <Input

                label="ingresa tu nombre de usuario"
                placeholder="someOne example"
                onChangeText={setUsername}
                value={username}

            />

            <Input
                label="ingresa tu email"
                error={errorEmail}
                placeholder="example@mail.com"
                onChangeText={setEmail}
                value={email}
            />
            <Input
                label="ingresa tu contraseña"
                error={errorPassword}
                placeholder="********"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Input
                label="confirma tu contraseña"
                error={errorConfirmPassword}
                placeholder="********"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
            />

            <CustomButton onPress={() => handleSignUp()}>
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

})
