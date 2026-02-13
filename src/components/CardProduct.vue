<script lang="ts">
import { defineComponent } from 'vue'
import { cartStore } from '@/stores/cart';

export default defineComponent({
    props: {
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true }
    },

    computed: {
        quantity(): number {
            const item = cartStore.items.find(item => item.name === this.name)
            return item?.quantity || 0
        },
        inCart(): boolean {
            return this.quantity > 0
        }
    },

    methods: {
        addCart() {
            cartStore.addItem({
                name: this.name,
                price: this.price,
                image: this.image,
                category: this.category
            })
        },
        removeCart() {
            cartStore.removeItem(this.name)
        }
    }
})
</script>

<template>
    <div class="card">
        <div class="card__image">
            <img 
                :src="`/images/${image}`" 
                :alt="`Image ${name}`" 
                :class="[{ active: inCart }]"
            />

            <div class="card__action">
                <button v-if="!inCart" @click="addCart">
                    <img class="button__icon__add__cart" src="/images/icon-add-to-cart.svg" alt="Icon Add to Cart" />
                    Add to Cart
                </button>

                <div v-else class="counter">
                    <button @click="removeCart">
                        -
                    </button>
                    <span>{{ quantity }}</span>
                    <button @click="addCart">
                        +
                    </button>
                </div>
            </div>
        </div>
        <div class="card__info">
            <p class="category">{{ category }}</p>
            <h2>{{ name }}</h2>
            <p class="price">${{ price.toFixed(2) }}</p>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    padding: 1.2rem;
    border-radius: 1.2rem;
    border: 2px solid transparent;
}

.card__image {
    position: relative;
}

.card__image img {
    width: 100%;
    border: 2px solid transparent;
    border-radius: 1.2rem;
    transition: all 0.3s ease;
}

.card__image img.active {
    border: 2px solid var(--red);
}

.card__action {
    position: absolute;
    bottom: -1.8rem;
    left: 50%;
    transform: translateX(-50%);
}

.card__action button {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1rem;
    padding: 1rem 1.4rem;
    background: var(--white);
    border: 1px solid var(--red);
    border-radius: 99rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card__action button:hover {
    color: var(--red);
    border-color: var(--red);
}

.button__icon__add__cart {
    width: 100%;
    max-width: 1.6rem;
    margin-right: 0.5rem;
}

.counter {
    min-width: 13rem;
    display: flex;
    justify-content: space-between;
    gap:  1.6rem;
    align-items: center;
    background-color: var(--red);
    color: var(--white);
    padding: .8rem 1.8rem;
    border-radius: 99rem;
    font-size: 1.2rem;
}

.counter button {
    width: 2.2rem;
    height: 2.2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    background: none;
    border: 1px solid var(--white);
    border-radius: 50%;

    color: var(--white);
    font-size: 1.6rem; 
    line-height: 1; 
    padding: 0; 
    cursor: pointer;
    transition: all 0.3s ease;
}

.counter button:hover {
    background-color: var(--white);
    color: var(--red); 
}

.card__info {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: .4rem;
}

.category {
    color: var(--rose-500);
    font-size: 14px;
}

.price {
    font-size: 1.6rem;
    color: var(--red);
    font-weight: 600;
}
</style>
