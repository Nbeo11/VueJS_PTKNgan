import { reactive } from 'vue';

const store = reactive({
  news: [
    {
      id: 1,
      title: 'Hơn 1,2 triệu tỷ trong Quỹ BHXH: Là số dư sổ sách, không phải tiền ở tài khoản',
      image: 'path/to/image1.jpg',
      details: 'Chi tiết về tin tức 1.',
    },
    {
      id: 2,
      title: 'Tin Tức 2',
      image: 'path/to/image2.jpg',
      details: 'Chi tiết về tin tức 2.',
    },
    {
      id: 3,
      title: 'Tin Tức 3',
      image: 'path/to/image3.jpg',
      details: 'Chi tiết về tin tức 3.',
    },
  ],
});

export default store;
