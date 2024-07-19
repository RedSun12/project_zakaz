import React, { useState, useEffect } from 'react';
import styles from './MorePage.module.css';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardFooter, Collapse, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { VITE_API } = import.meta.env;

export default function MorePage({ user, setCook, cook }) {
  const [more, setMore] = useState()
  const { idMeal } = useParams();
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

  console.log(idMeal)

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        setMore(response.data.meals[0]);
        console.log(countIngridient(more))
      } catch (err) {
        console.log(err);
      }
    };
    fetchApod();
  }, [idMeal]);

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

  function countIngridient(data) {
    if (!data) return '';
    let result = [];
    for (let i = 1; i <= 20; i++) {
      if (
        data[`strIngredient${i}`] !== '' &&
        data[`strIngredient${i}`] !== null
      ) {
        result?.push(data[`strIngredient${i}`] + ' - ' + data[`strMeasure${i}`]);
      }
    }
    return result;
  }
  if (!countIngridient(more)) return
  return (
    <>
    <div className={styles.wrapper}>
    <div className={styles.fon}></div>
      <Card className={styles.card}>
        <CardBody>
          <Text className={styles.head}>
            <Image display={'flex'} width={'350px'} src={more?.strMealThumb} alt="Your photo" borderRadius="lg" />
            <Text marginLeft={'50px'}>
              <Text className={styles.big} fontSize={'80px'} fontWeight={'1000'} color="black">
                {more?.strMeal}
              </Text>
              {/* <Heading color="blue.600">{more?.strMeal}</Heading> */}
              <Text color="blue.800" fontSize="2xl">
                Страна происхождения: {more?.strArea}
              </Text>
              <Text color="blue.800" fontSize="2xl">
                Время приготовления: {timeCook(more)} мин.
              </Text>
              <Text color="blue.800" fontSize="2xl">
                Количество ингредиентов: {countIngridient(more).length} шт.
              </Text>
              <br />
              <Divider />
              <br />
              <a href={more?.strYoutube} target="_blank" rel="noopener noreferrer">
                
                <Button>
                  <Image width={'65px'} src={'../../../public/youtube.svg'}/>
                </Button>
              </a>
            </Text>
          </Text>
          <Stack mt="6" spacing="3">
          <Divider />


<Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton color="blue.600" _expanded={{ bg: 'rgb(212, 109, 109)', color: "blue.600" }}>
        <Text color="blue.800" fontSize="2xl" as='span' flex='1' textAlign='left'>
          Ингредиенты:
        </Text>
        {/* <Box color={'black'} as='span' flex='1' textAlign='left'>
          Ингредиенты:
        </Box> */}
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Text color="black">{countIngridient(more).map((el, i) => <p className={styles.text} key={i}>{el}</p>)}</Text>
    </AccordionPanel>
  </AccordionItem>
</Accordion>


            {/* <Text color="blue.600" fontSize="2xl">
              Ингредиенты:
            </Text>
            <Text color="black">{countIngridient(more).map((el, i) => <p className={styles.text} key={i}>{el}</p>)}</Text> */}
            {/* <Divider /> */}
            <Text cursor={'pointer'} onClick={handleToggle} color="blue.800" fontSize="2xl">
              Описание:
            </Text>
            {/* <Text onClick={handleToggle} color="black">{more?.strInstructions}</Text> */}
            <Collapse cursor={'pointer'} onClick={handleToggle} startingHeight={20} in={show}>{more?.strInstructions}</Collapse>
      <Button backgroundColor={show ? 'rgb(212, 109, 109)' : '#dfdfdf'} size='sm' onClick={handleToggle} mt='1rem'>
        {show ? 'Свернуть' : 'Развернуть'} описание
      </Button>
          </Stack>
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
      
        {/* <Heading className={styles.title} as='h2' size='2xl'>
          {more?.strMeal}
        </Heading> */}
        {/* <Text>
          {more?.strArea}
        </Text> */}
        {/* <Text>
          {more?.strInstructions}
        </Text> */}
        
        {/* <Text color={'pink'}>
          {countIngridient(more)}
        </Text> */}
        {/* <Text>
          {timeCook(more)}
        </Text> */}
        {/* <Image src={more?.strMealThumb}/> */}
        {/* <a href={more?.strYoutube} target="_blank" rel="noopener noreferrer">
          <Button>
            YouTube
          </Button>
        </a> */}
    </div>
        <div className={styles.container}>
            <div className={styles.shape}></div>
        </div>
        </>
  );
}
