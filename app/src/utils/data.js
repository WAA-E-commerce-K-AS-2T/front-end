export const products = [
  {
    id: 1,
    name: "Fresh Produce",
    image: "../assets/images/OIP.png",
    price: "0.99",
    badgeText: "Fresh",
    description: "Freshly picked organic vegetables",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Meat & Seafood",
    image: "../assets/images/OIP.png",
    price: "12.99",
    badgeText: "Best Seller",
    description: "High-quality meat and seafood",
    rating: 4.7,
    reviews: 350,
  },
  {
    id: 3,
    name: "Snacks",
    image: "../assets/images/OIP.png",
    price: "3.49",
    badgeText: "",
    description: "Tasty and healthy snacks for all",
    rating: 4.3,
    reviews: 230,
  },
  {
    id: 4,
    name: "Pantry Staples",
    image: "../assets/images/OIP.png",
    price: "2.99",
    badgeText: "Popular",
    description: "Essential pantry items",
    rating: 4.6,
    reviews: 145,
  },
  {
    id: 5,
    name: "Frozen Foods",
    image: "../assets/images/OIP.png",
    price: "5.99",
    badgeText: "",
    description: "Quick and easy frozen meals",
    rating: 4.2,
    reviews: 190,
  },
  {
    id: 6,
    name: "Deli",
    image: "../assets/images/OIP.png",
    price: "7.99",
    badgeText: "",
    description: "Delicious deli products",
    rating: 4.4,
    reviews: 210,
  },
  {
    id: 7,
    name: "Household Essentials",
    image: "../assets/images/OIP.png",
    price: "4.99",
    badgeText: "New",
    description: "Daily household necessities",
    rating: 4.8,
    reviews: 80,
  },
  {
    id: 8,
    name: "Personal Care",
    image: "../assets/images/OIP.png",
    price: "8.99",
    badgeText: "",
    description: "Quality personal care products",
    rating: 4.5,
    reviews: 170,
  },
  {
    id: 9,
    name: "Health & Wellness",
    image: "../assets/images/OIP.png",
    price: "14.99",
    badgeText: "Top Rated",
    description: "Products for health and wellness",
    rating: 4.9,
    reviews: 250,
  },
  {
    id: 10,
    name: "Pet Supplies",
    image: "../assets/images/OIP.png",
    price: "19.99",
    badgeText: "",
    description: "Everything your pet needs",
    rating: 4.3,
    reviews: 140,
  },
  {
    id: 11,
    name: "Beauty",
    image: "../assets/images/OIP.png",
    price: "24.99",
    badgeText: "",
    description: "Top beauty products",
    rating: 4.6,
    reviews: 110,
  },
  {
    id: 12,
    name: "Baby",
    image: "../assets/images/OIP.png",
    price: "9.99",
    badgeText: "Essential",
    description: "Everything for your baby",
    rating: 4.7,
    reviews: 130,
  },
];

export const productDetails = {
  id: 1,
  name: "Softsoap Liquid Hand Soap, Cherry Blossom",
  image: "https://example.com/image.png", // Replace with a real image URL
  price: 3.99,
  description: "Limited Edition Cherry Blossom Liquid Hand Soap.",
  details: `Love your skin! Washing with Softsoap Liquid Hand Soap, Cherry Blossom fragrance leaves your hands feeling clean and fresh. Awaken your senses and brighten your home. This liquid soap formula with a touch of moisturizing ingredients helps skin retain its natural moisture. It's the perfect way to add a refreshing moment to your day. For a full-on sensory experience, get clean hands that feel fresh with Softsoap Liquid Hand Soap, Cherry Blossom.`,
  brand: "Softsoap",
  productSize: "7.5 oz",
  color: "Pink",
  material: "Plastic Bottle",
  inStock: 150,
  specifications: {
    Brand: "Softsoap",
    Form: "Liquid",
    Scent: "Cherry Blossom",
    SKU: "123456789",
  },
  reviews: [
    {
      rating: 5,
      contentSummary: "Great Product",
      content:
        "This hand soap smells great and leaves my hands feeling clean and fresh.",
      date: "2023-06-01",
      reviewer: "John Doe",
    },
    {
      rating: 4,
      contentSummary: "Good but pricey",
      content:
        "I love the smell and it works well, but it is a bit on the pricey side.",
      date: "2023-05-15",
      reviewer: "Jane Smith",
    },
    {
      rating: 3,
      contentSummary: "Average",
      content:
        "It’s okay. Smells good but doesn’t lather as much as I expected.",
      date: "2023-04-20",
      reviewer: "Alice Johnson",
    },
  ],
};
export const productData = {
  name: "Stylish Modern Chair",
  price: 129.99,
  description:
    "A stylish and comfortable modern chair perfect for any living space.",
  details:
    "This modern chair is designed to add a touch of elegance and comfort to your home. It features a sturdy wooden frame and a soft cushioned seat, making it a perfect choice for any room.",
  specifications: {
    Weight: "15 lbs",
    Dimensions: "30 x 25 x 35 inches",
    Color: "Gray",
    Material: "Fabric, Wood",
    Brand: "HomeComfort",
  },
  colors: ["Gray", "Blue", "Black", "White"],
  brands: ["HomeComfort", "LuxuryLiving", "CozyHome"],
  materials: ["Fabric", "Leather", "Velvet"],
  sizes: ["Small", "Medium", "Large"],
  reviews: [
    {
      rating: 5,
      contentSummary: "Excellent chair!",
      content:
        "This chair is incredibly comfortable and looks great in my living room. Highly recommend!",
      date: "2023-05-12",
      reviewer: "John Doe",
    },
    {
      rating: 4,
      contentSummary: "Very good",
      content:
        "The chair is very good, but the assembly instructions could be clearer.",
      date: "2023-06-03",
      reviewer: "Jane Smith",
    },
    {
      rating: 3,
      contentSummary: "Average",
      content: "The chair is okay, but it didn't match the color I expected.",
      date: "2023-04-21",
      reviewer: "Emily Johnson",
    },
  ],
};

export const orderHistoryData = [
  {
    id: 1,
    total: 120.99,
    date: "2024-06-19",
    deliveredTo: "John Doe",
    status: "Delivered",
    products: [
      { name: "Product 1", quantity: 2 },
      { name: "Product 2", quantity: 1 },
    ],
    paymentMode: "Credit Card",
  },
  // Add more orders as needed
];
