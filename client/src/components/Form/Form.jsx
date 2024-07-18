import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
// import {EOL} from 'os';
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

const { VITE_API } = import.meta.env;

export default function Form({ user, cook, setCook }) {
  // const [inputs, setInputs] = useState({ name: '', description: '' });

  // const changeHandler = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  // };

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=b`
        );
        setCook(response.data.meals);
        console.log(cook);
        console.log(countIngridient(cook[0]), '****/////');
      } catch (err) {
        console.log(err);
      }
    };
    fetchApod();
  }, [user]);

  function countIngridient(data) {
    let result = [];
    for (let i = 1; i <= 20; i++) {
      if (
        data[`strIngredient${i}`] !== '' &&
        data[`strIngredient${i}`] !== null
      ) {
        result.push(data[`strIngredient${i}`] + ' - ' + data[`strMeasure${i}`]);
      }
    }
   
    return result;
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

  // const [recept, setRecept] = useState({

  async function addRecept(el) {
    console.log('addRecept  el:', el);
    const recept = {
      title: el.strMeal,
      ingredients: countIngridient(el).join('\n\r'),
      description: el.strInstructions,
      image: el.strMealThumb,
      quantityOfIngredients: countIngridient(el).length,
      time: timeCook(el.strInstructions),
      
    };

    try {
      const res = await axiosInstance.post(`${VITE_API}/recepts`, recept);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.wrapper} key={cook?.id}>
        <h1>Избранное</h1>
        {cook?.length ? (
          cook.map((el) => (
            <>
              <Card
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

                <Stack>
                  <CardBody>
                    <Heading color="blue.600" size="md">
                      {el.strMeal}
                    </Heading>

                    <Text color="black" py="2">
                      Время приготовления: {timeCook(el.strInstructions)}мин.
                    </Text>
                    <Text color="black" py="2">
                      Количество ингредиентов: {countIngridient(el).length}
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
                      onClick={() => addRecept(el)}
                    >
                      ❤️
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
    </>
  );
}
