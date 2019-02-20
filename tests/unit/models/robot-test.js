import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Robot from 'robot/models/robot';

module('Unit | Model | robot', function(hooks) {
  setupTest(hooks);

  test('it instantiates with no home', function(assert) {
    let robot = new Robot();

    assert.equal(robot.report(), 'undefined,undefined,undefined');
  });

  test('it can be placed on the table', function(assert) {
    let robot = new Robot();

    robot.place(0, 0, 'east');

    assert.equal(robot.report(), '0,0,EAST');
  });

  test("it can't be placed on an invalid spot on the table", function(assert) {
    let robot = new Robot();

    robot.place(13, 0, 'hello');

    assert.equal(robot.report(), 'undefined,undefined,undefined');
  });

  test('can move', function(assert) {
    let robot = new Robot();

    robot.place(0, 0, 'east');

    robot.move();

    assert.equal(robot.report(), '1,0,EAST');
  });

  test("it can't move beyond the table", function(assert) {
    let robot = new Robot();

    robot.place(4, 4, 'east');

    robot.move();

    assert.equal(robot.report(), '4,4,EAST');
  });

  test('it ignores commands when not on the table', function(assert) {
    let robot = new Robot();

    robot.move();
    robot.right();
    robot.left();

    assert.equal(robot.report(), 'undefined,undefined,undefined');
  });

  test('it ignores invalid commands', function(assert) {
    let robot = new Robot();

    robot.place(2, 2, 'east');

    robot.command('hello!')

    assert.equal(robot.report(), '2,2,EAST');
  });

  test('it follows valid commands', function(assert) {
    let robot = new Robot();

    robot.command('place 2,2,east');
    robot.command('left');
    robot.command('left');
    robot.command('move');
    robot.command('left');
    robot.command('left');
    robot.command('right');

    assert.equal(robot.report(), '1,2,SOUTH');
  });
});
