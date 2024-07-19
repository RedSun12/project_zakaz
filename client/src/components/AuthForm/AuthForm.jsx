import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, useDisclosure, ModalFooter } from '@chakra-ui/react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const { VITE_API } = import.meta.env;

export default function AuthForm({ title, type = 'signin', setUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputs, setInputs] = useState({});
  // const navigate = useNavigate();
  
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const OverlayOne = () => (
    <ModalOverlay
    bg='blackAlpha.300'
    backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  
  // const OverlayTwo = () => (
  //   <ModalOverlay
  //     bg='none'
  //     backdropFilter='auto'
  //     backdropInvert='80%'
  //     backdropBlur='2px'
  //   />
  // )

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post(`${VITE_API}/auth/${type}`, inputs);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
    // navigate('/');
  };

  return (
    <>
    {type === 'signin' && (
      <><Button fontSize={'25px'} className={styles.btnSing} width={'100%'} onClick={() => {
        setOverlay(<OverlayOne />)
        onOpen()
      }}>Вход</Button>
      <Modal
          isCentered
          className={styles.wrapper}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          {overlay}
          <ModalContent>
            <ModalHeader color={'black'}>Вход</ModalHeader><ModalCloseButton /><ModalBody pb={6}>
              <FormControl>
                <FormLabel color={'black'}>Email:</FormLabel>
                <Input
                  color={'black'}
                  ref={initialRef}
                  onChange={changeHandler}
                  borderColor='#3f3e3e'
                  type='email'
                  name='email'
                  value={inputs?.email}
                  placeholder='Эл.почта' />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color={'black'}>Пароль:</FormLabel>
                <Input
                  color={'black'}
                  onChange={changeHandler}
                  borderColor='#3f3e3e'
                  type='password'
                  name='password'
                  value={inputs?.password}
                  placeholder='Пароль' />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={submitHandler} colorScheme='blue' mr={3}>
                Войти
              </Button>
              <Button onClick={onClose}>Отмена</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <br /></>
          )}
          {type === 'signup' && (
                  <><Button fontSize={'25px'} width={'100%'} onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                  }}>Регистрация</Button>
                  <Modal
                  isCentered
          className={styles.wrapper}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          {overlay}
          <ModalOverlay />
          <ModalContent >
            <ModalHeader color={'black'}>Регистрация</ModalHeader><ModalCloseButton /><ModalBody pb={6}>
              <FormControl>
                <FormLabel color={'black'}>Имя пользователя:</FormLabel>
                <Input
                  color={'black'}
                  ref={initialRef}
                  onChange={changeHandler}
                  borderColor='#3f3e3e'
                  name='username'
                  value={inputs?.name}
                  placeholder='Имя пользователя' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel color={'black'}>Email:</FormLabel>
                <Input
                  color={'black'}
                  onChange={changeHandler}
                  borderColor='#3f3e3e'
                  type='email'
                  name='email'
                  value={inputs?.description}
                  placeholder='Эл.почта' />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel color={'black'}>Пароль:</FormLabel>
                <Input
                  color={'black'}
                  onChange={changeHandler}
                  borderColor='#3f3e3e'
                  type='password'
                  name='password'
                  value={inputs?.password}
                  placeholder='Пароль' />
              </FormControl>
            </ModalBody><ModalFooter>
              <Button onClick={submitHandler} colorScheme='blue' mr={3}>
                Регистрация
              </Button>
              <Button onClick={onClose}>Отмена</Button>
            </ModalFooter>
          </ModalContent>
        </Modal></>
          )}

                
            
          
          


          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

    {/* <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <Input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='email'
              name='email'
              value={inputs?.email}
              placeholder='Эл.почта'
            />
            <Input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
            />
          </>
        )}
        {type === 'signup' && (
          <>
            <Input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              name='username'
              value={inputs?.name}
              placeholder='Имя пользователя'
            />
            <Input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='email'
              name='email'
              value={inputs?.description}
              placeholder='Эл.почта'
            />
            <Input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
            />
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <Button type='submit' colorScheme='blue'>
            Вход
          </Button>
        )}
        {type === 'signup' && (
          <Button type='submit' colorScheme='blue'>
            Регистрация
          </Button>
        )}
      </div>
    </form> */}
    </>
  );
}
