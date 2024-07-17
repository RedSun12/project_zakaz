import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './Favorities.module.css';
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
    axiosInstance
      .get(`${import.meta.env.VITE_API}/favorities/${userId}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const deleteHandler = async (id) => {
    const res = await axiosInstance.delete(`${VITE_API}/favorities/${id}`);

    if (res.status === 200) {
      setOrder((prev) => prev.filter((el) => el.id !== id));
    }
  };
  return (
    <div key={orders?.id} className={styles.wrapper}>
      <h1>Избранное</h1>
      {orders?.length ? (
        orders.map((el) => (
          <>
            <Card 
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: '100%', sm: '200px' }}
                src="/eda.jpg"
                alt="Your photo"
              />

              <Stack>
                <CardBody>
                  <Heading color="blue.600" size="md">
                    {el.title}
                  </Heading>

                  <Text color="black" py="2">
                    Время приготовления: {el.time}
                  </Text>
                  <Text color="black" py="2">
                    Количество ингредиентов: {el.quantityOfIngredients}
                  </Text>
                </CardBody>

                <CardFooter>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => deleteHandler(el.id)}
                  >
                    Удалить
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          </>
        ))
      ) : (
        <h3>Список избранного пуст</h3>
      )}
    </div>
  );
}
