import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { Item } from '../app/model/item';
import { BACKSTAGE, AGED_BRIE, CONJURED, SULFURAS } from '../app/constants/contants';

describe('Gilded Rose', function () {

    describe('Use cases', function () {

        context('Other Items', function () {

            it('items before selling date', function () {
                const gildedRose = new GildedRose([new Item('other', 10, 5)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(9);
                expect(_item.sellIn).to.equal(4);
            });

            it('items on the selling date', function () {
                const gildedRose = new GildedRose([new Item('other', 10, 0)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(8);
                expect(_item.sellIn).to.equal(-1);
            });

            it('items after the selling date', function () {
                const gildedRose = new GildedRose([new Item('other', 10, -5)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(8);
                expect(_item.sellIn).to.equal(-6);
            });

            it('items with a quality of 0', function () {
                const gildedRose = new GildedRose([new Item('other', 0, 5)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(0);
                expect(_item.sellIn).to.equal(4);
            });

        });


        context(AGED_BRIE, function () {

            it('before selling date', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 15, 5)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(16);
                expect(_item.sellIn).to.equal(4);
            });

            it('maximum quality', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 50, 5)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(50);
                expect(_item.sellIn).to.equal(4);
            });

            it('on selling date', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 15, 0)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(17);
                expect(_item.sellIn).to.equal(-1);
            });

            it('on selling date && maximum quality', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 50, 0)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(50);
                expect(_item.sellIn).to.equal(-1);
            });

            it('after selling date', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 15, -10)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(17);
                expect(_item.sellIn).to.equal(-11);
            });

            it('after selling date && maximum quality', function () {
                const gildedRose = new GildedRose([new Item(AGED_BRIE, 50, -10)]);
                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(50);
                expect(_item.sellIn).to.equal(-11);
            });

        });


        context(SULFURAS, function () {

            it('before the selling date', function () {
                const gildedRose = new GildedRose([new Item(SULFURAS, 15, 5)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(15);
                expect(_item.sellIn).to.equal(5);
            });

            it('on selling date', function () {
                const gildedRose = new GildedRose([new Item(SULFURAS, 15, 5)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(15);
                expect(_item.sellIn).to.equal(5);
            });

            it('after selling date', function () {
                const gildedRose = new GildedRose([new Item(SULFURAS, 15, -1)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(15);
                expect(_item.sellIn).to.equal(-1);
            });

        });

        context(CONJURED, function () {

            it('before selling date', function () {
                const gildedRose = new GildedRose([new Item(CONJURED, 10, 10)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(8);
                expect(_item.sellIn).to.equal(9);
            });

            it('after selling date', function () {
                const gildedRose = new GildedRose([new Item(CONJURED, 10, -10)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(6);
                expect(_item.sellIn).to.equal(-11);
            });

            it('at zero quality', function () {
                const gildedRose = new GildedRose([new Item(CONJURED, 0, 10)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(0);
                expect(_item.sellIn).to.equal(9);
            });

            it('on selling date', function () {
                const gildedRose = new GildedRose([new Item(CONJURED, 10, 0)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(6);
                expect(_item.sellIn).to.equal(-1);
            });

            it('on selling date && 0 quality', function () {
                const gildedRose = new GildedRose([new Item(CONJURED, 0, 0)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(0);
                expect(_item.sellIn).to.equal(-1);
            });
        });

        context(BACKSTAGE, function () {

            it('before selling date', function () {
                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, 11)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(11);
                expect(_item.sellIn).to.equal(10);
            });

            it('close to selling date', function () {
                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, 10)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(12);
                expect(_item.sellIn).to.equal(9);
            });

            it('close to selling data && max quality', function () {
                const gildedRose = new GildedRose([new Item(BACKSTAGE, 50, 10)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(50);
                expect(_item.sellIn).to.equal(9);
            });

            it('very close to the selling date', function () {
                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, 5)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(13); // goes up by 3
                expect(_item.sellIn).to.equal(4);
            });

            it('with one day left to sell', function () {
                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, 1)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(13);
                expect(_item.sellIn).to.equal(0);
            });

            it('with one day left to sell, at max quality', function () {

                const gildedRose = new GildedRose([new Item(BACKSTAGE, 50, 1)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(50);
                expect(_item.sellIn).to.equal(0);
            });

            it('on the selling date', function () {

                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, 0)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(0);
                expect(_item.sellIn).to.equal(-1);
            });

            it('after the selling date', function () {

                const gildedRose = new GildedRose([new Item(BACKSTAGE, 10, -1)]);

                const _item = gildedRose.process()[0];

                expect(_item.quality).to.equal(0);
                expect(_item.sellIn).to.equal(-2);
            });

        });

    });

});