import AnimatedLoader from "react-native-animated-loader";
import { Text, StyleSheet } from "react-native";




export const Loader =()=>{


    return(
        <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}>
            
        </AnimatedLoader>
    )
};

const styles = StyleSheet.create({
    lottie:{
        
    }
})