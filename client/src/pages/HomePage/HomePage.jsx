import { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import List from '../../components/List/List';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Spinner } from '@chakra-ui/react';

const { VITE_API } = import.meta.env;

export default function HomePage({ user, setCook, cook }) {
 

  return (
    <div className={styles.wrapper}>
     
        <>
          <Form cook={cook} setCook={setCook} user={user} />
        </>
      {/* ) : (
        <Spinner
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        /> */}
      
    </div>
  );
}
