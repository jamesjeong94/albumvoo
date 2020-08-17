import moment from 'moment';

interface IScriptAttributes {
  async?: boolean;
  defer?: boolean;
  id?: string;
  source: string;
}

export const getCookieValue = (cookie: string): string => {
  var cookieValue = document.cookie.match('(^|;)\\s*' + cookie + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue[0].split('=')[1] : '';
};

export function loadScript(attributes: IScriptAttributes): Promise<any> {
  if (!attributes || !attributes.source) {
    throw new Error('Invalid attributes');
  }

  return new Promise((resolve, reject) => {
    const { async, defer, id, source }: IScriptAttributes = {
      async: false,
      defer: false,
      ...attributes,
    };

    const scriptTag = document.getElementById('spotify-player');

    if (!scriptTag) {
      const script = document.createElement('script');

      script.id = id || '';
      script.type = 'text/javascript';
      script.async = async;
      script.defer = defer;
      script.src = source;
      script.onload = () => resolve(undefined);
      script.onerror = (error: any) => reject(`createScript: ${error.message}`);

      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}

export const timeToReadable = (duration: number) => {
  return moment.utc(duration).format('m:ss');
};

export const getRelativeTime = (time: string) => {
  return moment(time).fromNow();
};
