import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import StyledButton from '../UI/StyledButton';
import FormItem from './FormItem';

const EditProductForm = ({
  initialValues,
  categoriesList,
  statusList,
  onSubmit,
  onDelete,
}) => {
  const [inputs, setInputs] = useState({
    title: {value: '', isValid: true},
    category: {value: '', isValid: true},
    status: {value: '', isValid: true},
  });

  useEffect(() => {
    if (initialValues) {
      setInputs({
        title: {value: initialValues.title || '', isValid: true},
        category: {
          value: initialValues.category.toLowerCase() || '',
          isValid: true,
        },
        status: {value: initialValues.status || '', isValid: true},
      });
    }
  }, [initialValues]);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs(currInputValues => {
      return {
        ...currInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    // Extract form data
    const updatedProduct = {
      id: initialValues.id,
      title: inputs.title.value,
      category: inputs.category.value,
      status: inputs.status.value,
    };

    // Validate form data
    const titleIsValid = !!String(updatedProduct.title);
    const categoryIsValid = !!String(updatedProduct.category);
    const statusIsValid = !!String(updatedProduct.status);

    if (!titleIsValid || !categoryIsValid || !statusIsValid) {
      setInputs(currInputs => {
        return {
          title: {
            value: currInputs.title.value,
            isValid: titleIsValid,
          },
          category: {
            value: currInputs.category.value,
            isValid: categoryIsValid,
          },
          status: {
            value: currInputs.status.value,
            isValid: statusIsValid,
          },
        };
      });
      return;
    }

    // Forward validated data
    onSubmit(updatedProduct);
  };

  const deleteHandler = () => {
    onDelete(initialValues.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formItemsListContainer}>
        <FormItem
          identifier="title"
          value={inputs.title.value}
          invalid={!inputs.title.isValid}
          label="Titulo"
          placeholder="Titulo del producto"
          type="shortText"
          onChange={inputChangeHandler}
        />

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

      <View style={styles.actionButtonsContainer}>
        <StyledButton
          label="Eliminar producto"
          type="warning"
          onPress={deleteHandler}
        />
        <StyledButton label="Guardar" type="primary" onPress={submitHandler} />
      </View>
    </View>
  );
};

export default EditProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

    gap: 12,
  },
  formItemsListContainer: {
    gap: 12,
  },
  actionButtonsContainer: {
    gap: 12,
  },
});
