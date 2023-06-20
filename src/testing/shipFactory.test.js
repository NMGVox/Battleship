const shipFactory = require('./shipFactory');

test('Returns object with len 5', () => {
    expect(shipFactory(5)).toMatchObject({'length' : 5});
});

test('Returns object with len 5, hits 0, sunk = false', () => {
    expect(shipFactory(5)).toEqual({'length' : 5, 'hits': 0, 'sunk' : false})
});