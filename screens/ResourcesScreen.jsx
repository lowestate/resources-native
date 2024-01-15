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
  const [highDemand, setHighDemand] = useState(false);

  const getAllResources = async () => {
    const response = await axiosInstance.get('/resources', {
      params: {
        resourceName: nameFilter,
        highDemand: highDemand ? '1' : '',
      },
    });
    console.log("DATA:", response?.data)
    dispatch(setResources(response?.data));
  };

  const clearFilters = async () => {
    setNameFilter('');
    setHighDemand(false);
    
    const response = await axiosInstance.get('/resources', {
        params: {
          resourceName: '',
          highDemand: '',
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
          <Text>Высокий спрос</Text>
        </View>
        <View style={styles.filterButtonContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={getAllResources}>
            <Text style={styles.filterButtonText}>Поиск</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterButton, styles.clearButton]} onPress={clearFilters}>
            <Text style={styles.filterButtonText}>Очистить</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 8,
  },
  checkbox: {
    alignSelf: 'center',
    margin: 10,
  },
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#1052c9',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: '#8B0000', // dark red color
    padding: 12,
    borderRadius: 8,
  },
  page: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
});