export function checkAuthority() {
  if (localStorage.login) {
    const { userId, loginTime } = JSON.parse(localStorage.login);
    const now = (new Date()).getTime();
    const day = Math.floor((now - (new Date(loginTime).getTime())) / (24 * 3600 * 1000));
    console.log(day);
    if (userId && day < 7) {
      // const { dispatch } = this.props;
      // dispatch(routerRedux.push('/fault'));
      return true;
    }
  } else {
    return false;
  }
}
