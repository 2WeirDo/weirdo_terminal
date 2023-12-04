/**
 * 快捷键系统
 * @author weirdo
 */
import TerminalType = WeirdoTerminal.TerminalType

/**
 * 注册快捷键
 * @param terminal
 */
export const registerShortcuts = (terminal: TerminalType) => {
  document.onkeydown = (e) => {
    // console.log(e);
    let key = e.key

    // 自动聚焦输入框
    if (key >= 'a' && key <= 'z' && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      terminal.focusInput() // 输入框聚焦
      return
    }

    // 然后如果按的是类似于ctrl, 就继续匹配
    // 继续按, 因为ctrl没有时 => code 为 ControlLeft, 下面没有匹配的
    // 所以要按 ctrl + 某个值, 这样就有匹配的 code 了。

    // 匹配快捷键
    let code = e.code
    for (const shortcut of shortcutList) {
      // 强制转为 bool 值, 比如当某个shortcut的ctrlKey没有时(按下了字母或者数字), 就将其转为false
      // 因此用到了 !! 来转换为bool值
      // 例如 !!undefined : 就等于false
      if (
        code === shortcut.code &&
        e.ctrlKey == !!shortcut.ctrlKey &&
        e.metaKey == !!shortcut.metaKey &&
        e.shiftKey == !!shortcut.shiftKey
      ) {
        shortcut.action(e, terminal)
      }
    }
  }
}

/**
 * 快捷键类型
 */
interface ShortcutType {
  code: string // 按键码
  desc?: string // 功能描述
  keyDesc?: string // 按键描述
  ctrlKey?: boolean // ctrl键
  metaKey?: boolean // 功能键
  shiftKey?: boolean // shift键
  action: (e: Event, terminal: TerminalType) => void
}

/**
 * 快捷键列表
 */
export const shortcutList: ShortcutType[] = [
  {
    desc: '清屏',
    code: 'KeyL',
    keyDesc: 'Ctrl + L',
    ctrlKey: true,
    action(e, terminal) {
      e.preventDefault()
      terminal.clear()
    }
  },
  {
    desc: '折叠',
    code: 'KeyO',
    keyDesc: 'Ctrl + O',
    ctrlKey: true,
    action(e, terminal) {
      e.preventDefault()
      terminal.toggleAllCollapse()
    }
  },
  {
    desc: '粘贴',
    code: 'KeyV',
    keyDesc: 'Ctrl + V',
    metaKey: true,
    action(e, terminal) {
      terminal.focusInput()
    }
  },
  {
    desc: '补全',
    code: 'Tab',
    action(e, terminal) {
      e.preventDefault()
      if (terminal.isInputFocused()) {
        terminal.setTabCompletion()
      } else {
        terminal.focusInput()
      }
    }
  },
  {
    desc: 'Backspace',
    code: 'Backspace',
    action(e, terminal) {
      terminal.focusInput()
    }
  },
  {
    desc: 'Enter',
    code: 'Enter',
    action(e, terminal) {
      terminal.focusInput()
    }
  },
  {
    desc: '查看上一条命令',
    code: 'ArrowUp',
    keyDesc: '↑',
    action(e, terminal) {
      e.preventDefault()
      terminal.showPrevCommand()
    }
  },
  {
    desc: '查看下一条命令',
    code: 'ArrowDown',
    keyDesc: '↓',
    action(e, terminal) {
      e.preventDefault()
      terminal.showNextCommand()
    }
  }
]
