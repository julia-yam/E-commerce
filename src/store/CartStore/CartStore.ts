import { makeAutoObservable, toJS } from 'mobx';
import { type FormattedProduct } from 'api/types';

interface CartItem {
  product: FormattedProduct;
  quantity: number;
}

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addToCart(product: FormattedProduct) {
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveToStorage();
  }

  removeFromCart(productId: number | string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.saveToStorage();
  }

  changeQuantity(productId: number | string, delta: number) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(1, item.quantity + delta);
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem('guest_cart', JSON.stringify(toJS(this.items)));
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('guest_cart');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        this.items = [];
      }
    }
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}

const cartStore = new CartStore();
export default cartStore;
