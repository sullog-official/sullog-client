const logout = () => {
  sessionStorage.removeItem('authorization');
  document.cookie = 'refresh=; Max-Age=0; path=/';
};

export default logout;
