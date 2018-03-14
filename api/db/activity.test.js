const tap = require('tap');
const sinon = require('sinon');

const activity = require('./activity')();

tap.test('activity data model', async activityModelTests => {
  activityModelTests.test('setup', async setupTests => {
    setupTests.match(
      activity,
      {
        apdActivity: { tableName: 'activities' },
        apdActivityGoal: { tableName: 'activity_goals' },
        apdActivityGoalObjective: { tableName: 'activity_goal_objectives' }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      activity.apdActivity.apd,
      'function',
      'creates a apd relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivity.goals,
      'function',
      'creates a goals relationship for the activity model'
    );

    setupTests.type(
      activity.apdActivityGoal.activity,
      'function',
      'creates a activity relationship for the goal model'
    );

    setupTests.type(
      activity.apdActivityGoal.objectives,
      'function',
      'creates a objectives relationship for the goal model'
    );

    setupTests.type(
      activity.apdActivityGoalObjective.goal,
      'function',
      'creates a goal relationship for the objective model'
    );
  });

  activityModelTests.test(
    'activity model sets up apd relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = activity.apdActivity.apd.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apd'),
        'sets up the relationship mapping to a apd'
      );
      apdTests.equal(output, 'baz', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'activity model sets up goals relationship',
    async apdTests => {
      const self = {
        hasMany: sinon.stub().returns('bag')
      };

      const output = activity.apdActivity.goals.bind(self)();

      apdTests.ok(
        self.hasMany.calledWith('apdActivityGoal'),
        'sets up the relationship mapping to goal'
      );
      apdTests.equal(output, 'bag', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'activity model sets up goals relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('frood')
      };

      const output = activity.apdActivityGoal.activity.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to activity'
      );
      apdTests.equal(output, 'frood', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'activity model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon.stub(),
        related: sinon
          .stub()
          .withArgs('goals')
          .returns('goooooaaaaals')
      };
      self.get.withArgs('id').returns('eye-dee');
      self.get.withArgs('name').returns('Jerome Lee');
      self.get.withArgs('description').returns('cool CMS person');

      const output = activity.apdActivity.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          id: 'eye-dee',
          name: 'Jerome Lee',
          description: 'cool CMS person',
          goals: 'goooooaaaaals'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'goal model sets up objectives relationship',
    async apdTests => {
      const self = {
        hasMany: sinon.stub().returns('flippity')
      };

      const output = activity.apdActivityGoal.objectives.bind(self)();

      apdTests.ok(
        self.hasMany.calledWith('apdActivityGoalObjective'),
        'sets up the relationship mapping to objectives'
      );
      apdTests.equal(output, 'flippity', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'activity goal model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon
          .stub()
          .withArgs('description')
          .returns('to eat a whole bucket of ice cream in one sitting'),
        related: sinon
          .stub()
          .withArgs('objectives')
          .returns('twenty-seven')
      };

      const output = activity.apdActivityGoal.toJSON.bind(self)();

      apdTests.match(
        output,
        {
          description: 'to eat a whole bucket of ice cream in one sitting',
          objectives: 'twenty-seven'
        },
        'gives us back the right JSON-ified object'
      );
    }
  );

  activityModelTests.test(
    'objective model sets up goal relationship',
    async apdTests => {
      const self = {
        belongsTo: sinon.stub().returns('floppity')
      };

      const output = activity.apdActivityGoalObjective.goal.bind(self)();

      apdTests.ok(
        self.belongsTo.calledWith('apdActivityGoal'),
        'sets up the relationship mapping to goal'
      );
      apdTests.equal(output, 'floppity', 'returns the expected value');
    }
  );

  activityModelTests.test(
    'activity objective model overrides toJSON method',
    async apdTests => {
      const self = {
        get: sinon
          .stub()
          .withArgs('description')
          .returns('solar flares are deadly')
      };

      const output = activity.apdActivityGoalObjective.toJSON.bind(self)();

      apdTests.equal(
        output,
        'solar flares are deadly',
        'gives us back the right JSON-ified object'
      );
    }
  );
});