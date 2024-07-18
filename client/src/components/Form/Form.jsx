import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import { BiSolidCommentError } from 'react-icons/bi';
import {
  Card,
  CardBody,
  Heading,
  Stack,
  CardFooter,
  Text,
  Image,
} from '@chakra-ui/react';



export default function Form({ user, cook, setCook }) {
  const [text, setText] = useState({ title: '' });

  // console.log(cook);
  const onSubmitHandlet = async (e) => {
    e.preventDefault();
    try {
      if (text.length === 1) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${text.title}`
        );
        setCook(response.data.meals);
        console.log(cook);
      } else {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${text.title}`
        );
        setCook(response.data.meals);
      }
    } catch (err) {
      console.log(err);
    }
  };
// потдтягиев на букву а
  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=a`
        );
        setCook(response.data.meals);
        console.log(cook)
        console.log(countIngridient(cook[0]), '****/////');
      } catch (err) {
        console.log(err);
      }
    };
    fetchApod();
  }, []);

  function countIngridient(data) {
    let result = [];
    for (let i = 1; i <= 20; i++) {
      result.push(data[`strIngredient${i}`]);
    }
    return result.filter((el) => el !== '' && el !== null).length;
  }

  // количество времени
  function timeCook(text) {
    const regex = /\b(\d+).(hou|min|sec)/g;
    const timeUnits = { hou: 3600, min: 60, sec: 1 };
    let totalSeconds = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2];
      totalSeconds += value * timeUnits[unit];
    }
    return totalSeconds < 300 ? 32 : Math.round(totalSeconds / 60);
  }

  return (
    <>
      <form onSubmit={onSubmitHandlet} className={styles.todoContainer}>
        <input
          defaultValue={text?.title}
          onChange={(e) =>
            setText((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Введите одну букву или ингридиент"
          name="title"
        />
        <button type="submit" className={styles.submitButton}>
          создать
        </button>
      </form>
      <div className={styles.wrapper}>
        <h1>Избранное</h1>
        {cook?.length ? (
          cook.map((el, i) => (
              <Card
                key={`${el.idMeal}-${i}`}
                direction={{ base: 'column', sm: 'row' }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={el.strMealThumb}
                  alt="Your photo"
                />

                <Stack >
                  <CardBody>
                    <Heading color="blue.600" size="md">
                      {el.strMeal}
                    </Heading>

                    <Text color="black" py="2">
                      Время приготовления: {timeCook(el.strInstructions)}мин.
                    </Text>
                    <Text color="black" py="2">
                      Количество ингредиентов: {countIngridient(el)}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="solid"
                      colorScheme="red"
                      // onClick={() => deleteHandler(el.id)}
                    >
                      Подробнее
                    </Button>
                    <Button
                      variant="solid"
                      colorScheme="black"
                      // onClick={() => deleteHandler(el.id)}
                    >
                      ❤️
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
          ))
        ) : (
          <h3>Список избранного пуст</h3>
        )}
      </div>
    </>
  );
}
