import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../api';
import { StyleSheet } from 'react-native';
import { setResources } from '../store/resourceSlice';
import ResourceCard from '../components/ResCard';

export default function ResourcesScreen({ navigation }) {
  const dispatch = useDispatch();
  const { Resources } = useSelector((store) => store.Resource);
  const [nameFilter, setNameFilter] = useState('');
  const [oceanFilter, setOceanFilter] = useState(false);
  const [vostFilter, setVostFilter] = useState(false);
  const [vlazhFilter, setVlazhFilter] = useState(false);

  const getAllResources = async () => {
    const response = await axiosInstance.get('/resources', {
      params: {
        Resource_name: nameFilter,
        Resource_ocean: oceanFilter ? '1' : '',
        Resource_vost: vostFilter ? '1' : '',
        Resource_vlazh: vlazhFilter ? '1' : '',
      },
    });
    console.log("DATA:", response?.data)
    dispatch(setResources(response?.data));
  };

  const clearFilters = async () => {
    setNameFilter('');
    setOceanFilter(false);
    setVostFilter(false);
    setVlazhFilter(false);
    
    const response = await axiosInstance.get('/resources', {
        params: {
          Resource_name: '',
          Resource_place: '',
          Resource_vost: '',
          Resource_vlazh: '',
        },
      });
    dispatch(setResources(response?.data));
  };

  useEffect(() => {
    getAllResources();
    console.log('ResourceSlice: ', Resources);
  }, [dispatch]);

  return (
    <ScrollView>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Название ресурса"
          value={nameFilter}
          onChangeText={(text) => setNameFilter(text)}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={oceanFilter}
            onValueChange={() => setOceanFilter(!oceanFilter)}
            style={styles.checkbox}
          />
          <Text>Океан Бурь</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={vostFilter}
            onValueChange={() => setVostFilter(!oceanFilter)}
            style={styles.checkbox}
          />
          <Text>Море Восточное</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={vlazhFilter}
            onValueChange={() => setVlazhFilter(!oceanFilter)}
            style={styles.checkbox}
          />
          <Text>Море Влажности</Text>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={getAllResources}>
          <Text style={styles.filterButtonText}>Поиск</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={clearFilters}>
          <Text style={styles.filterButtonText}>Очистить</Text>
        </TouchableOpacity>
        {!!Resources &&
          Resources.map((Resource) => <ResourceCard key={Resource.ID} {...Resource} navigation={navigation}></ResourceCard>)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    margin: 12,
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#0E3E8DFF',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 10,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  page: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
});