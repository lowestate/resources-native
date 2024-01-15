import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setResource, resetResource } from '../store/resourceSlice';
import React from 'react';
import { axiosInstance } from '../api';

export default function ResourceDetScreen({ route, navigation }) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const { Resource } = useSelector((store) => store.Resource);

  const ResourceImages = {
    'Железо': 'ferrum.jpg',
    'Реголит': 'regolith.jpg',
    'Торий': 'thorium.jpg',
    'Алюминий': 'aluminium.jpg',
    'Водород': 'placeholder.jpg',
    'Уран': 'uranium.jpg',
    'Титан': 'titanium.png',
  };
  const imageName = ResourceImages[Resource?.ResourceName]


  useEffect(() => {
    async function getOneResource() {
      
      try {
        const response = await axiosInstance.get(`/resources/${name?.toString()}`);
        console.log(response?.data)
        dispatch(setResource(response?.data));
      } catch (error) {
        console.error('Ошибка получения ресурса:', error);
      }
    }

    getOneResource();
    
    return () => {
      dispatch(resetResource());
    };
  }, [dispatch, name]);

  return (
    <View style={styles.container}>
      
      <Image source={ { uri: `http://192.168.1.64:9000/pc-bucket/${imageName}` }} style={styles.image} />
      <Text style={styles.brandTitle}> {Resource?.ResourceName}</Text>
      <View style={styles.rightContent}>
        <Text style={styles.infoTitle}>Ресурс {Resource?.IsAvailable ? 'еще есть' : 'закончился'}</Text>
        <Text style={styles.infoTitle}>Плотность: {Resource?.Density}</Text>
        <Text style={styles.infoTitle}>Спрос: {Resource?.Demand}</Text>
        <Text style={styles.infoTitle}>Токсичен? {Resource?.IsToxic ? 'да' : 'нет'}</Text>
        <Text style={styles.infoTitle}>Описание: {Resource?.Description}</Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Ресурсы')}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    padding: 16,
  },
  brandTitle: {
    color: 'black',
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoTitle: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8, 
  },
  image: {
    height: 260,
    alignSelf: 'stretch',
    marginBottom: 16, 
  },
  rightContent: {
    marginLeft: 5,
    marginRight: 8,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#1052c9',
    padding: 12,
    borderRadius: 8,
    width: 100,
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
};
