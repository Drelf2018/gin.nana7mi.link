export function throttle(fn: Function, delay = 500) {
  var flag = new Date().getTime();
  return function (...args) {
    var tt = new Date().getTime();
    if (tt - flag >= delay) {
      fn.call(this, ...args);
      flag = tt;
    }
  }
}

export function debounce(fn: Function, delay = 1000) {
  var timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn.call(this, ...args), delay);
  }
}

// 格式化时间
export function Format(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 根据文件扩展名判断数据类型
export function get_file_MIME_type(url: string) {
  switch (url.split('.').pop().toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'json':
      return 'application/json';
    case 'js':
      return 'application/javascript';
    case 'css':
      return 'text/css';
    case 'html':
      return 'text/html';
    case 'txt':
      return 'text/plain';
    // 可以继续添加更多的文件类型和MIME类型
    default:
      return 'unknown';
  }
}

export class Theme {
  dark: string = "rgba(30, 30, 30, 1)"
  light: string = "rgba(246, 248, 250, 0.5)"
  theme: string
  app: HTMLElement
  zoom: number
  isPC: boolean
  constructor() {
    this.app = document.getElementById("app")
    if (document.body.offsetWidth < 750) {
      this.isPC = false
      this.app.classList.add("mobile")
      let timeNow = new Date().getHours()
      if (timeNow >= 23 || timeNow < 6) {
        this.theme = "dark"
      } else {
        this.theme = "light"
      }
    } else {
      this.isPC = true
      this.app.classList.add("pc")
      this.theme = localStorage.getItem("theme") || "light"
    }

    this.setBackgroundColor()

    this.setZoom()
    window.onresize = () => this.setZoom()
  }
  setZoom() {
    this.zoom = 0.8 * document.body.clientWidth / 1200
    this.app.style.setProperty("--zoom", this.zoom.toString())
  }
  setBackgroundColor() {
    document.body.style.backgroundColor = this[this.theme]
    this.app.setAttribute("data-theme", this.theme)
  }
  modifyTheme() {
    this.theme = "lightdark".replace(this.theme, "")
    localStorage.setItem("theme", this.theme)
    this.setBackgroundColor()
  }

  isLight(): boolean {
    return this.theme == 'light'
  }
}