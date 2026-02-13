<script lang="ts">
import { cartStore } from '@/stores/cart';

export default {
    setup() {
        return {
            cartStore
        }
    },
    methods: {
        handleOverlayClick() {
            cartStore.closeModal()
        },
        startNewOrder() {
            cartStore.reset()
        }
    }
}
</script>

<template>
    <div class="modal__overlay" @click="handleOverlayClick">
        <div class="modal" @click.stop>
            <img src="/images/icon-order-confirmed.svg" alt="Order confirmed" class="modal__icon">

            <h2 class="modal__title">Order Confirmed!</h2>
            <p class="modal__subtitle">We hope you enjoy your food!</p>

            <ul class="cart__list">
                <li v-for="item in cartStore.items" :key="item.name" class="cart__item">
                    <div class="item__left">
                        <img :src="`/images/${item.image}`" alt="Image {{ item.name }}"
                            class="item__image">

                        <div>
                            <p class="item__name">{{ item.name }}</p>
                            <div class="item__details">
                                <span class="item__quantity">{{ item.quantity }}x</span>
                                <span class="item__unit">@ ${{ item.price.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                    <strong class="item__total">
                        ${{ (item.price * item.quantity).toFixed(2) }}
                    </strong>
                </li>
            </ul>

            <button class="modal__button" @click="startNewOrder">
                Start New Order
            </button>
        </div>
    </div>
</template>

<style scoped>
/* ===== OVERLAY ===== */
.modal__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 999;
}

/* ===== CARD ===== */
.modal {
    background: white;
    border-radius: 16px;
    padding: 2.4rem;
    width: 420px;
    max-width: 90%;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

/* ===== HEADER ===== */
.modal__icon {
    width: 48px;
    margin-bottom: 1rem;
}

.modal__title {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--rose-900);
}

.modal__subtitle {
    color: var(--rose-400);
    margin-bottom: 2rem;
}

/* ===== LIST ===== */
.cart__list {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    overflow-y: auto;
    max-height: 50rem;
}

.cart__item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.item__left {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.item__image {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
}

.item__name {
    font-weight: 600;
    color: var(--rose-900);
    margin-bottom: .4rem;
}

.item__details {
    display: flex;
    gap: 1rem;
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
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--rose-900);
}

/* ===== TOTAL ===== */
.order__total {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 2rem 0;
    font-size: 1.8rem;
}

.order__total strong {
    font-size: 2rem;
}

/* ===== BUTTON ===== */
.modal__button {
    width: 100%;
    padding: 1.2rem;

    border: none;
    border-radius: 999px;

    background: #c73b0f;
    color: white;

    font-weight: 600;
    font-size: 1.6rem;

    cursor: pointer;
}

.modal__button:hover {
    opacity: 0.9;
}
</style>