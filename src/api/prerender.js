import { prerender_post } from '@/common/request';
var prerender_token = 'tu37YqwPnaadhzMbeNIE';
//
// https://api.prerender.io/recache
// {
// 	"prerenderToken": "YOUR_TOKEN",
// 	"urls": [
//         "http://www.example.com/url/to/recache",
//         "http://www.example.com/url/to/recache2"
//     ]
// }

export function recacheVideo(id) {
  const url = 'https://www.krace.com.tw/video/' + id;
  const data = {
    prerenderToken: prerender_token,
    url: url,
  };
  return prerender_post('https://api.prerender.io/recache', data);
}

export function recacheProduct(id) {
  const url = 'https://www.krace.com.tw/product/' + id;
  const data = {
    prerenderToken: prerender_token,
    url: url,
  };
  return prerender_post('https://api.prerender.io/recache', data);
}

export function recacheNews(id) {
  const url = 'https://www.krace.com.tw/news/page/' + id;
  const data = {
    prerenderToken: prerender_token,
    url: url,
  };
  return prerender_post('https://api.prerender.io/recache', data);
}

export function recacheSeo(column_title) {
  const page_list = {
    home: '/',
    about: '/about',
    productlist: '/collections',
    newslist: '/news',
  };
  const url = 'https://www.krace.com.tw' + page_list[column_title];
  const data = {
    prerenderToken: prerender_token,
    url: url,
  };
  return prerender_post('https://api.prerender.io/recache', data);
}
