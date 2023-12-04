/**
 * 匹配网址正则
 * 将文本中的URL链接转换为HTML超链接。
 */
const URL_REG =
  /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

/**
 * 识别文本中的超链接
 * @param text
 */
const smartText = (text?: string) => {
  if (!text) {
    return text
  }
  // 标志"gi"意味着全局（g）和不区分大小写（i）的搜索。
  const reg = new RegExp(URL_REG, 'gi')
  /**
   *  使用replaceAll方法将文本中所有符合正则表达式的URL替换为HTML超链接格式。这里的'$1'是一个捕获组，对应正则表达式中匹配到的整个URL。
      例如，文本中的"http://example.com"会被替换为"<a href='http://example.com' target='_blank'>http://example.com</a>"。
   */
  return text.replaceAll(reg, "<a href='$1' target='_blank'>$1</a>")
}

export default smartText
