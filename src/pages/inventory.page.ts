import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  public readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProductToCart(productName: string) {
    const product = this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  getCartItemByName(productName: string) {
    return this.page
      .locator('.cart_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) });
  }
}
