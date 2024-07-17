module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Recepts',
      [
        {
          title: 'Борщ',
          ingredients: 'Свекла, капуста, картофель, морковь',
          quantityOfIngredients: 4,
          time: 30,
          description: 'Всё просто',
        },
        {
          title: 'Салат',
          ingredients: 'Огурец, помидор, авокадо, зелень, лук',
          quantityOfIngredients: 5,
          time: 15,
          description: 'Всё просто',
        },
        {
          title: 'Курица',
          ingredients: 'Голень, соль, приправы',
          quantityOfIngredients: 3,
          time: 60,
          description: 'Всё просто',
        },
        {
          title: 'Пирог',
          ingredients: 'Мука, сахар, яйца, вода, яблоки',
          quantityOfIngredients: 5,
          time: 70,
          description: 'Всё просто',
        },
        
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Recepts', null, {});
  },
};

