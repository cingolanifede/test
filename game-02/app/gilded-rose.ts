/**
 * Make code refactor, basically use the same logic structure than the original code.
 * Remove unnecesary if statement
 * Create folder with more clear structure (constants && model)
 * Add test for different use-cases
 */

import { BACKSTAGE, AGED_BRIE, CONJURED, SULFURAS } from './constants/contants';
import { Item } from './model/item';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }


  /** decrease quality */
  private decreaseQualityHighThan0(item: Item) {
    if (item.quality > 0) {
      if (item.name === CONJURED) item.quality--;
      if (item.name !== SULFURAS) item.quality--;
    }
  }

  /** increase quality */
  private increaseQualityLessThan50(item: Item) {
    if (item.quality < 50) item.quality++;
  }

  /** Main function */
  public process() {
    for (const item of this.items) {
      if (item.name !== AGED_BRIE && item.name !== BACKSTAGE) {
        this.decreaseQualityHighThan0(item);
      } else {
        if (item.quality < 50) {
          item.quality++;
          if (item.name === BACKSTAGE) {
            if (item.sellIn < 11) this.increaseQualityLessThan50(item);
            if (item.sellIn < 6) this.increaseQualityLessThan50(item);
          }
        }
      }

      if (item.name !== SULFURAS) item.sellIn--;

      if (item.sellIn < 0) {
        if (item.name !== AGED_BRIE) {
          if (item.name !== BACKSTAGE) this.decreaseQualityHighThan0(item);
          else item.quality = 0;
        } else {
          this.increaseQualityLessThan50(item);
        }
      }
    }

    return this.items;
  }
}
