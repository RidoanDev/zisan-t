export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  seller: string;
  stock: number;
  description: string;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: "pickles", name: "আচার", icon: "Citrus", image: "https://i.postimg.cc/rFPWdgzy/images-(3).jpg?w=100&h=100&fit=crop", count: 14 },
  { id: "honey", name: "মধু", icon: "Droplets", image: "https://i.postimg.cc/WpmXkRPz/QGnw-ZNHEPi6jnpj-N931pwado-TBj-Ccn-FP68f-DWjr3.png?w=100&h=100&fit=crop", count: 12 },
  { id: "meat", name: "মাংস", icon: "Drumstick", image: "https://i.postimg.cc/W3N6mzVT/Beef.jpg?w=100&h=100&fit=crop", count: 13 },
  { id: "spices", name: "মসলা", icon: "Flame", image: "https://i.postimg.cc/3J4NqhrS/2023-08-10-64d3f9b27c3fd.jpg?w=100&h=100&fit=crop", count: 15 },
  { id: "eggs", name: "ডিম", icon: "Egg", image: "https://i.postimg.cc/C1MMFTGr/photo-1582722872445-44dc5f7e3c8f-(1).jpg", count: 10 },
  { id: "sweets", name: "মিষ্টি", icon: "Cookie", image: "https://i.postimg.cc/KYRgmTm7/images-(6).jpg?w=100&h=100&fit=crop", count: 12 },
  { id: "dairy", name: "দুগ্ধজাত", icon: "Milk", image: "https://i.postimg.cc/RZxtQh1R/images-(5).jpg?w=100&h=100&fit=crop", count: 9 },
  { id: "rice", name: "চাল", icon: "Wheat", image: "https://i.postimg.cc/J40865xh/images-(7).jpg?w=100&h=100&fit=crop", count: 8 },
  { id: "fish", name: "মাছ", icon: "Fish", image: "https://i.postimg.cc/02kj8SfN/BHilsa123.jpg?w=100&h=100&fit=crop", count: 10 },
  { id: "oil", name: "তেল", icon: "Droplet", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop", count: 10 },
  { id: "fruits", name: "ফলমূল", icon: "Apple", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=100&h=100&fit=crop", count: 18 },
  { id: "vegetables", name: "শাক-সবজি", icon: "Carrot", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=100&h=100&fit=crop", count: 24 },
  { id: "handicrafts", name: "হস্তশিল্প", icon: "Palette", image: "https://i.postimg.cc/s29bDMm6/images-(8).jpg?w=100&h=100&fit=crop", count: 16 },
];

export const products: Product[] = [
  {
    id: "PRD_PICKLES",
    name: "আমের আচার",
    price: 180,
    originalPrice: 220,
    image: "https://i.postimg.cc/rFPWdgzy/images-(3).jpg?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 198,
    category: "pickles",
    seller: "গ্রামীণ হাট",
    stock: 65,
    description: "ঘরে তৈরি কাঁচা আমের আচার। সরিষার তেলে মাখানো।",
    unit: "৩০০ গ্রাম"
  },
  {
    id: "PRD_HONEY",
    name: "অর্গানিক সুন্দরবনের মধু",
    price: 850,
    originalPrice: 1000,
    image: "https://i.postimg.cc/WpmXkRPz/QGnw-ZNHEPi6jnpj-N931pwado-TBj-Ccn-FP68f-DWjr3.png?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "honey",
    seller: "সুন্দরবন অর্গানিক",
    stock: 45,
    description: "১০০% খাঁটি সুন্দরবনের মধু। কোনো মিশ্রণ নেই। প্রাকৃতিক উপায়ে সংগ্রহ করা।",
    unit: "৫০০ গ্রাম"
  },
  {
    id: "PRD_MEAT",
    name: "খাঁটি মাংস",
    price: 550,
    image: "https://i.postimg.cc/W3N6mzVT/Beef.jpg?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 150,
    category: "meat",
    seller: "গ্রাম বাংলা",
    stock: 60,
    description: "ফ্রেশ দেশি মাংস। প্রিমিয়াম কোয়ালিটি।",
    unit: "১ কেজি"
  },
  {
    id: "PRD_SPICES",
    name: "অর্গানিক হলুদ গুঁড়া",
    price: 150,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 145,
    category: "spices",
    seller: "মসলা ঘর",
    stock: 90,
    description: "কাঁচা হলুদ থেকে তৈরি খাঁটি হলুদ গুঁড়া। রং মেশানো নয়।",
    unit: "২৫০ গ্রাম"
  },
  {
    id: "PRD_EGGS",
    name: "দেশি মুরগির ডিম",
    price: 180,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 312,
    category: "eggs",
    seller: "গ্রাম বাংলা",
    stock: 150,
    description: "ফ্রি-রেঞ্জ দেশি মুরগির ডিম। প্রাকৃতিক খাবারে পালিত।",
    unit: "১২ পিস"
  },
  {
    id: "PRD_SWEETS",
    name: "গুড়ের সন্দেশ",
    price: 280,
    originalPrice: 350,
    image: "https://i.postimg.cc/KYRgmTm7/images-(6).jpg?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 189,
    category: "sweets",
    seller: "মিষ্টি ঘর",
    stock: 40,
    description: "খেজুরের গুড় দিয়ে তৈরি সন্দেশ। ভেজালমুক্ত।",
    unit: "৫০০ গ্রাম"
  },
  {
    id: "PRD_DAIRY",
    name: "খাঁটি ঘি",
    price: 750,
    originalPrice: 850,
    image: "https://i.postimg.cc/RZxtQh1R/images-(5).jpg?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 289,
    category: "dairy",
    seller: "গ্রাম বাংলা",
    stock: 40,
    description: "গরুর দুধের সর থেকে তৈরি খাঁটি ঘি। ভেজাল মুক্ত।",
    unit: "৫০০ গ্রাম"
  },
  {
    id: "PRD_RICE",
    name: "দেশি লাল চাল",
    price: 120,
    originalPrice: 150,
    image: "https://i.postimg.cc/J40865xh/images-(7).jpg?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 189,
    category: "rice",
    seller: "গ্রাম বাংলা",
    stock: 120,
    description: "প্রাকৃতিক উপায়ে চাষ করা দেশি লাল চাল। স্বাস্থ্যকর ও পুষ্টিকর।",
    unit: "১ কেজি"
  },
  {
    id: "PRD_FISH",
    name: "ভিলসা মাছ",
    price: 450,
    image: "https://i.postimg.cc/02kj8SfN/BHilsa123.jpg?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 134,
    category: "fish",
    seller: "কক্সবাজার ফিশ",
    stock: 60,
    description: "ভিলসা মাছ, ভালোভাবে সংরক্ষিত।",
    unit: "৫০০ গ্রাম"
  },
  {
    id: "PRD_OIL",
    name: "অর্গানিক সরিষার তেল",
    price: 320,
    originalPrice: 380,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "oil",
    seller: "পল্লী অর্গানিক",
    stock: 78,
    description: "ঘানিতে ভাঙ্গা খাঁটি সরিষার তেল। কোনো রাসায়নিক নেই।",
    unit: "১ লিটার"
  },
  {
    id: "PRD_FRUITS",
    name: "তাজা আম",
    price: 250,
    originalPrice: 300,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 267,
    category: "fruits",
    seller: "রাজশাহী ফার্ম",
    stock: 80,
    description: "রাজশাহীর হিমসাগর আম। কার্বাইড মুক্ত, গাছ পাকা।",
    unit: "১ কেজি"
  },
  {
    id: "PRD_VEGETABLES",
    name: "তাজা পালং শাক",
    price: 40,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 87,
    category: "vegetables",
    seller: "কৃষক বন্ধু",
    stock: 180,
    description: "জৈব চাষে উৎপাদিত তাজা পালং শাক। ভিটামিন সমৃদ্ধ।",
    unit: "১ আঁটি"
  },
  {
    id: "PRD_HANDICRAFTS",
    name: "নকশিকাঁথা",
    price: 1200,
    originalPrice: 1500,
    image: "https://i.postimg.cc/s29bDMm6/images-(8).jpg?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 234,
    category: "handicrafts",
    seller: "হস্তশিল্প ঘর",
    stock: 20,
    description: "হাতে সেলাই করা নকশিকাঁথা। বাংলার ঐতিহ্য।",
    unit: "১ পিস"
  },
];


export const locations = [
  { id: "dhaka", name: "বহালগাছা", deliveryCharge: 10 },
  { id: "mirpur", name: "বিশ্বহারিগাছা বাজার", deliveryCharge: 0 },
  { id: "uttara", name: "চন্দিয়ার", deliveryCharge: 10 },
  { id: "dhanmondi", name: "ফরিংহাটা", deliveryCharge: 10 },
  { id: "gulshan", name: "জালসুকা", deliveryCharge: 20 },
  { id: "outside", name: "ধুনট", deliveryCharge: 60 },
];
