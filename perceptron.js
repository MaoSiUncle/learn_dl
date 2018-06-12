function Perceptron(input_num, activator) {
  //js 版本感知器
  var self = {};
  self.init = function init(input_num, activator) {
    self.activator = activator;
    var arr = new Array(input_num);
    arr.fill(0.0);
    self.weights = arr;
    self.bias = 0.0;
  };
  self.predict = function predict(input_vec) {
    // 输入向量， 输出感知器的计算结果
    var weights = self.weights;
    if (input_vec.length != weights.length) {
      return {
        msg: "error no match length"
      }
    }

    var r = 0;
    for (var i = 0; i < weights.length; i++) {
      r += weights[i] * input_vec[i];
    }
    r += self.bias;
    return self.activator(r);
  }

  self.train = function train(input_vecs, labels, iteration, rate) {
    //输入训练数据:一组向量 与每个向量对应的label,及训练轮数，学习率
    for (var i = 0; i < iteration; i++) {
      this._one_iteration(input_vecs, labels, rate);
    }
  }

  function zip(arr1, arr2) {
    var r = [];
    for (var i = 0; i < arr1.length; i++) {
      var o = {};
      var k = JSON.stringify(arr1[i]);
      o[k] = arr2[i];
      r.push(o)
    }
    return r;
  }

  self._one_iteration = function (input_vecs, labels, rate) {
    var samples = zip(input_vecs, labels);
    console.log(samples);
    samples.forEach((item) => {
      for (var key in item) {
        var input_vec = JSON.parse(key);
        var label = item[key];
        var output = self.predict(input_vec);
        self._update_weights(input_vec, output, label, rate)
      }
    })
  };
  self._update_weights = function (input_vec, output, label, rate) {
    var delta = label - output;// 感知器值 减去 输出值  速率*
    self.weights = self.weights.map((w, i) => {
      // input_vec[i]对应输入值
      return w + rate * delta * input_vec[i];
    });
    self.bias += rate * delta;
  };
  self.init(input_num, activator);
  return self;
}

//激活函数
function f(x) {
  return x > 0 ? 1 : 0;
}

function train_and_perceptron() {
  var input_vecs = [[1,1], [0,0], [1,0], [0,1]];// 训练数据集合
  var labels = [1, 0, 0, 0];
  var p = Perceptron(2,f);
  p.train(input_vecs, labels,10, 0.1);
  return p;
}

var p = train_and_perceptron();
console.log(p);
