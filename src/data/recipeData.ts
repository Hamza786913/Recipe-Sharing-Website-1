export interface Recipe {
  image: string;
  tag: string;
  time: string;
  price: number;
  rating: number;
  category: string;
  desc: string;
  ingredients: string[];
  steps: string;
}

export const recipeData: Record<string, Recipe> = {
  Biryani: {
    image: "biryani.jpg",
    tag: "Rice Dish",
    time: "40 min",
    price: 12.99,
    rating: 4.8,
    category: "Rice",
    desc: "Aromatic basmati rice layered with spiced chicken, saffron, and caramelized onions — a Mughal royal classic.",
    ingredients: ["2 cups Basmati Rice","500g Chicken","1 cup Yogurt","2 Onions (sliced)","Saffron + Warm Milk","Whole Spices","Ghee & Fresh Mint"],
    steps: "Marinate chicken in yogurt and spices for 1 hour. Cook onions golden brown. Par-boil rice. Layer rice with chicken and saffron milk. Dum cook on low heat 25 minutes."
  },
  Pizza: {
    image: "pizza.jpg",
    tag: "Fast Food",
    time: "30 min",
    price: 9.99,
    rating: 4.5,
    category: "Fast Food",
    desc: "Crispy Italian-style pizza loaded with melted mozzarella, fresh basil, and rich tomato sauce on a golden crust.",
    ingredients: ["Pizza Dough","½ cup Tomato Sauce","1.5 cups Mozzarella","Bell Peppers","Olives","Oregano & Basil","Olive Oil"],
    steps: "Stretch dough on floured surface. Spread tomato sauce. Add cheese and toppings. Bake at 220°C for 15-18 minutes until crust is golden."
  },
  Burger: {
    image: "burger.jpg",
    tag: "Fast Food",
    time: "20 min",
    price: 7.99,
    rating: 4.6,
    category: "Fast Food",
    desc: "Juicy beef patty with fresh lettuce, tomato, melted cheese, pickles, and special sauce in a toasted sesame bun.",
    ingredients: ["2 Beef Patties","2 Burger Buns","Cheddar Cheese","Lettuce & Tomato","Pickles","Special Sauce","Salt & Pepper"],
    steps: "Season patties and grill 4 minutes per side. Toast buns until golden. Layer sauce, lettuce, patty, cheese, tomato, and pickles."
  },
  Pasta: {
    image: "pasta.jpg",
    tag: "Italian",
    time: "25 min",
    price: 10.99,
    rating: 4.7,
    category: "Italian",
    desc: "Creamy penne pasta tossed in rich garlic cream sauce, finished with parmesan cheese and fresh aromatic basil.",
    ingredients: ["250g Penne Pasta","3 cloves Garlic","1 cup Heavy Cream","½ cup Parmesan","Olive Oil","Salt & Black Pepper","Fresh Basil"],
    steps: "Boil pasta al dente. Sauté garlic in olive oil 2 minutes. Add cream and simmer 5 minutes. Toss pasta in sauce. Finish with parmesan and basil."
  },
  Momos: {
    image: "momos.jpg",
    tag: "Dumplings",
    time: "35 min",
    price: 6.99,
    rating: 4.4,
    category: "Snack",
    desc: "Soft steamed dumplings filled with spiced minced chicken and vegetables, served with fiery red chutney.",
    ingredients: ["2 cups All-Purpose Flour","250g Minced Chicken","Cabbage & Ginger","Garlic & Green Onion","Soy Sauce","Sesame Oil","Salt"],
    steps: "Make dough, rest 30 minutes. Mix filling with all seasonings. Roll small circles, fill and pleat edges. Steam for 12-15 minutes. Serve hot with red chutney."
  },
  Sandwich: {
    image: "sandwitch.jpg",
    tag: "Snack",
    time: "10 min",
    price: 5.99,
    rating: 4.3,
    category: "Snack",
    desc: "Fresh layered sandwich with crisp vegetables, melted cheese, and a tangy cream cheese spread — quick and satisfying.",
    ingredients: ["4 Bread Slices","Cream Cheese / Mayo","Cucumber & Tomato","Lettuce","Cheddar Slice","Mustard Sauce","Salt & Pepper"],
    steps: "Spread cream cheese generously on bread. Layer with lettuce, cucumber, tomato, and cheddar cheese. Add second bread slice. Slice diagonally and serve immediately."
  }
};