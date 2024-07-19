import { Avatar, Button, IconButton, Img, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons'
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { BiHomeSmile } from "react-icons/bi";
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const clickHome = () => {
    navigate('/')
  }
  const clickFavorites = () => {
    navigate('/favorities')
  }
  const clickProfile = () => {
    navigate('/profile')
  }

  const logoutHandler = async () => {
    const res = await axiosInstance(`${import.meta.env.VITE_API}/auth/logout`);

    if (res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

  return (
    <div className={styles.wrapper}>
      {user?.username ? (
        <div className={styles.left}>
        <Menu>
                  <MenuButton
                    marginLeft={'20px'}
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    backgroundColor={'white'}
                  />
                  <MenuList padding={'0px'}>
                    {/* <MenuItem color={'black'} icon={<BiHomeSmile />} command='⌘T'> */}
                    <Button fontSize={'25px'} width={'100%'} onClick={clickHome} color={'black'}>Главная</Button>
                    <Button fontSize={'25px'} width={'100%'} onClick={clickFavorites} color={'black'}>Избранное</Button>
          </MenuList>
        </Menu>
        <div className={styles.nameAva}>
          <Avatar onClick={clickProfile} className={styles.ava} width={'55px'} height={'60px'} backgroundColor={'gray'} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
          <div onClick={clickProfile} className={styles.nickName}>{user.username}</div>
        </div>
        </div>
      ) : (
                  <Menu>
                  <MenuButton
                    marginLeft={'20px'}
                    // padding={'0px'}
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    backgroundColor={'white'}
                  />
                  <MenuList padding={'0px'}>
                      <AuthForm fontSize={'25px'} width={'100%'} title='Войти' type='signin' setUser={setUser} />
                      <AuthForm fontSize={'25px'} width={'100%'} title='Зарегистрироваться' type='signup' setUser={setUser} />
                  </MenuList>
                </Menu>
      )}
        <h1 className={styles.name}>Ешьте вкусно, ешьте много</h1>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Button fontSize={'22px'} className={styles.exit} marginRight={'10px'} onClick={logoutHandler}>Выйти</Button>
          </>
        ) : (
          <>
          {/* <iframe src="../../../public/scovoroda.html">
            <p> display</p>
          </iframe> */}
          <Img width={'60px'} src='../../../public/food.svg'/>
            {/* <img src='../../../public'> */}
          </>
        )}
      </div>
    </div>
  );
}
