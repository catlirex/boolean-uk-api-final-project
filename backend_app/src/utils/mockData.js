const faker = require("faker");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function buildUserList() {
  const numOfUser = getRandomInt(5, 10);
  const users = [];
  for (let i = 0; i < numOfUser; i++) {
    let user = {
      name: `${faker.name.findName()} ${faker.name.lastName()}`,
      phone_number: faker.phone.phoneNumber(),
    };

    users.push(user);
  }

  return users;
}

function buildTransactionsList() {
  const numOfTransactions = getRandomInt(10, 20);
  const transactions = [];
  for (let i = 0; i < numOfTransactions; i++) {
    let transaction = {
      estimatedPickupTime: faker.date.soon(),
    };

    transactions.push(transaction);
  }
  return transactions;
}

const coffeeList = [
  {
    name: "Americano",
    description:
      "Our signature Espresso softened with hot water. Drink it straight up or add a splash of milk.",
    size: "Large",
    price: 3,
    image: "https://www.starbucks.com.cn/images/products/caffe-americano.jpg",
    ice: false,
  },
  {
    name: "Americano",
    description:
      "Our signature Espresso softened with hot water. Drink it straight up or add a splash of milk.",
    size: "Regular",
    price: 1.5,
    image: "https://www.starbucks.com.cn/images/products/caffe-americano.jpg",
    ice: false,
  },
  {
    name: "Latte",
    description:
      "Our signature blend espresso with steamed milk for a smooth and creamy coffee.",
    size: "Large",
    price: 4,
    image:
      "https://www.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/latte_macchiato_2000x1400px.jpg?la=en&hash=63ABAEF9D0F0FE3C132802AD5A34AC6FFEA44D5B",
    ice: false,
  },
  {
    name: "Latte",
    description:
      "Our signature blend espresso with steamed milk for a smooth and creamy coffee.",
    size: "Regular",
    price: 3,
    image:
      "https://www.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/latte_macchiato_2000x1400px.jpg?la=en&hash=63ABAEF9D0F0FE3C132802AD5A34AC6FFEA44D5B",
    ice: false,
  },
  {
    name: "Cafe Au Lait",
    description:
      "It is, just like the cappuccino, an espresso based drink topped with milk, but from France.",
    size: "Large",
    price: 4.5,
    image:
      "https://cdn11.bigcommerce.com/s-rfgji4z49j/images/stencil/500x659/products/192/581/AU_LAIT__62863.1563044617.jpg?c=2",
    ice: false,
  },
  {
    name: "Cafe Au Lait",
    description:
      "It is, just like the cappuccino, an espresso based drink topped with milk, but from France.",
    size: "Regular",
    price: 3,
    image:
      "https://cdn11.bigcommerce.com/s-rfgji4z49j/images/stencil/500x659/products/192/581/AU_LAIT__62863.1563044617.jpg?c=2",
    ice: false,
  },
  {
    name: "Vienna Coffee",
    description:
      "Black espresso in a standard sized coffee cup and infusing the coffee with whipped cream",
    size: "Large",
    price: 5,
    image:
      "https://www.bonbonsbakery.com.au/assets/images/bonbon_images/cof_Vienna.jpg",
    ice: false,
  },
  {
    name: "Vienna Coffee",
    description:
      "Black espresso in a standard sized coffee cup and infusing the coffee with whipped cream",
    size: "Regular",
    price: 3,
    image:
      "https://www.bonbonsbakery.com.au/assets/images/bonbon_images/cof_Vienna.jpg",
    ice: false,
  },
  {
    name: "Irish Coffee",
    description:
      "Served with a bottom layer of whiskey, a separate coffee layer, and a layer of cream on top",
    size: "Large",
    price: 5,
    image:
      "https://assets.bonappetit.com/photos/57ad517a1b334044149755f4/3:2/w_1181,h_787,c_limit/irishcoffee_VCC.jpg",
    ice: false,
  },
  {
    name: "Irish Coffee",
    description:
      "Served with a bottom layer of whiskey, a separate coffee layer, and a layer of cream on top",
    size: "Regular",
    price: 3.5,
    image:
      "https://assets.bonappetit.com/photos/57ad517a1b334044149755f4/3:2/w_1181,h_787,c_limit/irishcoffee_VCC.jpg",
    ice: false,
  },
  {
    name: "Cappuccino",
    description:
      "Made with our aromatic Espresso, frothy milk and decadent chocolate dusting.",
    size: "Large",
    price: 4,
    image:
      "https://media.istockphoto.com/photos/cup-of-coffee-latte-isolated-on-white-background-with-clipping-path-picture-id1152767411?k=6&m=1152767411&s=612x612&w=0&h=RebZ6ZsPcu0zLueLqpBSJpCpEc28Oi4FKUFdokwCHgQ=",
    ice: false,
  },
  {
    name: "Cappuccino",
    description:
      "Made with our aromatic Espresso, frothy milk and decadent chocolate dusting.",
    size: "Regular",
    price: 4,
    image:
      "https://media.istockphoto.com/photos/cup-of-coffee-latte-isolated-on-white-background-with-clipping-path-picture-id1152767411?k=6&m=1152767411&s=612x612&w=0&h=RebZ6ZsPcu0zLueLqpBSJpCpEc28Oi4FKUFdokwCHgQ=",
    ice: false,
  },
  {
    name: "Espresso",
    description:
      "A shot of espresso with a rich flavour and caramel-like sweetness.",
    size: "Regular",
    price: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl0RA2Dz3ndDos2O7tvGarw1qlm7ExDSk2-Q&usqp=CAU",
    ice: false,
  },
  {
    name: "Flat White",
    description:
      "A delicious combination of Espresso and velvety milk, signed off with a perfect florette.",
    size: "Large",
    price: 3,
    image:
      "https://www.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/flat_white_2000x1400px.jpg?la=en&hash=09CF109E21F5979B07505D0BF4CC8DA8D0511941",
    ice: false,
  },
  {
    name: "Flat White",
    description:
      "A delicious combination of Espresso and velvety milk, signed off with a perfect florette.",
    size: "Regular",
    price: 2,
    image:
      "https://www.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/flat_white_2000x1400px.jpg?la=en&hash=09CF109E21F5979B07505D0BF4CC8DA8D0511941",
    ice: false,
  },
  {
    name: "Lungo",
    description:
      "Less strong, but more bitter, than an espresso, because the additional hot water passing through the ground coffee extracts",
    size: "Regular",
    price: 1.5,
    image:
      "https://coffeemaker.top/wp-content/uploads/2021/04/What-is-lungo-coffee.jpg",
    ice: false,
  },
  {
    name: "Macchiato",
    description:
      "Freshly steamed milk with vanilla-flavoured syrup, marked with espresso and finished with caramel sauce.",
    size: "Large",
    price: 4,
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/macchiato-1583406296.jpg",
    ice: false,
  },
  {
    name: "Macchiato",
    description:
      "Freshly steamed milk with vanilla-flavoured syrup, marked with espresso and finished with caramel sauce.",
    size: "Regular",
    price: 2,
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/macchiato-1583406296.jpg",
    ice: false,
  },
  {
    name: "Expresso Romano",
    description:
      "Short or long shot of espresso mixed with a teaspoon of sugar and served with a small piece of lemon rind",
    size: "Regular",
    price: 1.5,
    image:
      "https://static.wixstatic.com/media/86a32b_7af8d7de3d294319a43964c205510801~mv2.png/v1/fill/w_441,h_477,al_c/86a32b_7af8d7de3d294319a43964c205510801~mv2.png",
    ice: false,
  },
  {
    name: "Espresso Con Panna",
    description:
      "A shot of espresso with a generous dollop of whipped cream on top.",
    size: "Regular",
    price: 3.5,
    image:
      "https://www.nicepng.com/png/detail/59-591392_fireplace-solutions-cioccolata-con-panna.png",
    ice: false,
  },
  {
    name: "Morochino",
    description:
      "Served in a small glass and consists of a shot of espresso, cocoa powder and milk froth.",
    size: "Regular",
    price: 4,
    image:
      "https://laboratorioespresso.it/wp-content/uploads/2018/05/caffe-marocchino-710x448-1.jpg",
    ice: false,
  },
  {
    name: "Bicerin",
    description:
      "It is a traditional warm coffee concoction native to Turin, Italy, made of espresso, drinking chocolate and whole milk served layered in a small rounded glass.",
    size: "Large",
    price: 4.5,
    image:
      "https://lh3.googleusercontent.com/proxy/Qu_KtPXL0n67a1cxMN1ZUIukX6WEvx6Z0An7v-d-Fg85MywYfN9OYNthprmvmhSIRDAid7xH68BHsbbnLcTb5CGETlSqAmqeJrEoVScz3U_qcPEk50FE3xWVcbANHBZOYXoLFbkk2ITwuw",
    ice: false,
  },
  {
    name: "Bicerin",
    description:
      "It is a traditional warm coffee concoction native to Turin, Italy, made of espresso, drinking chocolate and whole milk served layered in a small rounded glass.",
    size: "Regular",
    price: 3.5,
    image:
      "https://lh3.googleusercontent.com/proxy/Qu_KtPXL0n67a1cxMN1ZUIukX6WEvx6Z0An7v-d-Fg85MywYfN9OYNthprmvmhSIRDAid7xH68BHsbbnLcTb5CGETlSqAmqeJrEoVScz3U_qcPEk50FE3xWVcbANHBZOYXoLFbkk2ITwuw",
    ice: false,
  },
  {
    name: "Galao",
    description:
      "Coffee with milk served in a tall glass with a shot of espresso and filled with steamed milk.",
    size: "Large",
    price: 5,
    image:
      "https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Latte-Macchiato.jpg",
    ice: false,
  },
  ,
  {
    name: "Galao",
    description:
      "Coffee with milk served in a tall glass with a shot of espresso and filled with steamed milk.",
    size: "Regular",
    price: 4,
    image:
      "https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Latte-Macchiato.jpg",
    ice: false,
  },
  {
    name: "Ristretto",
    description: `"Short shot" (30 ml from a double basket) of a more highly concentrated espresso coffee.`,
    size: "Regular",
    price: 3,
    image:
      "https://www.jura.com/-/media/global/images/coffee-recipes/images-redesign-2020/ristretto_2000x1400px.jpg?la=en&hash=E708695CD6B3D7F11F676E21FF7577141E8CBE20",
    ice: false,
  },
  {
    name: "Mocha",
    description:
      "Expertly steamed chocolate milk blended with espresso for a caffeinated chocolate treat.",
    size: "Large",
    price: 6,
    image:
      "https://whisk-res.cloudinary.com/image/upload/v1621831977/recipe/e078c3c5603422b78538a94dfa884e34.jpg",
    ice: false,
  },
  {
    name: "Mocha",
    description:
      "Expertly steamed chocolate milk blended with espresso for a caffeinated chocolate treat.",
    size: "Regular",
    price: 3,
    image:
      "https://whisk-res.cloudinary.com/image/upload/v1621831977/recipe/e078c3c5603422b78538a94dfa884e34.jpg",
    ice: false,
  },
  {
    name: "Iced Latte",
    description: `Chilled milk over ice, capped with freshly shaken espresso.`,
    size: "Large",
    price: 4,
    image:
      "https://en.cocktail.fabbri1905.com/imgpub/1917906/0/0/iced-latte-400x400.jpg",
    ice: true,
  },
  {
    name: "Iced Latte",
    description: `Chilled milk over ice, capped with freshly shaken espresso.`,
    size: "Regular",
    price: 3,
    image:
      "https://en.cocktail.fabbri1905.com/imgpub/1917906/0/0/iced-latte-400x400.jpg",
    ice: true,
  },
  {
    name: "Iced Cappucino",
    description: `A bold and balanced coffee, made with freshly shaken espresso and topped with whipped milk foam.`,
    size: "Regular",
    price: 3,
    image:
      "https://media1.popsugar-assets.com/files/thumbor/cLu_93KWp9DUyyiiv08KlXOorac/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/29/539/n/42718227/eda9f6eb960c1f39_Iced_Cappuccino/i/Iced-Cappuccino.jpg",
    ice: true,
  },
  {
    name: "Iced Cappucino",
    description: `A bold and balanced coffee, made with freshly shaken espresso and topped with whipped milk foam.`,
    size: "Large",
    price: 4,
    image:
      "https://media1.popsugar-assets.com/files/thumbor/cLu_93KWp9DUyyiiv08KlXOorac/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2021/04/29/539/n/42718227/eda9f6eb960c1f39_Iced_Cappuccino/i/Iced-Cappuccino.jpg",
    ice: true,
  },
  {
    name: "Glace",
    description: `Coffee with ice-cream`,
    size: "Regular",
    price: 6,
    image:
      "https://img.freepik.com/free-photo/chocolate-coffee-glace-glass-concrete-surface-decorated-with-beans-cinnamon_219193-4558.jpg?size=626&ext=jpg",
    ice: true,
  },
  {
    name: "Glace",
    description: `Coffee with ice-cream`,
    size: "Large",
    price: 7,
    image:
      "https://img.freepik.com/free-photo/chocolate-coffee-glace-glass-concrete-surface-decorated-with-beans-cinnamon_219193-4558.jpg?size=626&ext=jpg",
    ice: true,
  },
  {
    name: "Iced Macchiato",
    description: `Espresso combined with vanilla-flavoured syrup, milk and caramel sauce over ice.`,
    size: "Regular",
    price: 4,
    image:
      "https://2.bp.blogspot.com/-7q5IHAl8pO4/XH7-8uT3aTI/AAAAAAAAW3Q/wITRN6vRWHcZwmYib64u_wqFRdWzCRQAACLcBGAs/s1600/StarbucksIcedCaramelCloudMacchiato.jpg",
    ice: true,
  },

  {
    name: "Iced Americano ",
    description: `Classic black coffee gently sweetened and served over ice.`,
    size: "Regular",
    price: 2,
    image:
      "https://d2aam04nmhpdf8.cloudfront.net/images/images/000/043/560/xlarge/25636_Bandit_Cold_Brew_Americano_Redeye.png?1612834363",
    ice: true,
  },
  {
    name: "Iced Americano ",
    description: `Classic black coffee gently sweetened and served over ice.`,
    size: "Large",
    price: 2.5,
    image:
      "https://d2aam04nmhpdf8.cloudfront.net/images/images/000/043/560/xlarge/25636_Bandit_Cold_Brew_Americano_Redeye.png?1612834363",
    ice: true,
  },
  {
    name: "Frappe",
    description: `Coffee meets milk and ice in a blender for a rumble and tumble topped with a swirl of whipped cream and together they create one of our original Frappuccino beverages.`,
    size: "Large",
    price: 4,
    image:
      "https://images.squarespace-cdn.com/content/v1/5d0bb2211fd72f00015380bb/1582750209026-EHDMHQY942OJ3XAFD2P8/_KRU9272.jpg?format=2500w",
    ice: true,
  },
  {
    name: "Frappe",
    description: `Coffee meets milk and ice in a blender for a rumble and tumble topped with a swirl of whipped cream and together they create one of our original Frappuccino beverages.`,
    size: "Regular",
    price: 3.5,
    image:
      "https://images.squarespace-cdn.com/content/v1/5d0bb2211fd72f00015380bb/1582750209026-EHDMHQY942OJ3XAFD2P8/_KRU9272.jpg?format=2500w",
    ice: true,
  },
  {
    name: "Freddo",
    description: `Involves blending a hot double shot of espresso with ice and sugar in a drink mixer, creating a signature foam.`,
    size: "Large",
    price: 3,
    image:
      "http://cdn.shopify.com/s/files/1/2502/9096/articles/60C37D3D-4442-481D-BCAE-F0C45FE492A6_1024x.jpg?v=1590687332",
    ice: true,
  },
  {
    name: "Freddo",
    description: `Involves blending a hot double shot of espresso with ice and sugar in a drink mixer, creating a signature foam.`,
    size: "Regular",
    price: 3.5,
    image:
      "http://cdn.shopify.com/s/files/1/2502/9096/articles/60C37D3D-4442-481D-BCAE-F0C45FE492A6_1024x.jpg?v=1590687332",
    ice: true,
  },
  {
    name: "Iced Mocha",
    description: `An indulgent iced coffee made with a delicious chocolate sauce freshly shaken with espresso and poured over iced cold milk for a caffeinated chocolate treat.`,
    size: "Large",
    price: 4,
    image:
      "https://www.pngkey.com/png/detail/302-3026277_rich-and-chocolatey-our-iced-mocha-brings-together.png",
    ice: true,
  },

  {
    name: "Iced Mocha",
    description: `An indulgent iced coffee made with a delicious chocolate sauce freshly shaken with espresso and poured over iced cold milk for a caffeinated chocolate treat.`,
    size: "Regular",
    price: 3,
    image:
      "https://www.pngkey.com/png/detail/302-3026277_rich-and-chocolatey-our-iced-mocha-brings-together.png",
    ice: true,
  },
];

