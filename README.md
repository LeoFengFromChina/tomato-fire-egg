
# tomato-fire-egg【番茄炒蛋】

> 这是一个egg框架项目的脚手架。可以方便的为你创建一个egg项目[开发中...],创建好项目后，你可以在`app/model/`文件夹下创建mongosee的文档模型，然后运行本脚手架响应的命令，脚手架会为你针对这个文档模型，创建增/删/改/查的CRUD通用代码(包含分页查询)，可以直接跑起来。

### 支持情况：

- 【√】mongodb
- 【ing..】sequelize
- 【ing..】init

> 说明，截止2020-06-22 14:00，仅支持Mongodb数据库文档模型的controller和service生成。

### 全局安装

``` 
npm install tomato-fire-egg -g

```

## 使用：

### command

#### 1 - 初始化egg框架代码【开发中...】：

``` 
tomato-fire-egg init
``` 

#### 2 - 生成mongodb对应CRUD的controller/service code:
``` 
tomato-fire-egg gen
``` 
或者
``` 
tomato-fire-egg g
``` 

## 详细步骤
- 初始化好egg框架代码、进入项目根目录(project.json所在目录);
- 在`app/model/`下创建你的文档模型(也就是表的model)；
- 执行`tomato-fire-egg g`命令，生成`controller`和`service`代码；
- 在路由上配置好路由所对应的`controller`方法
- `npm run dev`即可跑起来进行对文档的CRUD

## 引用参考
[commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

[inquirer](https://github.com/SBoudrias/Inquirer.js#readme)

[pascal-case](https://www.npmjs.com/package/pascal-case)