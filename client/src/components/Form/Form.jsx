import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import { Link } from 'react-router-dom';
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
  const [text, setText] = useState({ title: '' });
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState([]);
  const userId = user?.id;

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=a`
        );
        setCook(response.data.meals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApod();

    if (user) {
      axiosInstance
        .get(`${VITE_API}/favorities/${userId}`)
        .then((res) => {
          setLike(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const query = text.title.length === 1 
        ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${text.title}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=${text.title}`;

      const response = await axios.get(query);
      setCook(response.data.meals);
    } catch (err) {
      console.log(err);
    }
  };

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

  async function addRecept(el) {
    const recept = {
      idUser: user.id,
      idAPI: el.idMeal,
      title: el.strMeal,
      ingredients: countIngridient(el).join('<br>'),
      description: el.strInstructions,
      image: el.strMealThumb,
      quantityOfIngredients: countIngridient(el).length,
      time: timeCook(el.strInstructions),
    };
    try {
      const res = await axiosInstance.post(
        `${VITE_API}/favorities/newOrder`,
        recept
      );
      setLiked(!liked); // Обновляем состояние лайков
      setLike((prev) => [...prev, { title: el.strMeal }]);
    } catch (error) {
      console.error(error);
    }
  }

  function sortDescending() {
    setCook((prev) => {
      prev.sort(
        (a, b) => countIngridient(b).length - countIngridient(a).length
      );
      return [...prev];
    });
  }

  function sortAscending() {
    setCook((prev) => {
      prev.sort(
        (a, b) => countIngridient(a).length - countIngridient(b).length
      );
      return [...prev];
    });
  }

  function sortDescendingTime() {
    setCook((prev) => {
      prev.sort(
        (a, b) => timeCook(b.strInstructions) - timeCook(a.strInstructions)
      );
      return [...prev];
    });
  }

  function sortAscendingTime() {
    setCook((prev) => {
      prev.sort(
        (a, b) => timeCook(a.strInstructions) - timeCook(b.strInstructions)
      );
      return [...prev];
    });
  }

  function likes(n) {
    if (userId) {
      return like?.some((el) => el.title === n);
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <button
          type="submit"
          className={styles.button}
          onClick={() => sortDescending()}
        >
          отсортировать по убыванию ингредиентов
        </button>


        <button
          type="submit"
          className={styles.button}
          onClick={() => sortAscending()}
        >
          отсортировать по возрастанию ингредиентов
        </button>

        <button
          type="submit"
          className={styles.button}
          onClick={() => sortDescendingTime()}
        >
          сортировка времени по убыванию
        </button>

        <button
          type="submit"
          className={styles.button}
          onClick={() => sortAscendingTime()}
        >
          сортировка времени по возрастанию
        </button>

        <form onSubmit={onSubmitHandler} className={styles.todoContainer}>
          <input
            defaultValue={text?.title}
            onChange={(e) =>
              setText((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Введите одну букву или ингредиент"
            name="title"
          />
          <button type="submit" className={styles.submitButton}>
            создать
          </button>
        </form>
      </div>
      <h1 className={styles.header}>Рецепты</h1>
      <div className={styles.cards}>
        {cook?.length ? (
          cook.map((el, i) => (
            <Card
              className={styles.oneCard}
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

              <Stack>
                <CardBody>
                  <Button className={styles.btnHard}
                    variant="solid"
                    colorScheme="black"
                    onClick={() => addRecept(el)}
                  >
                    {likes(el.strMeal) ? '❤️ Liked' : '🤍 Like'}
                  </Button>

                  <Text color="black" py="2">
                    Время приготовления: {timeCook(el.strInstructions)} мин.
                  </Text>
                  <Text color="black" py="2">
                    Количество ингредиентов: {countIngridient(el).length}
                  </Text>
                </CardBody>

                <Heading>
                  <Link to={`/more/${el.idMeal}`}>
                    {el.strMeal.length < 15 ? (
                      <div className={styles.title1}>{el.strMeal}</div>
                    ) : (
                      <div className={styles.title2}>{el.strMeal}</div>
                    )}
                  </Link>
                </Heading>
              </Stack>
            </Card>
          ))
        ) : null}
      </div>
    </div>
  );
}
