import { View, Text, Button, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import ResourceScreen from '../screens/ResourceDetails'

export default function ResourceCard({ navigation, ...props }) {
    const ResourceImages = {
        'Железо': 'ferrum.jpg',
        'Реголит': 'regolith.jpg',
        'Торий': 'thorium.jpg',
        'Алюминий': 'aluminium.jpg',
        'Водород': 'placeholder.jpg',
        'Уран': 'uranium.jpg',
        'Титан': 'titanium.png',
    };

    const handlePress = () => {
        navigation.navigate('Подробнее', { name: props.ResourceName })
    }
    const imageName = ResourceImages[props.ResourceName];
    const imageUrl = `http://172.20.10.4:9000/pc-bucket/${imageName}`;
    const defaultImage = require('../assets/placeholder.jpg');
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={{ uri: imageUrl, cache: 'reload' }}
                defaultSource={defaultImage}
                resizeMode='contain'
            />
            <Text style={styles.brandTitle}>{props.ResourceName}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.buttonText}>Отчет по добыче</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#cfcfcf',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 20,
        shadowColor: 'rgb(0, 18, 70)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#1052c9',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    image: { 
        height: 270, 
        alignSelf: 'stretch',
        borderRadius: 10,
    },
    brandTitle: { 
        color: 'black',
        fontSize: 24, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: { 
        color: '#f0f0f0', 
        fontSize: 16, 
        textAlign: 'center' 
    },
});

