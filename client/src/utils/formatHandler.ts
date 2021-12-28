import moment from 'moment';
import { baseURL } from '../requests';

export const formatPrice = (price: number | string, currency?: string, lang?: 'en' | 'ar') => {
  let formatedPrice = `${(+price).toFixed(2)}`;
  if (lang === 'ar') {
    // const arabicNumbersString = "۰١٢٣٤٥٦٧٨٩";
    // const arabicNumbers = arabicNumbersString.split("");
    // formatedPrice = `${(+price).toFixed(2)}`.replace(/\d/g, function (m) {
    //   return arabicNumbers[parseInt(m)];
    // });
  }

  const currencies: any = {
    EGP: {
      en: 'EGP',
      ar: 'جنيه',
    },
  };
  return formatedPrice + ' ' + (currencies[currency ?? 'EGP'][lang ?? 'en'] || '');
};
export const calculatePrice = (price: number | string, discount: number | string) => {
  const calculatedPrice = +price - +price * ((+discount || 0) / 100);
  return calculatedPrice;
};

export const formatImageSrc = (image: string) => {
  if (!image) return '';
  if (image.startsWith('https://') || image.startsWith('http://')) return image;
  return baseURL + image;
};

export const formatDate = (date: any) => {
  return moment(date).format('D MMMM, YYYY');
};
export const formatTime = (date: string) => {
  const dateObj = new Date(date);
  return moment(`${dateObj.getHours()}:${dateObj.getMinutes()}`, 'HH:mm').format('hh:mm A');
};
