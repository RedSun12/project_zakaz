import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './Favorities.module.css';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';

const { VITE_API } = import.meta.env;

export default function Favorities({ user }) {
  const userId = user?.id;
  const [orders, setOrder] = useState();

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`${import.meta.env.VITE_API}/favorities/${userId}`)
        .then((res) => {
          setOrder(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [userId]);

  const deleteHandler = async (id) => {
    const res = await axiosInstance.delete(`${VITE_API}/favorities/${id}`);

    if (res.status === 200) {
      setOrder((prev) => prev.filter((el) => el.id !== id));
    }
  };
  return (
    <div key={orders?.id} className={styles.wrapper}>
      <h1 className={styles.header}>Избранное</h1>
      <div className={styles.cards}>
        {orders?.length ? (
          orders.map((el) => (
         
              <Card
                key={el?.id}
                className={styles.oneCard}
                direction={{ base: 'column', sm: 'row' }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={el.image}
                  alt="Your photo"
                />

                <Stack>
                  <CardBody>
                    <Link to={`/recepts/${el.id}`}>
                      <Button variant="solid" colorScheme="green">
                        Подробнее
                      </Button>
                    </Link>
                    <Button className={styles.btnHard}
                      variant="solid"
                      colorScheme="white"
                      onClick={() => deleteHandler(el.id)}
                    >
                      ❌
                    </Button>

                    <Text color="black" py="3">
                      Время приготовления: {el.time} мин.
                    </Text>
                    <Text color="black" py="2">
                      Количество ингредиентов: {el.quantityOfIngredients}
                    </Text>
                  </CardBody>

                  <Heading>
                    <div className={styles.title}>{el.title}</div>
                  </Heading>
                </Stack>
              </Card>
          
          ))
        ) : (
          <h3>Список избранного пуст</h3>
        )}
      </div>
    </div>
  );
}
