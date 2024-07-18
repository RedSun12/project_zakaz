import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from './InfoCard.module.css';
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Image,
  Button,
  Divider,
  CardFooter,
} from '@chakra-ui/react';

export default function InfoCard({ user, setUser, cook, setCook }) {
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/recepts/${id}`)
      .then((res) => {
        setCook(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
if (!cook.ingredients) return
  return (
    <div className={styles.wrapper}>
      <Card className={styles.container}>
        <CardBody>
          <Image src={cook.image} alt="Your photo" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading color="blue.600">{cook.title}</Heading>
            <Text color="blue.600" fontSize="2xl">
              Время приготовления: {cook.time} мин
            </Text>
            <Text color="blue.600" fontSize="2xl">
              Количество ингредиентов: {cook.quantityOfIngredients}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              Вам потребуется:
            </Text>
            <Text color="black">{cook?.ingredients.split('<br>').map((el, i) => <p className={styles.text} key={i}>{el}</p>)}</Text>
            <Divider />
            <Text color="black">Описание: {cook.description}</Text>
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
