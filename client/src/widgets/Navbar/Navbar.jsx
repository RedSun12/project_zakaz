import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { BiHomeSmile } from 'react-icons/bi';
import AuthForm from '../../components/AuthForm/AuthForm';

export default function Navbar({ user, setUser }) {
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            backgroundColor={'white'}
          />
          <MenuList>
            {/* <MenuItem color={'black'} icon={<BiHomeSmile />} command='⌘T'> */}
            <Link to="/">Войти</Link>
            {/* Главная
                    </MenuItem> */}
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            backgroundColor={'white'}
          />
          <MenuList color={'black'}>
            {/* <MenuItem color={'black'} icon={<BiHomeSmile />} command='⌘T'> */}
            <Link  to="/"><h1 color='black'>Главная</h1></Link>
            {/* </MenuItem> */}
            {/* <MenuItem color={'black'} icon={<ExternalLinkIcon />} command='⌘N'> */}
            <AuthForm title="Войти" type="signin" setUser={setUser} />
            {/* </MenuItem> */}
            {/* <MenuItem color={'black'} icon={<EditIcon />} command='⌘⇧N'> */}
            <AuthForm
              title="Зарегистрироваться"
              type="signup"
              setUser={setUser}
            />
            {/* </MenuItem> */}
          </MenuList>
        </Menu>
      )}
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link>{user.username}</Link>
            <Link to="/favorities">Избранное</Link>
            <Link onClick={logoutHandler}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Войти</Link>
            <Link to="/signup">Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
