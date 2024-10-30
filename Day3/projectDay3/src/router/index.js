import { createRouter, createWebHistory } from 'vue-router'
import Product from "../views/product/Product.vue";
import ProductDetail from "../views/product/ProductDetail.vue";
import Cart from '@/views/product/Cart.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product
    },
    {
      path: '/product/:id', 
      name: 'ProductDetail',
      component: ProductDetail,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})

export default router
