import { useState, useEffect } from 'react';
import Form from '../../components/Form/Form';
import List from '../../components/List/List';
import styles from './ProfilePage.module.css';
import axiosInstance from '../../axiosInstance';
import { Spinner } from '@chakra-ui/react';

const { VITE_API } = import.meta.env;

export default function ProfilePage({ user, setCook, cook }) {
  // const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   axiosInstance
  //     .get(`${VITE_API}/recepts`)
  //     .then((res) => {
  //       setEntries(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <div className={styles.container}>
      <p className={styles.head}>
          Error 404
      </p>
      {/* <br /> */}
      <p className={styles.foot}>Страница в разработке</p> 
    </div>
  );
}
