import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

const StyledModal = ({
  isVisible = false,
  onCancel,
  content,
  actions,
  transparent = true,
}) => {
  const closeModalHandler = () => {
    onCancel();
  };

  return (
    <Modal
      animationType="fade"
      transparent={transparent}
      visible={isVisible}
      onRequestClose={closeModalHandler}>
      <View
        style={[
          styles.centeredView,
          transparent && styles.centeredViewModalEffect,
        ]}>
        <View style={[styles.modalView, transparent && styles.modalEffect]}>
          {content}
          <View style={styles.modalActions}>{actions}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 22,
  },
  centeredViewModalEffect: {
    backgroundColor: '#000000d8',
  },
  modalView: {
    gap: 20,

    alignItems: 'center',

    margin: 30,
    padding: 10,

    backgroundColor: 'white',
  },
  modalEffect: {
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalActions: {
    gap: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StyledModal;
