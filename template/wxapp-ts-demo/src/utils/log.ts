/**
 * 记录日志
 * @description 打印可读性更高的日志，插件文档https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx9891636365ed130f&token=1455323106&lang=zh_CN
 * @example
 *   // app.js
 *   import {initLog} from '../utils/log'
 *   initLog(appid)
 *
 *   // page/x.js
 *   import {createLog} from '../utils/log'
 *   const log = createLog('path/to/your/page')
 *   log.I(this, is, a, INFO)
 *   log.W(this, is, a, WARN)
 *   log.L(this, is, a, LOG)
 *   log.E(this, is, a, ERROR)
 */
interface ILog {
  pref?: string;
  /* Info日志打印 */
  I: (...params: any[]) => void;
  /* Log日志打印 */
  L: (...params: any[]) => void;
  /* Warning日志打印 */
  W: (...params: any[]) => void;
  /* Error日志打印，只有Error日志超过阈值（20）时，会自动上传 */
  E: (...params: any[]) => void;
}

interface IPluginLog extends ILog {
  uploadLog: (uploadType?: string) => void;
}

let wxpayLog: IPluginLog;

class Log implements ILog {
  public pref?: string;
  constructor(prefix: string) {
    this.pref = prefix;
  }

  public I(...args: any[]) {
    if (wxpayLog) {
      wxpayLog.I("[" + this.pref + "]", ...args);
    }
  }

  public L(...args: any[]) {
    if (wxpayLog) {
      wxpayLog.L("[" + this.pref + "]", ...args);
    }
  }

  public W(...args: any[]) {
    if (wxpayLog) {
      wxpayLog.W("[" + this.pref + "]", ...args);
    }
  }

  public E(...args: any[]) {
    if (wxpayLog) {
      wxpayLog.E("[" + this.pref + "]", ...args);
    }
  }
}

const initLog = (appid: string) => {
  if (wxpayLog) {
    return;
  }
  try {
    const plugin: any = requirePlugin("wxpayLogFactory");
    plugin.initLog({ appid });
    wxpayLog = plugin.createLog("");

    // 截屏上传
    if (wx.onUserCaptureScreen) {
      wx.onUserCaptureScreen(() => {
        if (wxpayLog.uploadLog) {
          wxpayLog.uploadLog("SCREENSHOT");
        }
      });
    }
  } catch (error) {
    console.error("初始化wxpayLog失败", error);
  }
};
initLog("wx50e4e4bebf34de5c");
const createLog = (prefix: string) => new Log(prefix);

export { createLog, initLog };
