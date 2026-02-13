import { reactive } from 'vue'
import type IDessert from '@/interfaces/IDessert'

interface CartItem extends IDessert {
    quantity: number
}

export const cartStore = reactive({
    items: [] as CartItem[],
    isModalOpen: false,

    addItem(product: IDessert) {
        const existing = this.items.find(item => item.name === product.name)

        if (existing) {
            existing.quantity++
        } else {
            this.items.push({ ...product, quantity: 1 })
        }
    },

    removeItem(productName: string) {
        const item = this.items.find(item => item.name === productName)
        if (!item) return

        item.quantity--

        if (item.quantity === 0) {
            this.items = this.items.filter(item => item.name !== productName)
        }
    },

    get total() {
        return this.items.reduce(
            (acc: number, item: CartItem) => acc + item.price * item.quantity,
            0
        )
    },
    clearCart() {
        this.items = []
    },

    reset() {
        this.items = []
        this.isModalOpen = false
    },

    openModal() {
        this.isModalOpen = true
    },

    closeModal() {
        this.isModalOpen = false
    }
})