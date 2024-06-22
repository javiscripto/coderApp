import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./login";
import { SignUp } from "./signUp";

const { Navigator: StackNavigator, Screen: StackScreen } = createStackNavigator();


export const AuthStack = () => {
    return (

        <StackNavigator>
            <StackScreen name="login" component={Login} />
            <StackScreen name="sign up" component={SignUp} />

        </StackNavigator>
    )

}