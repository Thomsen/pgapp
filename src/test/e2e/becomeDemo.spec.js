describe('Becoming ', function() {
  it('should boBe true', function() {
    expect(true).toBe(true);
  });

  it('should become ', function() {
    // var status = element(by.id('new-task'));
    // expect(status.getText()).toContain('task'); // fail
  });

  it('add project', function() {
    var c = element.all(by.repeater('projects')).count();
    expect(c).toEqual(1);
  });

  it('new task click', function() {
    element(by.id('new-task')).click();
  });

});
