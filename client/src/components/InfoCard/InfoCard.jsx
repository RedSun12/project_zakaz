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
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  Accordion,
  Collapse,
} from '@chakra-ui/react';

export default function InfoCard({ user, setUser, cook, setCook }) {
  const { id } = useParams();
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

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
      <div className={styles.fon}></div>
      <Card className={styles.container}>
        <CardBody>
        <Text className={styles.head}>

          <Image display={'flex'} width={'350px'} src={cook.image} alt="Your photo" borderRadius="lg" />
          <Text marginLeft={'20px'}>
              <Text className={styles.big} fontSize={'80px'} fontWeight={'1000'} color="black">
              {cook.title}
              </Text>

            {/* <Heading color="blue.600">{cook.title}</Heading> */}
            <Text color="blue.600" fontSize="2xl">
              Время приготовления: {cook.time} мин
            </Text>
            <Text color="blue.600" fontSize="2xl">
              Количество ингредиентов: {cook.quantityOfIngredients}
            </Text>
          </Text>
        </Text>
          <Stack mt="6" spacing="3">


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
      <Text color="black">{cook?.ingredients.split('<br>').map((el, i) => <p className={styles.text} key={i}>{el}</p>)}</Text>
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
            <Collapse cursor={'pointer'} onClick={handleToggle} startingHeight={20} in={show}>{cook?.description}</Collapse>
      <Button backgroundColor={show ? 'rgb(212, 109, 109)' : '#dfdfdf'} size='sm' onClick={handleToggle} mt='1rem'>
        {show ? 'Свернуть' : 'Развернуть'} описание
      </Button>
          </Stack>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
}
