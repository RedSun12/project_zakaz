module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Recepts',
      [
        {
          idAPI: 123456,
          title: 'Борщ',
          ingredients: 'Свекла, капуста, картофель, морковь',
          quantityOfIngredients: 4,
          time: 30,
          description: 'Всё просто',
        },
        {
          idAPI: 235648,
          title: 'Салат',
          ingredients: 'Огурец, помидор, авокадо, зелень, лук',
          quantityOfIngredients: 5,
          time: 15,
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

