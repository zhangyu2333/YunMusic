import styles from './login.scss';
import { NavLink } from 'dva/router';
import { AnimationImage } from '../../components/initImage/initImage'
export const Login = () => {
    return <div className={styles.bgImg}>
        <div className={styles.btn}>
            <NavLink to="/userlogin">登陆</NavLink>
            <NavLink to="/userlogin">手机号注册</NavLink>
        </div>
        <AnimationImage></AnimationImage>
    </div>
}