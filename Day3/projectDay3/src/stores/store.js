import { defineStore } from 'pinia';

// Import các ảnh trực tiếp
import product1Image from '@/views/images/product1/product1.png';
import product1Black from '@/views/images/product1/black.png';
import product1Blue from '@/views/images/product1/blue.png';
import product1Brown from '@/views/images/product1/brown.png';
import product1Green from '@/views/images/product1/green.png';
import product1Grey from '@/views/images/product1/grey.png';
import product1White from '@/views/images/product1/white.png';

import product2Image from '@/views/images/product2/product2.png';
import product2Black from '@/views/images/product2/black.png';
import product2Grey from '@/views/images/product2/grey.png';
import product2White from '@/views/images/product2/white.png';

import product3Image from '@/views/images/product3/product3.png';
import product3Black from '@/views/images/product3/black.png';
import product3Grey from '@/views/images/product3/grey.png';

import product4Image from '@/views/images/product4/product4.png';
import product4Black from '@/views/images/product4/black.png';
import product4White from '@/views/images/product4/white.png';

import product5Image from '@/views/images/product5/product5.png';
import product5Black from '@/views/images/product5/black.png';
import product5Blue from '@/views/images/product5/blue.png';
import product5Grey from '@/views/images/product5/grey.png';

import product6Image from '@/views/images/product6/product6.png';
import product6Black from '@/views/images/product6/black.png';
import product6Yellow from '@/views/images/product6/yellow.png';
import product6Ag from '@/views/images/product6/ag.png';

import product7Image from '@/views/images/product7/product7.png';
import product7Black from '@/views/images/product7/black.png';
import product7White from '@/views/images/product7/white.png';
import product7Pink from '@/views/images/product7/white.png';

import product8Image from '@/views/images/product8/product8.png';
import product8Black from '@/views/images/product8/black.png';
import product8White from '@/views/images/product8/white.png';
import product8Brown from '@/views/images/product8/brown.png';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Áo cộc tay',
        price: 200000,
        releaseDate: '2024-10-15',
        isBestSeller: true,
        brand: 'Brand C',
        description: 'Áo cộc tay thoáng mát, chất liệu cotton 100%',
        imageUrl: product1Image, 
        colors: [
          { color: 'Trắng', quantity: 50, imageUrl: product1White },
          { color: 'Đen', quantity: 30, imageUrl: product1Black },
          { color: 'Xanh dương', quantity: 15, imageUrl: product1Blue },
          { color: 'Xám', quantity: 5, imageUrl: product1Grey },
          { color: 'Xanh lá', quantity: 0, imageUrl: product1Green },
        ],
      },
      {
        id: 2,
        name: 'Áo khoác',
        price: 500000,
        releaseDate: '2024-09-01',
        isBestSeller: false,
        brand: 'Brand D',
        description: 'Áo khoác nhẹ, chống gió và chống nước',
        imageUrl: product2Image, 
        colors: [
          { color: 'Đen', quantity: 20, imageUrl: product2Black},
          { color: 'Xám', quantity: 10, imageUrl: product2Grey},
          { color: 'Trắng', quantity: 20, imageUrl: product2White },
        ],
      },
      {
        id: 3,
        name: 'Quần ống suông',
        price: 150000,
        releaseDate: '2024-05-10',
        isBestSeller: true,
        brand: 'Brand E',
        description: 'Quần phong cách, chất liệu co giãn',
        imageUrl: product3Image, 
        colors: [
          { color: 'Xám', quantity: 40, imageUrl: product3Grey },
          { color: 'Đen', quantity: 35, imageUrl: product3Black },
        ],
      },
      {
        id: 4,
        name: 'Áo thun oversize',
        price: 200000,
        releaseDate: '2024-07-20',
        isBestSeller: true,
        brand: 'Brand F',
        description: 'Áo lỡ tay form rộng',
        imageUrl: product4Image, 
        colors: [
          { color: 'Trắng', quantity: 70, imageUrl: product4White },
          { color: 'Đen', quantity: 50, imageUrl: product4Black },
        ],
      },
      {
        id: 5,
        name: 'Balo laptop',
        price: 750000,
        releaseDate: '2024-08-25',
        isBestSeller: false,
        brand: 'Brand G',
        description: 'Balo laptop thời trang, chống nước',
        imageUrl: product5Image, 
        colors: [
          { color: 'Xám', quantity: 15, imageUrl: product5Grey },
          { color: 'Đen', quantity: 15, imageUrl: product5Black },
          { color: 'Xanh dương', quantity: 15, imageUrl: product5Blue },
        ],
      },
      {
        id: 6,
        name: 'Đồng hồ nữ',
        price: 1200000,
        releaseDate: '2024-11-05',
        isBestSeller: true,
        brand: 'Brand I',
        description: 'Đồng hồ nữ thời trang, chống nước',
        imageUrl: product6Image,
        colors: [
          { color: 'Vàng', quantity: 20, imageUrl: product6Yellow },
          { color: 'Bạc', quantity: 15, imageUrl: product6Ag },
          { color: 'Đen', quantity: 5, imageUrl: product6Black },
        ],
      },
      {
        id: 7,
        name: 'Túi xách nữ',
        price: 850000,
        releaseDate: '2024-06-01',
        isBestSeller: false,
        brand: 'Brand J',
        description: 'Túi xách nữ thời trang, chất liệu da tổng hợp',
        imageUrl: product7Image,
        colors: [
          { color: 'Đen', quantity: 25, imageUrl: product7Black },
          { color: 'Hồng', quantity: 20, imageUrl: product7Pink },
          { color: 'Kem', quantity: 15, imageUrl: product7White },
        ],
      },
      {
        id: 8,
        name: 'Túi xách canvas',
        price: 950000,
        releaseDate: '2024-04-10',
        isBestSeller: true,
        brand: 'Brand K',
        description: 'Túi xách canvas phong cách, đơn giản',
        imageUrl: product8Image, 
        colors: [
          { color: 'Trắng', quantity: 50, imageUrl: product8White },
          { color: 'Đen', quantity: 60, imageUrl: product8Black },
          { color: 'Nâu', quantity: 40, imageUrl: product8Brown },
        ],
      }
    ],
  }),
  
});
