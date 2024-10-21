import { Footprints, Ruler, Shirt } from '@yuki/ui/icons'

export const htm = {
  title: 'How to Measure',
  description: 'Follow these tips to get accurate measurements',
  list: [
    'Use a fabric measuring tape for best results.',
    'Keep the tape level and snug, not tight.',
    'Measure yourself in your underwear to ensure accuracy.',
    'If possible, have someone else take your measurements.',
    'When in doubt, choose the larger size.',
  ],
}

export const data = {
  list: [
    { value: 'clothing', label: 'Clothing', icon: Shirt },
    { value: 'shoes', label: 'Shoes', icon: Footprints },
    { value: 'accessories', label: 'Accessories', icon: Ruler },
  ],
  content: [
    {
      value: 'clothing',
      title: 'Clothing Sizes',
      description: 'Measurements in inches',
      headers: ['Size', 'Chest', 'Waist', 'Hips'],
      body: [
        ['XS', '32-34', '26-28', '33-35'],
        ['S', '35-37', '29-31', '36-38'],
        ['M', '38-40', '32-34', '39-41'],
        ['L', '41-43', '35-37', '42-44'],
        ['XL', '44-46', '38-40', '45-47'],
        ['XXL', '47-49', '41-43', '48-50'],
      ],
    },
    {
      value: 'shoes',
      title: 'Shoe Sizes',
      description: 'US to EU conversion',
      headers: ["US (Men's)", 'US (Women’s)', 'EU', 'UK'],
      body: [
        [7, 8.5, 40, 6],
        [8, 9.5, 41, 7],
        [9, 10.5, 42, 8],
        [10, 11.5, 43, 9],
        [11, 12.5, 44, 10],
      ],
    },
    {
      value: 'accessories',
      title: 'Accessories',
      description: 'Belts, Hats and Gloves',
      headers: ['Size', 'Belt (inches)', 'Hat (inches)', 'Gloves (inches)'],
      body: [
        ['S', '30-32', '21 1/4 - 21 5/8', '7 - 7.5'],
        ['M', '34-36', '22 - 22 3/8', '8 - 8.5'],
        ['L', '38-40', '22 3/4 - 23 1/8', '9 - 9.5'],
        ['XL', '42-44', '23 1/2 - 24 7/8', '10 - 10.5'],
      ],
    },
  ],
}
