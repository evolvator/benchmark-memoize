var utils = require('./utils.js');
var _ = require('lodash');

var n1 = utils.n1;
var n2 = utils.n2;
var n3 = utils.n3;
var n4 = utils.n4;
var s1 = utils.s1;
var s2 = utils.s2;
var s3 = utils.s3;
var s4 = utils.s4;
var o1 = utils.o1;
var o2 = utils.o2;
var a1 = utils.a1;
var a2 = utils.a2;
var m1 = utils.m1;
var m2 = utils.m2;

module.exports = function(suite) {
  var arithmetic = ['+', '-', '*', '/', '%'];
  var ment = ['++', '--'];
  var comparasion = ['<', '<=', '>', '>=', '==', '===', '!=', '!=='];
  var assignment = ['+=', '-=', '*=', '/=', '%='];

  var arithmeticSuite = function(a, b, arithmetic) {
    eval(
      `suite.add('${utils.f(a)} ${arithmetic} ${utils.f(
        b
      )}', function() { a ${arithmetic} b });`
    );
  };
  for (var a in arithmetic) {
    arithmeticSuite(n1, n1, arithmetic[a]);
    arithmeticSuite(n3, n4, arithmetic[a]);
    arithmeticSuite(s1, s2, arithmetic[a]);
    arithmeticSuite(s3, s4, arithmetic[a]);
  }

  var prefixSuite = function(a, ment) {
    var temp = a;
    eval(`suite.add('${ment}${a}', function() { ${ment}temp });`);
  };
  var postfixSuite = function(a, ment) {
    var temp = a;
    eval(`suite.add('${a}${ment}', function() { temp${ment} });`);
  };
  for (var a in ment) {
    prefixSuite(n1, ment[a]);
    postfixSuite(n1, ment[a]);
    prefixSuite(n3, ment[a]);
    postfixSuite(n3, ment[a]);
  }

  var comparasionSuite = function(a, b, comparasion) {
    eval(
      `suite.add('${utils.f(a)} ${comparasion} ${utils.f(
        b
      )}', function() { a ${comparasion} b });`
    );
  };
  for (var a in comparasion) {
    comparasionSuite(n1, n2, comparasion[a]);
    comparasionSuite(n3, n4, comparasion[a]);
    comparasionSuite(s1, s2, comparasion[a]);
    comparasionSuite(s3, s4, comparasion[a]);
    comparasionSuite(n3, s3, comparasion[a]);
  }

  var temp;

  temp = n1;
  suite.add(`${utils.f(n1)} += ${utils.f(n2)}`, function() {
    temp += n2;
  });
  temp = n3;
  suite.add(`${utils.f(n3)} += ${utils.f(n4)}`, function() {
    temp += n4;
  });
  temp = s1;
  suite.add(`${utils.f(s1)} += ${utils.f(s2)}`, function() {
    temp += s2;
  });

  temp = n1;
  suite.add(`${utils.f(n1)} -= ${utils.f(n2)}`, function() {
    temp -= n2;
  });
  temp = n3;
  suite.add(`${utils.f(n3)} -= ${utils.f(n4)}`, function() {
    temp -= n4;
  });

  temp = n1;
  suite.add(`${utils.f(n1)} *= ${utils.f(n2)}`, function() {
    temp *= n2;
  });
  temp = n3;
  suite.add(`${utils.f(n3)} *= ${utils.f(n4)}`, function() {
    temp *= n4;
  });

  temp = n1;
  suite.add(`${utils.f(n1)} /= ${utils.f(n2)}`, function() {
    temp /= n2;
  });
  temp = n3;
  suite.add(`${utils.f(n3)} /= ${utils.f(n4)}`, function() {
    temp /= n4;
  });

  temp = n1;
  suite.add(`${utils.f(n1)} %= ${utils.f(n2)}`, function() {
    temp %= n2;
  });
  temp = n3;
  suite.add(`${utils.f(n3)} %= ${utils.f(n4)}`, function() {
    temp %= n4;
  });
  
  var _i = 1;
  suite.add('i=i+1', function() {
    _i=_i+1;
  });
  var _i = 1;
  suite.add('i=i-1', function() {
    _i=_i-1;
  });

  suite.add('map (1) get 0', function() {
    m1.get(0);
  });
  suite.add('map (1024) get 0', function() {
    m2.get(0);
  });

  suite.add('map (1) set 1', function() {
    m1.set(1, 1);
  });
  suite.add('map (1024) set "test"', function() {
    m2.set(512, 'test');
  });

  suite.add('object (1) get ._0', function() {
    o1._0;
  });
  suite.add('object (1) get ["_0"]', function() {
    o1['_0'];
  });

  temp = {
    _a: 123,
    get a() { return this._a; }
  };
  suite.add({
    name: 'object (1) getter',
    onCycle: function() {
      temp = {
        _a: 123,
        get a() { return this._a; }
      };
    },
    fn: function() {
      temp.a;
    }
  });

  temp = {
    _a: 123,
    set a(value) { this._a = value; }
  };
  suite.add({
    name: 'object (1) setter',
    onCycle: function() {
      temp = {
        _a: 123,
        set a(value) { this._a = value; }
      };
    },
    fn: function() {
      temp.a = 234;
    }
  });

  suite.add('object (1024) get ._543', function() {
    o2._543;
  });
  suite.add('object (1024) get ["_543"]', function() {
    o2['_543'];
  });

  suite.add('array (1) get [0]', function() {
    a1[0];
  });
  suite.add('array (1024) get [543]', function() {
    a2[543];
  });

  suite.add('array (1) get [0]', function() {
    a1[0] = 'test';
  });
  suite.add('array (1024) get [543]', function() {
    a2[543] = 'test';
  });

  suite.add('array (1) set [length - 1]', function() {
    a1[a1.length - 1] = "test";
  });
  suite.add('array (1024) set [length - 1]', function() {
    a2[a2.length - 1] = "test";
  });
  
  var _a1 = _.clone(a1);
  suite.add({
    name: 'array (1) push',
    onCycle: function() {
      _a1 = _.clone(a1);
    },
    fn: function() {
      a1.push("test");
    }
  });
  
  var _a2 = _.clone(a2);
  suite.add({
    name: 'array (1024) push',
    onCycle: function() {
      _a2 = _.clone(a2);
    },
    fn: function() {
      a2.push("test");
    }
  });
  
  suite.add('array (1) set [0]', function() {
    a1[0] = 'test';
  });
  suite.add('array (1024) set [512]', function() {
    a2[512] = 'test';
  });

  suite.add('!true', function() {
    !true;
  });
  suite.add(`!${n3}`, function() {
    !n3;
  });
  suite.add('!string (1024)', function() {
    !s3;
  });
  suite.add('!object (1024)', function() {
    !o2;
  });
  suite.add('!array (1024)', function() {
    !a2;
  });

  (function() {
    var x = {};
    suite.add({
      name: 'a.b = null',
      onCycle: function() {
        x.y = 123;
      },
      fn: function() {
        a.b = null;
      }
    });
  })();

  (function() {
    var x = {};
    suite.add({
      name: 'delete a.b',
      onCycle: function() {
        x.y = 123;
      },
      fn: function() {
        delete a.b;
      }
    });
  })();
};
