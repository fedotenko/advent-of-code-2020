const solution = (filename) => {
  let res1 = null;
  let res2 = null;

  const fs = require("fs");
  const input = fs.readFileSync(__dirname + "/" + filename, {
    encoding: "utf8",
  });

  const foodsRaw = input.split("\n");
  const foods = [];
  let ingredientsHeap = [];
  let allergens = [];
  for (let foodRaw of foodsRaw) {
    const [ingredientsString, allergensString] = foodRaw.split(" (");
    const foodIngredients = ingredientsString.split(" ");
    const foodAllergens = allergensString
      .substring(9, allergensString.length - 1)
      .split(", ");

    foods.push({
      ingredients: foodIngredients,
      allergens: foodAllergens,
    });
    allergens.push(...foodAllergens);
    ingredientsHeap.push(...foodIngredients);
  }
  allergens = [...new Set(allergens)];

  const intersection = (a, b) => {
    return a.filter((value) => b.includes(value));
  };

  const allergenToIngredients = {};
  for (let allergen of allergens) {
    let commonIngredients;
    for (let food of foods) {
      if (!food.allergens.includes(allergen)) {
        continue;
      }
      if (!commonIngredients) {
        commonIngredients = food.ingredients;
      } else {
        commonIngredients = intersection(food.ingredients, commonIngredients);
      }
    }
    allergenToIngredients[allergen] = commonIngredients;
  }

  const relation = {};
  while (true) {
    const definedAllergen = Object.keys(allergenToIngredients).find(
      (alg) => allergenToIngredients[alg].length === 1
    );
    if (!definedAllergen) {
      break;
    }
    const ingredient = allergenToIngredients[definedAllergen][0];
    relation[definedAllergen] = ingredient;
    for (let allergen of Object.keys(allergenToIngredients)) {
      allergenToIngredients[allergen] = allergenToIngredients[allergen].filter(
        (ing) => ing !== ingredient
      );
    }
  }

  const sortedAllergens = Object.keys(relation).sort();
  const dangeriusIngredients = [];
  for (let allergen of sortedAllergens) {
    dangeriusIngredients.push(relation[allergen]);
  }

  res1 = ingredientsHeap.filter((ing) => !dangeriusIngredients.includes(ing))
    .length;
  res2 = dangeriusIngredients.join(",");

  return [res1, res2];
};

const [test1, test2] = solution("test1.txt");
console.log(test1, test1 === 5);
console.log(test2, test2 === "mxmxvkd,sqjhc,fvjkl");

const [res1, res2] = solution("input.txt");
console.log(res1, res2);
