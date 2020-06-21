
# tomato-fire-egg【番茄炒蛋】

> 这是一个egg框架项目的脚手架。可以方便的为你创建一个egg项目。创建好项目后，你可以在`app/model/`文件夹下创建mongosee的文档模型，然后运行本脚手架响应的命令，脚手架会为你针对这个文档模型，创建增/删/改/查的CRUD通用代码(包含分页查询)，可以直接跑起来。

### install：

``` 
npm install tomato-fire-egg -g

```

## Usage：

### command
``` 
tomato-fire-egg
``` 


## 步骤
- 初始化好egg框架代码;
- 在`app/model/`下创建你的文档模型(也就是表的model)；
- 执行`tomato-fire-egg`命令，生成`controller`和`service`代码；
- 在路由上配置好路由所对应的controller方法
- npm run dev即可跑起来进行对文档的CRUD