import Cookies from 'js-cookie'

const state = {
  loginState: Cookies.get('token') ? Cookies.get('token') : '',
  isLogin: Cookies.get('isLogin') ? Cookies.get('isLogin'):false
}

export default state;