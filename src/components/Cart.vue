<script lang="ts">
import { defineComponent } from 'vue'
import { cartStore } from '@/stores/cart';

export default defineComponent({
    setup() {
        return {
            cartStore
        }
    }
})
</script>

<template>
    <div class="cart">
        <h2 class="cart__title">
            Your Cart ({{ cartStore.items.length }})
        </h2>

        <div class="cart__empty" v-if="cartStore.items.length === 0">
            <img src="@/assets/images/illustration-empty-cart.svg" alt="Empty cart illustration">
            <p class="empty__cart">Your cart is empty</p>
        </div>

        <div v-else>
            <ul class="cart__list">
                <li v-for="item in cartStore.items" :key="item.name" class="cart__item">

                    <div class="item__info">
                        <p class="item__name">{{ item.name }}</p>
                        <div class="item__details">
                            <span class="item__quantity">{{ item.quantity }}x</span>
                            <span class="item__unit">@ ${{ item.price.toFixed(2) }}</span>
                            <strong class="item__total">
                                ${{ (item.price * item.quantity).toFixed(2) }}
                            </strong>
                        </div>
                    </div>

                    <button class="item__remove" @click="cartStore.removeItem(item.name)">
                        <img src="@/assets/images/icon-remove-item.svg" alt="Remove item">
                    </button>
                </li>
            </ul>

            <div class="order__total">
                <span>Order Total</span>
                <strong>${{ cartStore.total.toFixed(2) }}</strong>
            </div>

            <p class="message__order">
                <img src="@/assets/images/icon-carbon-neutral.svg" alt="Carbon neutral delivery">
                <span>
                    This is a <strong>carbon-neutral</strong> delivery
                </span>
            </p>

            <button class="confirm__button" @click="cartStore.openModal()">
                Confirm Order
            </button>
        </div>
    </div>
</template>

<style scoped>
.cart {
    margin: 0 auto;
    max-width: 37.5rem;
    padding: 2.4rem;
    background: var(--rose-50);
    border-radius: 1.6rem;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.05);
}

.cart__title {
    color: var(--red);
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
}

.cart__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 0;
    border-bottom: 1px solid var(--rose-300);
}

.item__name {
    color: var(--rose-900);
    font-weight: 600;
    margin-bottom: .6rem;
}

.item__details {
    display: flex;
    gap: 1.2rem;
    font-size: 1.4rem;
}

.item__quantity {
    color: var(--red);
    font-weight: 600;
}

.item__unit {
    color: var(--rose-400);
}

.item__total {
    color: var(--rose-500);
    font-weight: 700;
}

.item__remove {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--rose-500);
    background: transparent;
    cursor: pointer;
    color: var(--rose-500);
    font-size: 1.6rem;
}

.item__remove:hover {
    border-color: var(--red);
    color: var(--red);
}

.order__total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2.4rem 0;
    font-size: 1.8rem;
}

.order__total span {
    font-size: 1.4rem;
    color: var(--rose-900);
    font-weight: 500;
}

.order__total strong {
    color: var(--rose-900);
    font-weight: 700;
    font-size: 2.2rem;
}

.message__order {
    padding: 1.4rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--rose-100);
    border-radius: .6rem;
    font-size: 1.4rem;
}

.confirm__button {
    width: 100%;
    margin-top: 2rem;
    padding: 1.6rem;
    border-radius: 99rem;
    border: none;
    background: var(--red);
    color: var(--white);
    font-weight: 600;
    font-size: 1.6rem;
    cursor: pointer;
}

.cart__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
}

</style>