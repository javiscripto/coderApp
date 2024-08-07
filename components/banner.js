import { ImageBackground, StyleSheet, Text, View } from 'react-native';



export const Banner = ({children}) => {
    return (
        <ImageBackground
            source={require(`../assets/img/guitarBackground.jpg`)}
            resizeMode='cover'
            style={styles.img}
        >
            <Text style={styles.text}>{children}</Text>
            <View style={styles.banner} >
                <Text style={styles.title} > La buena vibra esta en tus manos </Text>
            </View>
        
        </ImageBackground>
    )
};

const styles= StyleSheet.create({
    img:{
        height:300,
        padding:32
    },
    banner: {
        alignItems: 'center',
        borderRadius: 16,
        borderBlockColor:"#fff",
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 64,
        width: '100%',
    },
    title:{
        color:"#fff",
        fontFamily:"Roboto-Black",
        fontSize:40,
        textAlign:"center",
        
    },
    text:{
        color:"#fff",
        fontFamily:"Roboto-Bold"
    }
})
