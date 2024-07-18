import { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import List from '../../components/List/List';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Spinner } from '@chakra-ui/react';

const { VITE_API } = import.meta.env;

export default function HomePage({ user, setCook, cook }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${VITE_API}/recepts`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {entries?.length ? (
        <>
          <Form cook={cook} setCook={setCook} setEntries={setEntries} user={user} />
          <List data={entries} setEntries={setEntries} user={user} />
        </>
      ) : (
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
        />
      )}
    </div>
  );
}
