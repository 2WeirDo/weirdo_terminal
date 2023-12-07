import { CommandType } from "../../command";
import { useSpaceStore } from "@/stores/spaceStore";

/**
 * 复制
 */
const copyCommand: CommandType = {
  func: "copy",
  name: "复制空间条目",
  alias: ["cp"],
  params: [
    {
      key: "source",
      desc: "来源路径",
      required: true,
    },
    {
      key: "target",
      desc: "目标路径",
      required: true,
    },
  ],
  options: [
    {
      key: "recursive",
      desc: "是否递归复制",
      alias: ["r"],
      type: "boolean",
      defaultValue: false,
    },
  ],
  action(options, terminal): void {
    const { _, recursive = false } = options;
    if (_.length < 2) {
      terminal.writeTextErrorResult("参数不足");
      return;
    }
    const spaceStore = useSpaceStore();
    const [source, target] = _;
    const result = spaceStore.copyItem(source, target, recursive);
    if (result === 1) {
      terminal.writeTextErrorResult("源条目不存在");
    } else if (result === 2) {
      terminal.writeTextErrorResult("复制目录必须开启递归");
    } else if (result === 3) {
      terminal.writeTextErrorResult("目标条目已存在");
    } else if (result === 4) {
      terminal.writeTextErrorResult("目标目录不存在");
    } else if (result === 5) {
      terminal.writeTextSuccessResult("复制成功");
    }
  },
};

export default copyCommand;
