import { CommandType } from "../../command";
import { useSpaceStore } from "@/stores/spaceStore";

/**
 * 显示当前所在目录
 */
const showCommand: CommandType = {
  func: "show",
  name: "显示当前空间位置",
  options: [],
  action(options, terminal): void {
    const spaceStore = useSpaceStore();
    const output = `当前目录：${spaceStore.currentDir}`;
    terminal.writeTextResult(output);
  },
};

export default showCommand;
