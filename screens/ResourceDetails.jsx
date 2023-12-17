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
      <Text style={styles.brandTitle}> {Resource?.ResourceName}</Text>
      <Image source={ { uri: `http://192.168.1.64:9000/pc-bucket/${imageName}` }} style={styles.image} />
      <View style={styles.rightContent}>
        <Text>Ресурс {Resource?.IsAvailable ? 'еще есть' : 'закончился'}</Text>
        <Text>Место: {Resource?.Place}</Text>
        
        {Resource?.MonthlyProds && Resource?.Months && (
        <View>
          {Resource.Months.map((month, index) => (
            <Text key={index}>
              За {month} добыто {Resource.MonthlyProds[index]} кг
            </Text>
          ))}
        </View>
        )}
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
  brandTitle: { color: 'black', fontSize: 20, fontWeight: 'bold' },
  image: { height: 260, alignSelf: 'stretch' },
  rightContent: {
    marginLeft: 8,
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};