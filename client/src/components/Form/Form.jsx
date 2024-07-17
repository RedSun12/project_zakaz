import { useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import axiosInstance from '../../axiosInstance';

const { VITE_API } = import.meta.env;

export default function Form({ user, setEntries }) {
  const [inputs, setInputs] = useState({ name: '', description: '' });

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post(`${VITE_API}/whales`, {
      ...inputs,
      user: user.id,
    });
    if (res.status === 200) {
      setEntries((prev) => [...prev, res.data]);
      setInputs({ name: '', description: '' });
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>Добавь своего кита:</h3>
      <div className={styles.inputs}>
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='name'
          value={inputs.name}
          placeholder='Имя'
        />
        <Input
          onChange={changeHandler}
          borderColor='#3f3e3e'
          name='description'
          value={inputs.description}
          placeholder='Описание'
        />
      </div>
      <div className={styles.btns}>
        <Button type='submit' colorScheme='blue'>
          Создать
        </Button>
      </div>
    </form>
  );
}