const specialRequestList = [
  {
    type: "milk",
    Special_request: "Whole",
    price: 0,
  },
  {
    type: "milk",
    Special_request: "Skimmed",
    price: 0,
  },
  {
    type: "milk",
    Special_request: "Soya",
    price: 0,
  },
  {
    type: "milk",
    Special_request: "Oat",
    price: 0,
  },
  {
    type: "shot",
    Special_request: "Normal",
    price: 0,
  },
  {
    type: "shot",
    Special_request: "Double",
    price: 2,
  },
  {
    type: "shot",
    Special_request: "Triple",
    price: 3,
  },
  {
    type: "syrups",
    Special_request: "Caramel",
    price: 0.5,
  },
  {
    type: "syrups",
    Special_request: "Hazelnul",
    price: 0.5,
  },
  {
    type: "syrups",
    Special_request: "Vanilla",
    price: 0.5,
  },
  {
    type: "ice",
    Special_request: "Extra",
    price: 3,
  },
  {
    type: "ice",
    Special_request: "Less",
    price: 0,
  },
  {
    type: "ice",
    Special_request: "Normal",
    price: 0,
  },
];

const shopList = [
  {
    name: "Manchester",
    postcode: "M1 1AA",
    image:
      "https://th.bing.com/th/id/R.c7ea712ed99b0137f9852db177fa33ab?rik=0guWgEBv2%2f4dYQ&riu=http%3a%2f%2f2.bp.blogspot.com%2f-ZbWw9bUA7w8%2fUUEQkGVOXDI%2fAAAAAAAABw4%2fnLIbv3hnk3g%2fs1600%2fcoffee-shop-1.jpg&ehk=K1OWp%2fRQCiMh%2bt2DV%2fQsj9jbEx38vac%2bghClFxPhHMk%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "Birmingham",
    postcode: "B99 1AE",
    image:
      "https://th.bing.com/th/id/OIP.OV9eMlIOCN3Avha-Hg-wdgHaGC?w=215&h=180&c=7&o=5&pid=1.7",
  },
  {
    name: "Manchester",
    postcode: "M40 3AZ",
    image:
      "https://i.pinimg.com/736x/3b/2f/3f/3b2f3f762620d6374c62a4da71e49393.jpg",
  },
];

module.exports = {
  coffeeList,
  specialRequestList,
  shopList,
  buildUserList,
  buildTransactionsList,
};
