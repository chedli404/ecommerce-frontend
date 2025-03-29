export interface CartType {
    _id: string,
    userId: string,
    price: number,
    items: []
    totalPrice: number
}

export interface CartItemType {
    id?: string,
    productId: string,
    quantity: number,
}
