const styles = {
  success: [
    "color: #fff",
    "background-color: #52c41a",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";"),
  error: [
    "color: #fff",
    "background-color: #f5222d",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";"),
  warning: [
    "color: #fff",
    "background-color: #faad14",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";"),
  info: [
    "color: #fff",
    "background-color: #1890ff",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";"),
  primary: [
    "color: #fff",
    "background-color: #1677ff",
    "padding: 2px 6px",
    "border-radius: 3px",
  ].join(";"),
};

// 时间格式化
const getTimeString = () => {
  const now = new Date();
  return now.toLocaleTimeString("zh-CN", { hour12: false });
};

// rainbow文字效果
const getRainbowStyle = (text) => {
  const colors = [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#0000ff",
    "#4b0082",
    "#8f00ff",
  ];
  let result = "";
  const styleList = [];

  text.split("").forEach((char, i) => {
    result += `%c${char}`;
    styleList.push(
      `color: ${colors[i % colors.length]}; font-weight: bold; font-size: 16px;`
    );
  });

  return { text: result, styles: styleList };
};

export const log = {
  // 基础日志方法
  print(text, style) {
    console.log(`%c${text}`, style);
  },

  // 普通信息
  info(text) {
    this.print(`[${getTimeString()}] ${text}`, styles.info);
  },

  // 成功信息
  success(text) {
    this.print(`[${getTimeString()}] ${text}`, styles.success);
  },

  // 警告信息
  warning(text) {
    this.print(`[${getTimeString()}] ${text}`, styles.warning);
  },

  // 错误信息
  error(text) {
    this.print(`[${getTimeString()}] ${text}`, styles.error);
  },

  // 主要信息
  primary(text) {
    this.print(`[${getTimeString()}] ${text}`, styles.primary);
  },

  // 大号文字
  big(text) {
    this.print(
      `[${getTimeString()}] ${text}`,
      "font-size: 24px; font-weight: bold; color: #1890ff;"
    );
  },

  // 彩虹文字
  rainbow(text) {
    const { text: rainbowText, styles: rainbowStyles } = getRainbowStyle(text);
    console.log(`[${getTimeString()}] ${rainbowText}`, ...rainbowStyles);
  },

  // 渐变文字
  gradient(text) {
    this.print(
      `[${getTimeString()}] ${text}`,
      "background: linear-gradient(to right, #ff0000, #00ff00); -webkit-background-clip: text; color: transparent; font-size: 20px; font-weight: bold;"
    );
  },

  // 带图标
  withIcon(text, type = "info") {
    const icons = {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    };
    this.print(`${icons[type]} ${text}`, styles[type]);
  },

  // 分组
  group(title, callback) {
    console.group(`%c${title}`, styles.info);
    callback();
    console.groupEnd();
  },

  // 表格
  table(data) {
    console.log(`%c[${getTimeString()}] 表格数据：`, styles.info);
    console.table(data);
  },

  // 性能计时
  time(label) {
    console.time(label);
    return () => console.timeEnd(label);
  },

  // JSON
  json(data) {
    console.log(`%c[${getTimeString()}] JSON数据：`, styles.info);
    console.log(JSON.stringify(data, null, 2));
  },

  // 清空控制台
  clear() {
    console.clear();
  },
};

// 简写方式
export const {
  info,
  success,
  warning,
  error,
  primary,
  big,
  rainbow,
  gradient,
  withIcon,
  group,
  table,
  time,
  json,
  clear,
} = log;
