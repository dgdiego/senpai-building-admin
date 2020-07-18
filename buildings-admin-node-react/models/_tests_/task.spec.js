const Task = require('../task');

describe('Task Test Suite', () => {
    it('Suma Test Case', () => {
      // Given
      const a =  1;
      const b = 1;
      // When 
      const result = Task.suma(a, b);
      // Then
      expect(2).toEqual(result);
    });
});