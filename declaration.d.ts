declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-script-tag';

declare module '*.png' {
  const value: any;
  export = value;
}
