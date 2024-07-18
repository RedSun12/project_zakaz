import { Avatar, Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
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
                    <Button width={'100%'} onClick={clickHome} color={'black'}>Главная</Button>
                    <Button width={'100%'} onClick={clickFavorites} color={'black'}>Избранное</Button>
                    {/* <Link to='/favorities'>Избранное</Link> */}
                    {/* <Button color={'black'} to='/'>Главная</Button> */}
                    {/* <Link color='black' to='/'>Главная</Link> */}
                      {/* Главная
                    </MenuItem> */}
                  </MenuList>
        </Menu>
        <Avatar className={styles.ava} width={'60px'} height={'60px'} backgroundColor={'gray'} src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
        <div className={styles.nickName}>{user.username}</div>
        </div>
      ) : (
                  <Menu>
                  <MenuButton
                    marginLeft={'10px'}
                    // padding={'0px'}
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    backgroundColor={'white'}
                  />
                  <MenuList padding={'0px'}>
                    {/* <MenuItem color={'black'} icon={<BiHomeSmile />} command='⌘T'> */}
                      {/* <Button onClick={clickNavigate} color={'black'}>Главная</Button> */}
                    {/* </MenuItem> */}
                    {/* <MenuItem color={'black'} icon={<ExternalLinkIcon />} command='⌘N'> */}
                      <AuthForm width={'100%'} title='Войти' type='signin' setUser={setUser} />
                      {/* <br /> */}
                    {/* </MenuItem> */}
                    {/* <MenuItem color={'black'} icon={<EditIcon />} command='⌘⇧N'> */}
                      <AuthForm width={'100%'} title='Зарегистрироваться' type='signup' setUser={setUser} />
                    {/* </MenuItem> */}
                  </MenuList>
                </Menu>
      )}
      <div className={styles.right}>
        {user?.username ? (
          <>
            {/* <Link to='/favorities'>Избранное</Link> */}
            <Button className={styles.exit} marginRight={'10px'} onClick={logoutHandler}>Выйти</Button>
            {/* <Link onClick={logoutHandler}>Выйти</Link> */}
          </>
        ) : (
          <>
            {/* <Link to='/signin'>Войти</Link>
            <Link to='/signup'>Регистрация</Link> */}
          </>
        )}
      </div>
    </div>
  );
}
