import { useEffect, useState } from 'react';
import styles from './Form.module.css';
import { Input, Button, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react';
import axios from 'axios';
import axiosInstance from '../../axiosInstance';
// import {EOL} from 'os';
import { Form, Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, ChevronDownIcon, EmailIcon, SearchIcon } from '@chakra-ui/icons';
const { VITE_API } = import.meta.env;

export default function Forma({ user, cook, setCook }) {
  const [text, setText] = useState({ title: '' });
  const [liked, setLiked] = useState(false);
  // const navigate = useNavigate();

  const onSubmitHandlet = async (e) => {
    e.preventDefault();
    try {
      if (text.title.length === 1) {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${text.title}`
        );
        setCook(response.data.meals);
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
        console.log(cook)
        setCook(response.data.meals);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApod();
  }, []);

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

  async function addRecept(el) {
    setLiked(!liked);
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
    } catch (error) {
      console.error(error);
    }
  }
  //сортировки
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

  return (
    <div>
      <h1 className={styles.header}>Рецепты</h1>
      <div className={styles.wrapper}>


      <Menu >
  <MenuButton marginRight={'20px'} as={Button} rightIcon={<ArrowUpDownIcon />}>
    Сортировка
  </MenuButton>
  <MenuList>
  <MenuGroup color={'black'} title='По ингридиентам'>
  <MenuDivider />

    <MenuItem color={'black'} icon={<ArrowUpIcon/>} minH='40px' onClick={() => sortAscending()}>
      <Text color={'black'}>По возрастанию</Text>
    </MenuItem>
    <MenuItem color={'black'} icon={<ArrowDownIcon/>} onClick={() => sortDescending()} minH='48px'>
      <Text color={'black'}>По убыванию</Text>
    </MenuItem>
    </MenuGroup>
    <MenuDivider />
  <MenuGroup color={'black'} title='По времени'>
  <MenuDivider />
    <MenuItem color={'black'} icon={<ArrowUpIcon/>} minH='40px' onClick={() => sortAscendingTime()}>
      <Text color={'black'}>По возрастанию</Text>
    </MenuItem>
    <MenuItem color={'black'} icon={<ArrowDownIcon/>} minH='40px' onClick={() => sortDescendingTime()}>
      <Text color={'black'}>По убыванию</Text>
    </MenuItem>
        </MenuGroup>
  </MenuList>
</Menu>
        {/* <Form></Form> */}
        <Form  onSubmit={onSubmitHandlet} className={styles.todoContainer}>
          <div className={styles.form}>

          <Input
            backgroundColor={'white'}
            color={'black'}
            defaultValue={text?.title}
            onChange={(e) =>
              setText((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Поиск по рецептам"
            name="title"
            />
          
          <Button marginLeft={'10px'} type="submit" leftIcon={<SearchIcon />} colorScheme='teal' variant='solid'>
            Поиск
          </Button>
            </div>
        </Form>
      </div>
      
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
                     {/* ❤️🤍  */}
                     {liked ? '❤️ Liked' : '🤍 Like'}
                  </Button>

                  <Text color="black" py="2">
                    Время приготовления: {timeCook(el.strInstructions)}мин.
                  </Text>
                  <Text color="black" py="2">
                    Количество ингредиентов: {countIngridient(el).length}
                  </Text>
                </CardBody>

                <Heading>
                  <Link to={`/more/${el.idMeal}`}>
                  {el.strMeal.length < 15 ? (<div className={styles.title1}>{el.strMeal}</div>) :
                  (<div className={styles.title2}>{el.strMeal}</div>)}
        
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
