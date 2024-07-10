import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Profile from '../assets/icons/profile' //svg image
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Entypo from '@expo/vector-icons/Entypo';
import { clearUser } from '../features/authSlice'
import { deleteSession } from '../DB'
import { CustomButton } from '../components/customButton'


export default function MyProfile() {

  const { navigate } = useNavigation();



  const { photo, userName } = useSelector(state => state.auth.value.user)




  const dispatch = useDispatch()



  const handleLogout = async () => {
    try {
      deleteSession()
        .then(() => {
          console.log("success: logout");
        })
        .catch((error) => {
          console.error("Error :", error);
        });



      dispatch(clearUser());

    } catch (error) {
      console.error(`error al eliminar la sesion: `, error)
    }

  };

  return (
    <SafeAreaView style={styles.myProfile}>


      <View style={styles.logoutContainer}>
        <Text>usuario: {userName}</Text>
        <Pressable style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logout}>logout</Text>
          <Entypo name="log-out" size={24} color="black" />
        </Pressable>
      </View>

      {photo ? (
        <Image source={{ uri: photo }} style={styles.img} />
      ) : (
        <Profile />
      )}

      <CustomButton onPress={() => navigate("imageSelector")}>
        cambiar foto de perfil
      </CustomButton>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  myProfile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 32,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "contain"
  },
  logout: {
    color: "grey",
    textDecorationLine: "underline",
    flexDirection: "row"
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32
  }
})