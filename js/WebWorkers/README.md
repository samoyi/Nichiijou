# 测试说明

* 测试时间： 2017.5
* 测试浏览器：最新的Chrome和FF

## 测试中发现的问题
* #### 计算速度的差异（出现过，但并不总出现）
  1. 用`onmessage`方法的`SharedWorker`，不确定怎么情况下，有时会出现worker线程的计算速度会变慢。
  2. 但用`addEventListener()`的情况下，并不会变慢。
  3. 在进行`Fibonacci(45)`的计算时，直接计算、通过`dedicated worker`以及`addEventListener()`方法的`SharedWorker`计算，都是20秒左右的时间。但如果是通过`onmessage`方法的`SharedWorker`计算，不管有没有其他的脚本在计算过程中发起共享调用，计算时间都是28秒左右。
* #### 单线程与多线程（出现过，但并不总出现）
 1. 用`onmessage`方法的`SharedWorker`，不确定在什么情况下，有时worker是单线程的。
 2. 即通过`postMessage()`调用worker进行计算时，如果之前其他对象也通过`postMessage()`调用了worker且计算尚未完成，则本次调用的计算要等到上一次计算完成之后才能开始。
 3. 但如果是`addEventListener()`方法的`SharedWorker`，则是同时进行计算。
* #### 缓存问题
在Chrome中测试时，通过`SharedWorker`引入worker脚本时有明显的类似于缓存的情况，如果给url后面加上随机变化的参数则可以避免。
* #### 错误处理问题
在Chrome中测试时，通过`SharedWorker`引入的worker脚本中有错误时，浏览器不会报错，主线程的`onerror`事件也无效，只是静默失败。FF中浏览器也不会报错，但主线程的`onerror`事件可以正常响应错误。
