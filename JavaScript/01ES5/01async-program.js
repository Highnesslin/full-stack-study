// JavaScript异步编程的四种方式
// "同步模式": 后一个任务等待前一个任务结束，然后再执行，程序的执行顺序与任务的排列顺序是一致的、同步的
// "异步模式": 每一个任务有一个或多个回调函数，前一个任务结束后，不是执行后一个任务，而是执行回调函数，后一个任务则是不等前一个任务结束就执行，所以程序的执行顺序与任务的排列顺序是不一致的

// 1. 回调函数
function f1(cb) {
    setTimeout(function () {
        // f1的任务代码
        cb()
    }, 1000)
}
f1(f2)
// 优点: 简单、容易理解和部署
// 缺点: 不利于代码的阅读和维护，各个部分之间高度耦合，而且每个任务只能指定一个回调函数。

// 2. 事件监听[事件驱动模式]
// jQuery写法
function f3() {
    setTimeout(function () {
        // f3的执行代码
        // f3的代码执行完成后，立即触发done事件，从而开始执行f4
        f3.trigger('f3done')
    }, 1000)
}
f3.on('f3done', f4)
// 优点: 可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"，有利于实现模块化
// 缺点: 是整个程序都要变成事件驱动型，运行流程会变得很不清晰

// 3. 发布/订阅模式[观察者模式]
// 方法2的"事件"，完全可以理解成"信号".我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，
// 其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"，又称"观察者模式"
// jQuery写法
function f5() {
    setTimeout(function () {
        // f5的执行代码
        // f5执行完成后，向"信号中心"jQuery发布"done"信号，从而引发f6的执行
        jQuery.publish("f5done")
    })
}
jQuery.subscribe('f5done', f6)
// 优点: 这种方法的性质与"事件监听"类似，但是明显优于后者。因为我们可以通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行
// 缺点: 本质上是回调写法,某些场景下可能造成回调地狱

// 4. Promise
// jQuery写法
function f7() {
    var dfd = $.Deferred();
    setTimeout(function () {
        // f7的任务代码
        dfd.resolve();
    }, 1000);
    return dfd.promise;
}
f7().then(f8)
// 优点: 回调函数变成了链式写法，程序的流程可以看得很清楚
// 缺点: 编写和理解，相对比较难
