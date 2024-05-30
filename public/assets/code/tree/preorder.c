#include <stdio.h>

// Define the structure for a binary tree node
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Function to create a new node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        printf("Memory error\n");
        return NULL;
    }
    newNode->data = data;
    newNode->left = newNode->right = NULL;
    return newNode;
}

// Function to perform preorder traversal
void preorderTraversal(Node* root) {
    if (root == NULL) {
        return;
    }
    printf("%d ", root->data);
    preorderTraversal(root->left);
    preorderTraversal(root->right);
}

int main() {
    // Create the binary tree
    Node* root = createNode(15);
    root->left = createNode(10);
    root->right = createNode(20);
    root->left->left = createNode(5);
    root->left->right = createNode(12);
    root->right->left = createNode(18);
    root->right->right = createNode(25);
    root->right->right->right = createNode(28);

    // Perform preorder traversal
    printf("Preorder traversal: ");
    preorderTraversal(root);
    printf("\n");

    return 0;
}