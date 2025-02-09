describe('Страница конструктора булки', () => {
  // id инградиентов для поиска
  const ingredients = [
    {
      id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3'
    },
    {
      id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)'
    },
    {
      id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X'
    }
  ];

  //
  const email: string = 'romancompany@mail.ru';
  const password: string = 'ctrhtn';
  const orderNumber = '67719';

  it('инградиент ищем, открываем, закрываем', () => {
    // логинимся
    cy.prepare(email, password);
    //const sliceIngredients = ingredients;
    const sliceIngredients = ingredients.filter(
      (ingredient, position) => position === 0
    );

    sliceIngredients.forEach((ingredient) => {
      // находим инградиент и кликаем для просмотра детализации
      cy.get(`[data-cy="ingredient.id-${ingredient.id}"]`).click();
      // ждем
      cy.wait(200);
      // выдать ошибку если модальное окно закрыто
      cy.raiseModalClose();
      // проверяем наименование инградиента в детализации
      cy.get(`[data-cy=ingredient_name]`).contains(ingredient.name);
      // закрываем детализацию по кнопке
      cy.get(`[data-cy=buttonClose]`).click();
      // выдать ошибку если модальное окно открыто
      cy.raiseModalOpen();
    });
    // чистим токены
    cy.free();
  });

  it('инградиент ищем, добавляем, оформляем заказ', () => {
    // логинимся
    cy.prepare(email, password);
    // ищем инградиенты и нажимаем кнопку добавить
    ingredients.forEach((ingredient) => {
      cy.get(`[data-cy="ingredient.id-${ingredient.id}"]`)
        .find('button')
        .contains('Добавить')
        .click();
    });

    // делаем заказ
    cy.get(`[data-cy=buttonOrder]`).contains('Оформить заказ').click();
    // ожидаем
    cy.wait('@postOrder').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
    });
    // data-cy="orderNumber"
    cy.get(`[data-cy=orderNumber]`).contains(orderNumber);
    // закрываем детализацию по кнопке
    cy.get(`[data-cy=buttonClose]`).click();
    // выдать ошибку если модальное окно открыто
    cy.raiseModalOpen();

    // Выберите булки
    cy.get(`[data-cy=constructorelement]`).contains('Выберите булки');
    // Выберите начинку
    cy.get(`[data-cy=constructorelement]`).contains('Выберите начинку');
    // чистим токены
    cy.free();
  });
});
