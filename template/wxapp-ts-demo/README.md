# 小程序 DEMO

- 使用 gulp 构建（支持 typescript 和 less）
- 使用 typescript 编译
- 使用 tslint + prettier 格式代码规范
- 使用小程序官方 typing 库

## 说明

### 环境安装&构建

1. `git clone http://git.code.oa.com/basinwang/wxapp-ts-demo.git`
2. `npm install`
3. `npm install --global prettier typescript tslint gulp`
4. 开发环境，根目录执行命令 `npm run dev`
5. 生产环境，执行`npm run build`

注：

- 注意配置文件（/src/config/cgi-config.js），切换开发和正式环境
- mock 数据，存放路径与请求 url 保持一致

## 项目结构

```
├─dist                              //编译之后的项目文件（带 sorcemap，支持生产环境告警定位）
├─src                               //开发目录
│  │  app.ts                        //小程序起始文件
│  │  app.json
│  │  app.less
│  │
│  ├─assets                     	//静态资源
│     ├─less						//公共less
│     ├─img						    //图片资源
│  ├─components                     //组件
│  ├─utils                           //工具库
│  ├─config                           //配置文档
│     ├─cgi-config.ts                //cgi接口配置
│     ├─global-config.ts                //全局配置
│  ├─pages                          //小程序相关页面
│
│  project.config.json              //小程序配置文件
│  gulpfile.js                      //工具配置
│  package.json                     //项目配置
│  README.md                        //项目说明
│  tsconfig.json                     //typescript配置
│  tslint.json                     //代码风格配置
```

## 公共库使用说明
### utils/request
通用请求，处理包括 session 过期自动拉取登录接口续期等逻辑。（适用于有单个登录接口来获取 session 的场景）
使用方式：
1. 在`config/global-config.ts`文件里，更新`SESSION_KEY`的值（后台接口协议返回key，例如`"sessionId"`）。
2. 如果有其他需要全局携带的参数，需要在`utils/request/index.ts`文件里，`dataWithSession`中带上。
3. 在`config/global-config.ts`文件里，更新`LOGIN_FAIL_CODES`的值（错误码若为该数组中的一个，则会重新拉起登录，再继续发起请求）。

### utils/log
日志上传的组件，需要接入插件（[插件文档](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx9891636365ed130f&token=1455323106&lang=zh_CN)）：
1. 申请插件使用（参考文档）。
2. 在`app.json`中，添加插件配置。
``` json
{
  "plugins": {
    "wxpayLogFactory": {
      "version": "0.0.3",
      "provider": "wx9891636365ed130f"
    }
  }
}
```
3. 在其他页面中
``` ts
import { createLog } from "../utils/log";
const log = createLog("pages/xxx");
log.I("打印info日志");
log.E("打印error日志");
```