require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI;

const defaultCatalog = [
  {
    id: "cat_g1",
    name: "Fresh Fruits & Vegetables",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300",
    subcategories: [
      {
        id: "sub_f1",
        name: "Fresh Fruits",
        items: [
          {
            id: "item_f1",
            name: "Shimla Apple",
            description: "Sweet and crunchy apples from Shimla.",
            price: 180,
            quantity: "1 kg",
            image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=200"
          },
          {
            id: "item_f2",
            name: "Robusta Banana",
            description: "Fresh robusta bananas.",
            price: 60,
            quantity: "1 Dozen",
            image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=200"
          }
        ]
      },
      {
        id: "sub_v1",
        name: "Daily Vegetables",
        items: [
          {
            id: "item_v1",
            name: "Red Onion",
            description: "Freshly harvested red onions.",
            price: 45,
            quantity: "1 kg",
            image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=200"
          },
          {
            id: "item_v2",
            name: "Tomato - Local",
            description: "Juicy local tomatoes.",
            price: 35,
            quantity: "1 kg",
            image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=200"
          }
        ]
      }
    ]
  },
  {
    id: "cat_g2",
    name: "Eggs, Bakery & Dairy",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=300",
    subcategories: [
      {
        id: "sub_d1",
        name: "Milk & Curd",
        items: [
          {
            id: "item_d1",
            name: "Amul Taaza Milk",
            description: "Toned milk.",
            price: 27,
            quantity: "500 ml",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200"
          }
        ]
      }
    ]
  },
  {
    id: "cat_g3",
    name: "Meat & Seafood",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=300",
    subcategories: [
      {
        id: "sub_m1",
        name: "Chicken",
        items: [
          {
            id: "item_m1",
            name: "Chicken Curry Cut (Small)",
            description: "Fresh, cleaned chicken cut into small pieces perfect for curries.",
            price: 240,
            quantity: "500 g",
            image: "https://images.unsplash.com/photo-1604503468506-a8da13d12791?auto=format&fit=crop&q=80&w=200"
          },
          {
            id: "item_m2",
            name: "Chicken Breast Boneless",
            description: "Tender, boneless chicken breasts.",
            price: 310,
            quantity: "500 g",
            image: "https://images.unsplash.com/photo-1604503468506-a8da13d12791?auto=format&fit=crop&q=80&w=200"
          }
        ]
      },
      {
        id: "sub_m2",
        name: "Mutton & Fish",
        items: [
          {
            id: "item_m3",
            name: "Mutton Curry Cut",
            description: "Premium quality goat meat.",
            price: 850,
            quantity: "500 g",
            image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=200"
          }
        ]
      }
    ]
  },
  {
    id: "cat_g4",
    name: "Oil, Ghee & Masala",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_g5",
    name: "Biscuits Cookies",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_g6",
    name: "Rice & Dal",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_g7",
    name: "Atta, Salt & Sugar",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1627485937980-221c88ce04ea?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_g8",
    name: "Dry Fruits & Museli",
    section: "Groceries Essentials & Pantry goods",
    image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i1",
    name: "Liquor",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i2",
    name: "Chips and Snacks",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1566478989037-e624b0e22138?auto=format&fit=crop&q=80&w=300",
    subcategories: [
      {
        id: "sub_s1",
        name: "Namkeen & Chips",
        items: [
          {
            id: "item_s1",
            name: "Lay's Classic Salted",
            description: "Crispy potato chips.",
            price: 20,
            quantity: "50 g",
            image: "https://images.unsplash.com/photo-1566478989037-e624b0e22138?auto=format&fit=crop&q=80&w=200"
          }
        ]
      }
    ]
  },
  {
    id: "cat_i3",
    name: "Juices and Drinks",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1622597467836-f38240662c8c?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i4",
    name: "Chocolates and Ice Creams",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1548741361-3a589a5af466?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i5",
    name: "Tea, Coffee & More",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i6",
    name: "Instant & Breakfast",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1521483496732-3ea56f04746f?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i7",
    name: "Sauces, Spreads & More",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_i8",
    name: "Paan Corner",
    section: "Indulgence & Cravings",
    image: "https://images.unsplash.com/photo-1627308594190-8ed4b1979cbd?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b1",
    name: "Bath & Body care",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b2",
    name: "Skin Care",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b3",
    name: "Hair Care",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b4",
    name: "Women Care",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1584362916960-fae91be7f2a1?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b5",
    name: "Cosmetics & Perfumes",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b6",
    name: "Sexual Wellness",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1584308666744-24d5e1af7ee7?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b7",
    name: "Baby Care",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1555252834-4b5311eab197?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_b8",
    name: "Health & Wellness",
    section: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_h1",
    name: "Cleaning Essential & Supplies",
    section: "Household Essentials",
    image: "https://images.unsplash.com/photo-1584820927500-1d898c60e3a6?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_h2",
    name: "Home & Lifestyle",
    section: "Household Essentials",
    image: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_h3",
    name: "Kitchen & Dining",
    section: "Household Essentials",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  },
  {
    id: "cat_h4",
    name: "Electronics",
    section: "Household Essentials",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=300",
    subcategories: []
  }
];

async function seedData() {
  console.log('Connecting to MongoDB Atlas...');
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully.');

    console.log('Wiping existing categories...');
    await Category.deleteMany({});

    console.log(`Inserting ${defaultCatalog.length} categories...`);
    await Category.insertMany(defaultCatalog);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedData();
