
# tomato-fire-egg【番茄炒蛋】

> 这是一个egg框架项目的脚手架。可以方便的为你创建一个egg项目[开发中...],创建好项目后，你可以在`app/model/`文件夹下创建mongosee的文档模型，然后运行本脚手架响应的命令，脚手架会为你针对这个文档模型，创建增/删/改/查的CRUD通用代码(包含分页查询)，可以直接跑起来。

### 支持情况：

- 【√】init
- 【√】gen =>【√】mongodb；【ing..】sequelize

> 说明，截止2020-06-22 14:00，仅支持Mongodb数据库文档模型的controller和service生成。

### 全局安装

``` 
npm install tomato-fire-egg -g

```

## 使用：

### command

#### 1 - 初始化egg框架代码：

``` 
tomato-fire-egg init
``` 
输入项目名称，创建项目文件夹，并自动获取远程git基础代码。
> init 回来egg基础代码后，请确保数据库相关配置地址、账号密码是正确和有效的，或者，直接config/plugin.js文件下，禁用插件。[code](https://github.com/LeoFengFromChina/tomato-egg-basic.git)

- `app/config/config.default.js` :
``` 
//mongodb的配置，支持多连接配置 by LeoFeng 2020-5-21 13:48:53
  config.mongoose = {
    clients: {
      // clientId, access the client instance by app.mongooseDB.get('clientId')
      main: {
        url: 'mongodb://你的mongodb账号:你的mongodb密码@你的mongodb的ip:port/你的数据库名',
        options: {},
      },
    },
  };
  // MySQL, MariaDB, SQLite and Microsoft SQL Server数据库支持，by LeoFeng 2020-5-21 13:49:32
  config.sequelize = {
    dialect: 'mysql',
    host: '168.168.xx.xx',//你的数据库IP
    port: 3306,
    database: 'gac_egg_core',
    username: 'root',
    password: 'xxx',//你的数据库密码
    delegate: 'sequelizeModel', //挂载到app上的model名称，此配置后可以通过app.sequelizeModel访问
    baseDir: 'model/sequelize', //由于mongoose已占用了默认的model路径，所以新增一个sequelize文件夹来存储
  };
``` 
- `app/config/config.local.js`:
``` 
//redis配置 by LeoFeng 2020-5-25 10:38:30
  exports.redis = {
    client: {
      cluster: true,
      nodes: [
        {
          port: 8888,          // 你的端口
          host: '172.31.xx.xx',   // 你的ip
          password: null,
          db: 0,
          keyPrefix: 'gac-egg',
        },
        {
          port: 8888,          // Redis port
          host: '172.31.xx.xx',   // Redis host
          password: null,
          db: 0,
          keyPrefix: 'gac-egg',
        }
      ]
    },
  }
``` 
- `app/config/config.prod.js`:根据你的正式发布环境进行配置即可。

#### 2 - 生成mongodb对应CRUD的controller/service code:
``` 
tomato-fire-egg gen
``` 
或者
``` 
tomato-fire-egg g
``` 

## 详细步骤
- 初始化好egg框架代码、进入项目根目录(`project.json`所在目录);
- 在`app/model/`下创建你的文档模型(也就是表的model)；
- 执行`tomato-fire-egg g`命令，生成`controller`和`service`代码；
- 在路由上配置好路由所对应的`controller`方法
- `npm run dev`即可跑起来进行对文档的CRUD

## 引用参考
[commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

[inquirer](https://github.com/SBoudrias/Inquirer.js#readme)

[pascal-case](https://www.npmjs.com/package/pascal-case)

[download-git-repo](https://www.npmjs.com/package/download-git-repo)