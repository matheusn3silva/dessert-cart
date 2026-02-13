<script lang="ts">
import { defineComponent } from 'vue'
import { getDesserts } from '@/http/index';
import { cartStore } from '@/stores/cart';

import type IDessert from '@/interfaces/IDessert';

import CardProduct from './CardProduct.vue';
import Container from './Container.vue';
import ModalConfirmOrder from './ModalConfirmOrder.vue';
import Cart from './Cart.vue';

export default defineComponent({
    components: { CardProduct, Container, ModalConfirmOrder, Cart },
    data() {
        return {
            desserts: [] as IDessert[]
        }
    },
    setup() {
        return {
            cartStore
        }
    },
    async created() {
        this.desserts = await getDesserts()
    }
})
</script>

<template>
    <Container>
        <h1 class="title__page">Desserts</h1>

        <div class="content">
            <ul class="list__products">
                <li v-for="dessert in desserts" :key="dessert.name">
                    <CardProduct 
                        :name="dessert.name" 
                        :image="dessert.image" 
                        :category="dessert.category"
                        :price="dessert.price" 
                    />
                </li>
            </ul>

            <asside class="cart__wrapper">
                <Cart />
            </asside>
        </div>
    </Container>

    <Transition name="modal">
        <ModalConfirmOrder v-if="cartStore.isModalOpen" />
    </Transition>

</template>

<style scoped>
.title__page {
    margin: 2rem 0;
}

.content {
    display: grid;
    gap: 3rem;
}

.list__products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
}

.cart__wrapper {
    width: 100%;
}

@media (min-width: 1024px) {
  .content {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }

  .cart__wrapper {
    position: sticky;
    top: 2rem;
  }
}
</style>