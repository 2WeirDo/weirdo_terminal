# Weirdo-terminal



## 简介

Weirdo-terminal 是一个好看又好玩的 web 终端, 用户可以在单页面通过输入命令快速进行操作, 开发者可以灵活定制新命令。

> 比如请求知乎热榜信息 
>
> ```
> 输入 hot zhihu
> ```

![image-20231210182401750](https://weirdo-blog.oss-cn-chengdu.aliyuncs.com/blog/202312101824100.png)

> 比如更换主题色
>
> ```
> 输入 theme
> ```

![image-20231210182518520](https://weirdo-blog.oss-cn-chengdu.aliyuncs.com/blog/202312101825860.png)



> 比如请求gpt服务
>
> ```
> 输入 gpt
> ```

![image-20231210182842178](https://weirdo-blog.oss-cn-chengdu.aliyuncs.com/blog/202312101828510.png)





## 功能和特性

- 命令历史记录、快速执行历史命令
- 快捷键
- 命令输入提示
- Tab 键补全命令
- 多种格式输出
- 内置 5 种输出状态
- 命令折叠 / 展开
- 帮助手册自动生成
- 自定义配置（比如更换背景、提示开关等）
- 支持子命令



> 已支持命令

- date 日期
- shortcut 查看快捷键
- goto 网页快速跳转
- help 查看帮助
- clear 清屏
- ikun 小黑子狂欢
- todo 待办事项
- copy 复制文本
- moyu 一些小游戏
- history 查看执行历史
- hint 是否输入提示
- reset 重置终端配置
- welcome 自定义终端欢迎语
- fanyi 翻译
- music 网易云音乐
- weather 今日天气
- dujitang 一句毒鸡汤
- inspire 励志句子
- film 豆瓣热门电影信息
- love 一句情话
- background 更换背景图片
- varbook 变量命名助手
- 搜索引擎, 比如
  - baidu
  - google
  - juejin
  - ...
- user 用户相关命令, 比如
  - user login
  - user register
  - user logout
- hot 资讯热榜前10位, 比如:
  - hot zhihu
  - hot weibo
  - ...
- 空间管理, 似网站收藏夹
  - add
  - remove
  - show
  - list
  - mkdir
  - cd
  - move
  - copy
- analyze 网站技术分析
  - analyze baidu.com
  - analyze 书签名称

- theme 变换主题
  - theme low
  - theme mid
  - theme high
- gpt chatGPT 3.5



> 具体的使用就请小伙伴们自行摸索啦~~~



## 技术栈

### 前端

主要技术：

- Vue 3
- Vite 4
- Ant Design Vue 3 组件库
- Pinia 2 状态管理
- TypeScript 类型控制
- Eslint 代码规范控制
- Prettier 美化代码

依赖库：

- axios: 网络请求
- dayjs: 时间处理
- lodash: 工具库
- getopts: 命令参数解析
- marked: 内容格式化
- chatgpt: 官方 ChatGPT API 的 Nodejs 包




### 后端

主要技术：

- Node.js
- Express、express-session
- MySQL
- Sequelize（ORM 框架）
- Redis
- chatgpt

依赖库：

- Axios
- NeteaseCloudMusicApi
- md5

依赖服务：

- 百度翻译 API
- 背景图片 搏天API
- 摸鱼命令的实现依赖于 https://haiyong.site/moyu 
- 网站技术分析命令的实现依赖于 https://api.asilu.com/
- 其余大部分接口依赖于 韩小韩API



## 目录结构

- public: 公共静态资源 (.ico图标)
- testgpt: gpt服务测试文件
- src 
  - assets 静态资源
  - components 组件
    - WeirdoTerminal 终端组件
  - core 核心
    - commands 命令集
    - commandRegister 命令注册器
    - commandExecutor 命令执行器
  - plugins 第三方依赖
  - router 路由管理
  - server 后端
  - store 状态管理
  - utils 工具函数
  - views 页面
    - IndexPage 主页
    - NotFound 404
  - App.vue 主页面
  - main.ts Vue 主文件
- .eslintrc.js 代码规范
- .gitignore git忽略文件
- .prettierrc.json 代码格式化
- components.d.ts 自动生成的组件动态引入
- env.d.ts 环境定义
- index.html 静态主页
- package.json 项目管理
- tsconfig.json TS 配置
- vite.config.ts 打包工具配置




> 接下来让我们快速开启项目吧~~


## 快速开始


1.   将项目克隆到本地

     ```bash
     git clone https://github.com/2WeirDo/weirdo_terminal.git
     ```

2.   进入项目目录，并分别安装前端与后端依赖

     ```bash
     cd weirdo_terminal && pnpm install
     cd scr/service && pnpm install
     ```

3.   在 `server/src/config` 中，新建`config.js`文件夹进行项目的配置

      ```javascript
      export const redisConfig = {
        host: 'localhost',
        port: '6379',
        password: '123456',
        db: 2
      };
      export const dbConfig = {
        database: 'weirdo_terminal',
        username: 'root',
        password: '123456',
        host: 'localhost',
        port: 3306
      };
      export const baiduFanYiConfig = {
        appid: '',
        key: ''
      };
      export const gptConfig = {
        key: '',
        baseUrl: ''
      };
      ```

4.   运行前端

     ```bash
     pnpm run dev
     ```

5.   运行后端

     ```bash
     cd server && pnpm start:dev
     ```

6.  快速解锁命令用法 - 命令行中使用`help`命令查询使用方法

    ```bash
    # 查询全部命令帮助
    help
    
    # 查询具体命令帮助
    help baidu || help hot
    ```

## GPT 网络与配置问题检测

通过 `testgpt`，检测你能否顺利请求到 `ChatGPTAPI`, 确保你网络通畅 且 `API Key`可用

1. 执行如下命令，进入 `testgpt` 文件夹，并安装依赖

    ```bash
    cd testgpt && pnpm install
    ```

2. 在 index.js 文件中配置你的 `API Key`

    ```js
    const api = new ChatGPTAPI({
       apiKey: ''
    })
    ```

3. 运行 index.js 文件

    ```bash
    node index.js
    ```

若顺利输出内容，则说明 `API Key` 有效且网络可访问。



## 项目细节

### 核心

系统分为 3 个核心模块，各模块职责分明：

- 微终端：UI 展示和终端交互逻辑
- 命令系统：连接微终端和命令集（中介者），负责匹配、解析和执行命令，并通过终端提供的操作接口给予其反馈
- 命令集：各种不同功能的命令定义和实现





### 微终端

从 0 开始实现的 web 终端控制台，包含以下模块：

- 终端输入：常驻 Input 框，负责接收用户命令
- 终端输出：负责展示用户的命令及执行结果等，支持以下三种类型的输出
  - 命令类型：输入命令 + 结果列表
  - 文本类型：单行文本展示，内置 5 种不同的展示状态（成功、错误、警告、信息、系统等）
  - 自定义组件类型：可以自由定制要展示的内容
- 快捷键：更方便地操作终端，使用 `document.onkeydown` 全局按键事件实现
- 开放接口：提供一组操作终端的 API，供命令系统调用，比如清屏、立即输出等
- 命令历史：记录用户输入的命令结果，使用 Vue 3 Composition API 封装部分逻辑
- 命令提示：根据用户的输入给出提示，使用 Vue 3 Composition API 独立封装




### 命令系统

一套独立于终端的命令解析执行引擎，包含以下模块：

- 注册器：用于注册和管理可被匹配的命令集
- 匹配器：根据输入文本匹配到对应的命令
- 解析器：从输入文本中解析出参数和选项
- 执行器：执行命令，完成操作
- 子命令机制：支持递归解析子命令



### 命令集

一组可用命令的集合（类似插件），通过 TS 明确命令的定义，支持配置别名、选项、子命令等，便于开发者扩展和定制。

核心命令包括：

- 空间系统：自实现的类文件系统，可以管理网页链接等内容
- 用户系统：管理用户、同步个人定制化内容
- 终端控制：定制或控制终端，比如更换背景、输出帮助等
- 搜索：可以快速从不同搜索引擎检索内容
- 其他模块。。。





### 开发新命令

1. 在 commands 下新建目录，目录名称为命令英文名称，所有该命令相关的代码都必须放在该目录中
2. 编写命令定义文件 xxxCommand.ts（xxx 为命令英文名称），可以参考其他命令，如 music、goto 等
3. 若命令包含子命令，需要将子命令相关文件放到 subCommands 目录中，可以参考 user 命令
4. 在 commandRegister 的 commandList 中补充新命令





## 特别鸣谢

该项目灵感来源于 [YuIndex](https://github.com/liyupi/yuindex) 

- [@程序员鱼皮](https://github.com/liyupi)

README 写法参考于
- [YuIndex](https://github.com/liyupi/yuindex)  
- [gpt-web-terminal](https://github.com/ltyzzzxxx/gpt-web-terminal)