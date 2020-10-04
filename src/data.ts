import {LatLng} from 'react-native-maps';

export const categories = [
  {
    id: '213',
    title: 'Category 1',
    products: [
      {
        id: '21354',
        title: 'Product 1.1',
      },
      {
        id: '21355',
        title: 'Product 1.2',
      },
      {
        id: '21356',
        title: 'Product 1.3',
      },
      {
        id: '2135gfghgf6',
        title: 'Product 1.4',
      },
    ],
  },
  {
    id: '220',
    title: 'Category 2',
    products: [
      {
        id: '22054',
        title: 'Product 2.1',
      },
      {
        id: '22055',
        title: 'Product 2.2',
      },
      {
        id: '22056',
        title: 'Product 2.3',
      },
      {
        id: '22aaa054',
        title: 'Product 2.4',
      },
      {
        id: '2205sdsd5',
        title: 'Product 2.5',
      },
      {
        id: '220dfdfd56',
        title: 'Product 2.6',
      },
    ],
  },
  {
    id: '24345645',
    title: 'Category 3',
    products: [
      {
        id: '2131232154',
        title: 'Product 3.1',
      },
      {
        id: '2178987355',
        title: 'Product 3.2',
      },
      {
        id: '2145645356',
        title: 'Product 3.3',
      },
      {
        id: '217898saa7355',
        title: 'Product 3.4',
      },
    ],
  },
  {
    id: '244413',
    title: 'Category 4',
    products: [
      {
        id: '213544454',
        title: 'Product 4.1',
      },
      {
        id: '213456456546455',
        title: 'Product 4.2',
      },
      {
        id: '213121235456',
        title: 'Product 4.3',
      },
      {
        id: '213544oo454',
        title: 'Product 4.4',
      },
      {
        id: '2134564544246546455',
        title: 'Product 4.5',
      },
      {
        id: '213121ytuy7235456',
        title: 'Product 4.6',
      },
      {
        id: '21354898894454',
        title: 'Product 4.7',
      },
      {
        id: '213456456n1546455',
        title: 'Product 4.8',
      },
      {
        id: '21312123511456',
        title: 'Product 4.9',
      },
    ],
  },
  {
    id: '21853213',
    title: 'Category 5',
    products: [
      {
        id: '213778354',
        title: 'Product 5.1',
      },
      {
        id: '213554445',
        title: 'Product 5.2',
      },
      {
        id: '21351116',
        title: 'Product 5.3',
      },
    ],
  },
  {
    id: '21653',
    title: 'Category 6',
    products: [
      {
        id: '21231354',
        title: 'Product 6.1',
      },
      {
        id: '218787355',
        title: 'Product 6.2',
      },
      {
        id: '2121356',
        title: 'Product 6.3',
      },
      {
        id: '2123137757554',
        title: 'Product 6.4',
      },
    ],
  },
  {
    id: '2134',
    title: 'Category 7',
    products: [
      {
        id: '21354354',
        title: 'Product 7.1',
      },
    ],
  },
];

export type OrderType = {
  id: string;
  status: 'PENDING' | 'INPROGRESS' | 'DELIVERY' | 'DELIVERD';
  productId: string;
  productTitle: string;
  coordinate: LatLng | undefined;
};

export const orders: OrderType[] = [
  {
    id: '46546546',
    status: 'PENDING',
    productId: '21354354',
    productTitle: 'Product 7.1',
    coordinate: {
      latitude: 0.01,
      longitude: 56,
    },
  },
];
