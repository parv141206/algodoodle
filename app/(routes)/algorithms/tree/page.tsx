import React, { FC } from "react";

const Page: FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-3xl font-bold">Tree Traversal Methods 🌳🔍</div>
      <p>
        Tree traversal is a fundamental concept in computer science that
        involves systematically visiting each node in a tree data structure.
        Through tree traversal, we can process the nodes in a predetermined
        order, facilitating operations like searching, sorting, and evaluating
        expressions.
      </p>
      <p>
        There are three main methods of traversing a tree: inorder, preorder,
        and postorder. Each method has its own specific ordering and uses for
        different applications.
      </p>
      <h2 className="text-2xl font-bold">In-Order Traversal 🔄</h2>
      <p>
        In inorder traversal, the algorithm visits the left subtree, then the
        root node, and finally the right subtree. This ordering ensures that the
        nodes are visited in a sorted order.
      </p>
      <h2 className="text-2xl font-bold">Pre-Order Traversal 🔝</h2>
      <p>
        Preorder traversal visits the root node first, then the left subtree,
        and finally the right subtree. This ordering ensures that the nodes are
        visited in a &quot;top-down&quot; manner, starting from the root and
        moving toward the leaves.
      </p>
      <h2 className="text-2xl font-bold">Post-Order Traversal 🔚</h2>
      <p>
        Postorder traversal visits the left subtree, then the right subtree, and
        finally the root node. This ordering ensures that the nodes are visited
        in a &quot;bottom-up&quot; manner, starting from the leaves and moving
        toward the root.
      </p>
      <p>
        These traversal methods are essential for working with tree data
        structures and have various applications in computer science, such as
        expression evaluation, file system navigation, and more.
      </p>
      <p>Learn more about them by selecting one from the sidebar!</p>
    </div>
  );
};

export default Page;
