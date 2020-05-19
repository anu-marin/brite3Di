const appMock = require('../app');
require('../index');

jest.mock('../app');

describe('index.ts app entry',() => {
  it('should call app.listen',  () => {
    expect(appMock.listen).toHaveBeenCalled();
  });
});