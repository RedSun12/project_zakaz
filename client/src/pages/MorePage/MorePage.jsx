import { useState, useEffect } from 'react';
import styles from './MorePage.module.css';
import { Button, Heading, Image, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { VITE_API } = import.meta.env;

export default function MorePage({ user, setCook, cook }) {
  const [more, setMore] = useState()
  const { idMeal } = useParams();

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
    return result.join(<br />);
  }

  return (
    <div className={styles.wrapper}>
        <Heading className={styles.title} as='h2' size='2xl'>
          {more?.strMeal}
        </Heading>
        <Text>
          {more?.strArea}
        </Text>
        <Text>
          {more?.strInstructions}
        </Text>
        
        <Text color={'pink'}>
          {countIngridient(more)}
        </Text>
        <Text>
          {timeCook(more)}
        </Text>
        <Image src={more?.strMealThumb}/>
        <a href={more?.strYoutube} target="_blank" rel="noopener noreferrer">
          <Button>
            YouTube
          </Button>
        </a>
    </div>
  );
}
