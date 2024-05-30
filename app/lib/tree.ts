export  interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}
export const tree: TreeNode = {
  value: 15,
  left: {
    value: 10,
    left: {
      value: 5,
    },
    right: {
      value: 12,
    },
  },
  right: {
    value: 20,
    left: {
      value: 18,
    },
    right: {
      value: 25,
      right: {
        value: 28,
      },
    },
  },
};
