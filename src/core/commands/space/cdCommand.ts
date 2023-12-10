import { CommandType } from "../../command";
import { useSpaceStore } from "@/stores/spaceStore";

/**
 * 切换目录
 */
const cdCommand: CommandType = {
  func: "cd",
  name: "切换空间目录",
  params: [
    {
      key: "dir",
      desc: "目标目录",
      required: true,
    },
  ],
  options: [],
  action(options, terminal): void {
    const { _ } = options;
    if (_.length < 1) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const targetDir = _.join(' ');
    const spaceStore = useSpaceStore();
    const result = spaceStore.updateCurrentDir(targetDir);
    if (result === 1) {
      terminal.writeTextErrorResult("已经是根目录，无法切换到上层");
    } else if (result === 2) {
      terminal.writeTextErrorResult("切换目录失败: 目录不存在");
    } else if (result === 3) {
      terminal.writeTextResult(`已切换至目录：${spaceStore.currentDir}`);
    }
  },
};

export default cdCommand;
