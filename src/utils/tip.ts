import localforage from 'localforage';
import { CN, EN } from '@myConstants/index';

type TipType = 'info' | 'success' | 'warning' | 'error';

/**
 * @description 全局消息提示类
 */
class Tip {
  private messageTimer: {
    [key: string]: boolean;
  };

  constructor() {
    this.messageTimer = {
      info: true,
      success: true,
      warning: true,
      error: true
    };
  }

  /**
   * @description 显示消息
   * @param {TipType} type 消息类型
   * @param {string} message 消息内容
   */
  async show(type: TipType, message: string) {
    const language = await localforage.getItem('language');
    const languageMap = language === 'CN' ? CN : EN;
    console.log(`[${languageMap[type]}]: ${message}`);
    const app = document.querySelector('#app');
    const tip = document.createElement('div');
    tip.innerHTML = `${languageMap[type]}: ${message}`;
    tip.style.cssText = `
      width: fit-content;
      padding: 10px 20px;
      border-radius: 999px;
      min-height: 40px;
      position: fixed;
      top: 10px;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 9999;
      color: #fff;
      background-color: none;
      transform: translateY(calc(-100% - 10px));
      transition: transform 0.3s ease-in-out;
    `;
    switch (type) {
      case 'info':
        tip.style.backgroundColor = 'var(--main-tip-info-color)';
        break;
      case 'success':
        tip.style.backgroundColor = 'var(--main-tip-success-color)';
        break;
      case 'warning':
        tip.style.backgroundColor = 'var(--main-tip-warning-color)';
        break;
      case 'error':
        tip.style.backgroundColor = 'var(--main-tip-error-color)';
        break;
    }
    if (!app) {
      return;
    }

    app.appendChild(tip);
    setTimeout(() => {
      tip.style.transform = 'translateY(0)';
    }, 100);
    setTimeout(() => {
      tip.style.transform = 'translateY(calc(-100% - 10px))';
      setTimeout(() => {
        app.removeChild(tip);
      }, 500);
    }, 3000);
  }

  /**
   * @description 向消息中心添加消息
   * @param {TipType} type 消息类型
   * @param {string} message 消息内容
   */
  addmessage(type: TipType, message: string) {
    if (this.messageTimer[type]) {
      this.messageTimer[type] = false;
      setTimeout(() => {
        this.messageTimer[type] = true;
      }, 3000);
      this.show(type, message);
    }
  }
}

export default new Tip();
