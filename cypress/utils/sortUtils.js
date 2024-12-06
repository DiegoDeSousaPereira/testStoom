export function validateSortOrderBySelector(selector, order = 'asc', isNumeric = false) {
    cy.get(selector).then(($elements) => {
        const values = [...$elements].map(el => 
            isNumeric ? parseFloat(el.innerText.replace('$', '')) : el.innerText
        );

        const sortedValues = [...values].sort((a, b) => {
            if (isNumeric) {
                return order === 'asc' ? a - b : b - a;
            }
            return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
        });

        expect(values).to.deep.equal(sortedValues);
    });
}
