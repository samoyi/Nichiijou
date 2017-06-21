# 检测全局变量

## 检测范围：
* **用`var`声明**的全局变量
* 全局作用域下声明的函数

## 逻辑说明：
1. 先记录window对象自带的属性和方法
2. 再检测项目中`window`对象所有的属性和方法
3. 因为全局作用域下声明的函数和以`var`声明的变量也会成为`window`对象的方法和属性，将两次记录的属性和方法进行比较就可以得出结果

## 使用方法
1. 先在浏览器中运行`recordBuiltInGlobalVariables.php`，将`window`对象自身和原型中本身就有的属性记录在生成的`BuiltInGlobalVariables.json`文件中
2. 在项目JS代码的最后，引入`checkGlobalVariables.js`文件或执行内部其代码，会加载之前生成JSON文件，把里面的属性方法与当前项目`window`对象的属性和方法进行对比，在console中输出自定义的。
