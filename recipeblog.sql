--schema for the recipe blog.

CREATE DATABASE recipeblog;

CREATE TABLE recipes (
    id serial primary key,
    name text,
    rating int CHECK (rating > 0 AND rating < 6),
    directions VARCHAR,
    ingredients VARCHAR
    img VARCHAR,
    submit_id int
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    title VARCHAR,
    comment VARCHAR,
    rating int,
    users_id int REFERENCES users(id),
    recipes_id int REFERENCES recipes(id)

);

CREATE TABLE users (
    id serial primary key,
    first_name text,
    last_name text,
    email VARCHAR,
    password VARCHAR
);

INSERT INTO recipes (name, rating, directions, ingredients) VALUES ('Best Marinara', 5, 'In a food processor place Italian tomatoes, tomato paste, chopped parsley, minced garlic, oregano, salt, and pepper. Blend until smooth.
In a large skillet over medium heat saute the finely chopped onion in olive oil for 2 minutes. Simmer for 30 minutes, stirring occasionally.',' 2 (14.5 ounce) cans stewed tomatoes, 1 (6 ounce) can tomato paste, 4 tablespoons chopped fresh parsley, 
2 clove garlic, minced 1 teaspoon dried oregano, 1 teaspoon salt, 1/4 teaspoon ground black pepper, 6 tablespoons olive oil, 1/3 cup finely diced onion or shallot, 1 tsp dried basil, chili flakes to taste');

INSERT INTO recipes (name, rating, directions, ingredients) VALUES ('Vegan Middle Eastern Meatballs', 4, 'Preheat the oven to 425 degrees, Add all the ingredients except the beef into a bowl and stir well, Add in the beef and stir until just combined, 
Form into 1/4 cup meatballs (I use an ice cream scoop) onto your cast iron skillet or sheet pan, Cook for 15-18 minutes or until cooked through.', '2 tablespoons fresh parsley chopped,
1 tablespoon fresh mint minced,
6 cloves garlic minced,
1 1/2 teaspoons kosher salt,
1/2 teaspoon ground black pepper,
2 tablespoons ground coriander,
2 teaspoons ground cumin,
1 1/2 teaspoons ground cinnamon,
1 teaspoon ground allspice,
1/2 teaspoon cayenne pepper,
1/4 teaspoon ground ginger,
2 pounds ground Beyond Beef,
1/3 cup grated onion');