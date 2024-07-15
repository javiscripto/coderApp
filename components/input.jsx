import { TextInput, Text, View, StyleSheet } from "react-native"


export const Input = ({ error, label, ...props }) => {
    return (
        <View style={styles.field} >
            <Text style={styles.label} >{label}</Text>
            <TextInput {...props}  style={styles.input}  />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
};

const styles = StyleSheet.create({
    field:{
        width:"80%",
        justifyContent:"center"
    },
    label:{
        fontFamily:"Roboto-Bold"
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor:"#fff"
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 2,
    },
})