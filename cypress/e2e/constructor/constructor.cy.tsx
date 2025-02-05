describe('Страница конструктора булки', () => {
    // npm run cypress:open
    // id инградиентов для поиска
    const ids = ['643d69a5c3f7b9001cfa093d' // "Флюоресцентная булка R2-D3"
                ,'643d69a5c3f7b9001cfa0940' // "Говяжий метеорит (отбивная)"
                ,'643d69a5c3f7b9001cfa0942' // "Соус Spicy-X"
                ];

    beforeEach(() => {
       // установили размер экрана
       cy.viewport(1250, 1150);
       // сервис должен быть доступен по адресу localhost:4000
       //cy.visit('http://localhost:4000/login'); 
       //cy.get(`[type=submit`).click(); 
       //
       /*
       cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' }).as('createLogin');
       //
       cy.get(`[type=submit`).click(); 
       //
       cy.wait('@createLogin').then(({response}) => {
        expect(response.statusCode).to.eq(200)
        //expect(response.user.name).to.eq('Николаев Роман Борисович')
       });
*/
       // перехват getIngredientsApi
       cy.intercept('api/ingredients', { fixture: 'ingredients.json' } );
       // сервис должен быть доступен по адресу localhost:4000
       cy.visit('http://localhost:4000'); 
    });

    it('инградиент ищем, открываем, закрываем', () => {
        const sliceIds = ids.filter((id, position) => position === 0);
        sliceIds.forEach((id) => {
           // ищем инградиеет
           const ingredient = cy.get(`[data-cy="ingredient.id=${id}"]`); 
           // открываем инградиент
           ingredient.click();
           // ждем 2 секунды
           cy.wait(1000);
           // ищем кнопку закрытия
           const buttonClose = cy.get(`[data-cy="buttonClose"]`);
           // кликаем на кнопку закрытия
           buttonClose.click();
           //
           
        });
    });

    it('инградиент ищем, добавляем, оформляем заказ', () => {
        // ищем инградиенты и нажимаем кнопку добавить
        ids.forEach((id) => {
           const bread = cy.get(`[data-cy="ingredient.id=${id}"]`).find('button'); 
           bread.contains('Добавить');
           bread.click();
        });
/*
        // находим в DOM дереве кнопку с атрибутом data-cy=1
        const button = cy.get(`[data-cy="buttonOrder"]`);
        button.contains('Оформить заказ');
        button.click();
*/
    });
});
