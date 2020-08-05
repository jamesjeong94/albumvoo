export const getCookieValue = (cookie: string): string => {
  var cookieValue = document.cookie.match(
    '(^|;)\\s*' + cookie + '\\s*=\\s*([^;]+)'
  );
  return cookieValue ? cookieValue[0].split('=')[1] : '';
};
