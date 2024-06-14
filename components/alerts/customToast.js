import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Modal } from 'react-native';

const CustomToast = ({ visible, message, onHide }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(onHide);
                }, 1500); // Duration the toast will be visible
            });
        }
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalContainer}>
                <Animated.View style={[styles.toastContainer, { opacity }]}>
                    <Text style={styles.toastText}>{message}</Text>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default CustomToast;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    toastContainer: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 8,
    },
    toastText: {
        color: '#fff',
        fontSize: 16,
    },
});
