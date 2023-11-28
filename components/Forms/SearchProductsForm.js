import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import StyledButton from '../UI/StyledButton';
import FormItem from './FormItem';
import StyledModal from '../UI/StyledModal';

const SearchProductsForm = ({categoriesList, statusList, onSubmit}) => {
  const [inputs, setInputs] = useState({
    search: {value: '', isValid: true},
    category: {value: '', isValid: true},
    status: {value: '', isValid: true},
  });
  const [timer, setTimer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs(currInputValues => {
      return {
        ...currInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitOnKeyPress = () => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      submitHandler();
    }, 1500);

    setTimer(newTimer);
  };

  const submitHandler = () => {
    const searchData = {
      search: inputs.search.value,
      category: inputs.category.value,
      status: inputs.status.value,
    };

    onSubmit(searchData);
  };

  const filterButtonHandler = () => {
    setModalVisible(true);
  };

  const cancelFilterHandler = () => {
    setModalVisible(false);
  };

  const applyFiltersHandler = () => {
    submitHandler();
    setModalVisible(false);
  };

  const clearFiltersHandler = () => {
    setInputs(currState => ({
      ...currState,
      category: {value: '', isValid: true},
      status: {value: '', isValid: true},
    }));
    applyFiltersHandler();
  };

  const modalContent = (
    <View style={styles.filterContainer}>
      <View style={styles.filtersHeader}>
        <StyledButton
          label="Cancelar"
          type="link"
          onPress={cancelFilterHandler}
        />
        <Text style={styles.filtersTitle}>Filtros</Text>
        <StyledButton
          label="Limpiar"
          type="link"
          onPress={clearFiltersHandler}
        />
      </View>

      <View>
        <View style={styles.filterInputItem}>
          <FormItem
            identifier="category"
            value={inputs.category.value}
            invalid={!inputs.category.isValid}
            label="Categoría"
            placeholder="Todas"
            type="select"
            data={categoriesList}
            onChange={inputChangeHandler}
          />
        </View>
        <View style={styles.filterInputItem}>
          <FormItem
            identifier="status"
            value={inputs.status.value}
            invalid={!inputs.status.isValid}
            label="Estado"
            placeholder="Todos"
            type="select"
            data={statusList}
            onChange={inputChangeHandler}
          />
        </View>
      </View>
    </View>
  );

  const modalActionButtons = (
    <>
      <StyledButton
        type="primary"
        label="Aplicar filtros"
        onPress={applyFiltersHandler}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <FormItem
          identifier="search"
          value={inputs.search.value}
          invalid={!inputs.search.isValid}
          placeholder="Buscar"
          type="shortText"
          onChange={inputChangeHandler}
          onKeyPress={submitOnKeyPress}
        />
      </View>

      <View style={styles.filterButton}>
        <StyledButton
          label="Filtros"
          type="secondary"
          icon="filter-outline"
          onPress={filterButtonHandler}
        />
      </View>

      <StyledModal
        isVisible={modalVisible}
        onCancel={cancelFilterHandler}
        content={modalContent}
        actions={modalActionButtons}
        transparent={false}
      />
    </View>
  );
};

export default SearchProductsForm;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,

    backgroundColor: '#F8F9FE',
    borderRadius: 12,
  },
  filterButton: {
    width: 100,
  },
  filterContainer: {
    flex: 1,
  },
  filtersHeader: {
    width: 300,
    maxWidth: 400,
    height: 50,

    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterInputItem: {
    paddingVertical: 20,
    marginVertical: 5,

    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
});
