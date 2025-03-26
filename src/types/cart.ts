export interface CartItem {
    productId: any;
    size: string;
    quantity: number;
    userId: string;
}
export interface ICartItem {
    productId: {
        _id: string;
        name: string;
        price: number;
        images: {
            main: string;
            hover?: string;
            product: string[];
        };
        sku: string;
    };
    quantity: number;
    size: string;
    _id: string;
}

export interface CartData {
    _id: string;
    userId: string;
    items: ICartItem[];
    createdAt: string;
    updatedAt: string;
}