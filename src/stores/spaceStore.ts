import { defineStore } from "pinia";
import { SpaceItemType, SpaceType } from "../core/commands/space/spaceCommands";

/**
 * 空间状态（类似文件系统实现）
 */
export const useSpaceStore = defineStore("space", {
  state: () => ({
    // 空间
    space: {
      // 默认包含根目录
      "/": {
        name: "/",
        dir: "/",
        type: "dir",
      },
    } as SpaceType,
    // 当前所在目录
    currentDir: "/",
  }),
  getters: {},
  // 持久化
  persist: {
    key: "space-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load spaceStore data start");
    },
    afterRestore: (context) => {
      console.log("load spaceStore data end");
    },
  },
  actions: {
    /**
     * 通过传入条目名称获取单条目对象
     * @param key
     */
    getItem(key: string) {
      // getFullPath, 通过传入当前目录和条目名称获取条目全路径
      const fullPath = getFullPath(this.currentDir, key);
      return this.space[fullPath];
    },
    /**
     * 获取某目录下的条目
     * @param dir 目录
     * @param recursive 是否递归
     */
    listItems(dir?: string, recursive = false): SpaceItemType[] {
      if (!dir) {
        // 没传 dir 就list当前目录
        dir = this.currentDir;
      } else {
        // 否则就拿到dir的完整路径
        dir = getFullPath(this.currentDir, dir);
        // console.log("dir", dir);
      }
      const resultList: SpaceItemType[] = [];

      // 获取父目录层级的深度 (比如 '/' 返回1, '/study' 返回2)
      const parentDirDepth = getItemDepth(dir);

      // 查询 dir 下的 item
      for (const key in this.space) {
        // 不列举自身, 列举自身的条目
        if (key === dir) {
          continue;
        }
        // 前缀必须匹配
        if (!key.startsWith(dir)) {
          continue;
        }
        // 不递归，只展示直接子级
        if (!recursive) {
          // 直接子级的 '/' 数比父级多 1
          if (getItemDepth(key) - 1 === parentDirDepth) {
            resultList.push(this.space[key]);
          }
        } else {
          resultList.push(this.space[key]);
        }
      }
      return resultList;
    },
    /**
     * 添加条目
     * @param item
     */
    addItem(item: SpaceItemType) {
      // 获取目标目录中目标条目的全路径
      const fullPath = getFullPath(item.dir, item.name);
      // 目标目录不存在
      if (!this.space[item.dir]) {
        return [false, false];
      }
      // 文件已存在 todo 支持覆盖
      if (this.space[fullPath]) {
        this.space[fullPath] = item;
        return [false, true];
      }
      this.space[fullPath] = item;
      return [true, true];
    },
    /**
     * 删除条目
     * @param key
     * @param recursive
     */
    deleteItem(name: string, recursive = false) {
      const fullPath = getFullPath(this.currentDir, name);
      // 目录不存在
      if (!this.space[fullPath]) {
        return 1;
      }
      const deleteKeyList = [fullPath];
      // 需要递归删除
      if (recursive) {
        for (const spaceKey in this.space) {
          if (spaceKey.startsWith(fullPath)) {
            deleteKeyList.push(spaceKey);
          }
        }
      }
      // 移除属性
      deleteKeyList.forEach((deleteKey) => {
        delete this.space[deleteKey];
      });
      return 2;
    },
    /**
     * 复制条目
     * @param source
     * @param target
     * @param recursive
     */
    copyItem(source: string, target: string, recursive = false) {
      // e.g. /a/b => /a/c
      const sourceFullPath = getFullPath(this.currentDir, source);
      const targetFullPath = getFullPath(this.currentDir, target);
      // 源条目不存在
      const sourceItem = this.space[sourceFullPath];
      if (!sourceItem) {
        return 1;
      }
      // 复制目录必须开启递归
      if (sourceItem.type === "dir" && !recursive) {
        return 2;
      }
      // todo 待实现递归
      // 目标条目已存在
      if (this.space[targetFullPath]) {
        return 3;
      }
      // 目标目录不存在
      const targetParentDir = getParentDir(targetFullPath);
      if (!this.space[targetParentDir]) {
        return 4;
      }
      const targetItem = { ...sourceItem };
      targetItem.dir = targetParentDir;
      targetItem.name = getItemName(targetFullPath);
      this.addItem(targetItem);
      return 5;
    },
    /**
     * 移动条目（等同于复制 + 删除）
     * @param source
     * @param target
     * @param recursive
     */
    moveItem(source: string, target: string, recursive = false) {
      let result = this.copyItem(source, target, recursive);
      if (result === 5) {
        result = this.deleteItem(source, recursive);
      }
      return result;
    },
    /**
     * 更新当前所在目录
     * @param newDir
     */
    updateCurrentDir(newDir: string) {
      let fullPath = getFullPath(this.currentDir, newDir);
      // 上层目录
      if (newDir === "..") {
        // 已经是根目录，无法到上层
        if (this.currentDir === "/") {
          return 1;
        } else {
          fullPath = getParentDir(this.currentDir);
        }
      }
      // 目录不存在
      if (!this.space[fullPath]) {
        return 2;
      }
      this.currentDir = fullPath;
      return 3;
    },
  },
});

/**
 * 获得条目全路径
 * @param dir 目录
 * @param name 条目名称（位置）
 */
const getFullPath = (dir: string, name: string): string => {
  if (name.startsWith("/")) {
    return name;
  }
  return dir + (dir === "/" ? "" : "/") + name;
};

/**
 * 获取上层路径
 * @param path
 */
const getParentDir = (path: string): string => {
  let parentDir = "/";
  if (path === "/") {
    return parentDir;
  }
  // 切割掉最后一个 '/'
  // e.g. /a/b => /a
  parentDir = path.substring(0, path.lastIndexOf("/"));
  // 有可能回退到根目录
  // e.g. /a => ''（空字符串）
  if (!parentDir) {
    return "/";
  }
  return parentDir;
};

/**
 * 根据路径获取空间条目名
 * @param path
 */
const getItemName = (path: string): string => {
  if (path === "/") {
    return path;
  }
  // 从最后一个 '/' 开始取字符串
  // e.g. /a/b => b
  return path.substring(path.lastIndexOf("/") + 1);
};

/**
 * 获得条目层级
 * @param key
 */
const getItemDepth = (key: string) => {
  if (key === "/") {
    return 1;
  }
  return key.split("/").length;
};
