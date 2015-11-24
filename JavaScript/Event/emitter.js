// 事件发射器
function emitter(thing) {
  // 存储所有事件名
  var events = {};
  
  // 如果没有提供对象，则创建一个
  if (!thing) {
    thing = {};
  }

  // 把事件监听器依附到现有或新建的事件类型上
  thing.on = function(type, listener) {

    if (!events[type]) {
      events[type] = [listener];
    } else {
      events[type].push(listener);
    }
  };

  thing.emit = function(type) {
    var evt = events[type];

    if (!evt) return;

    var args = Array.prototype.slice.call(arguments, 1);

    for (var i=0; i<evt.length; i++) {
      evt[i].apply(thing, args);
    }
  };

  return thing;
}

var thing = emitter();

thing.on('change', function() {

  console.log('thing changed!');

});

thing.on('change', function() {

  console.log('thing changed again!');

});

setTimeout(function() {
  thing.emit('change');
}, 1000);

