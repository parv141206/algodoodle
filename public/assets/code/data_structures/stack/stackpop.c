#include <stdio.h>

// Define the maximum size of the stack
#define MAX_SIZE 10

// Define the structure for the stack
typedef struct {
    int data[MAX_SIZE]; // Array to store stack elements
    int top; // Index of the top element
} Stack;

// Function to create a new stack
Stack* createStack() {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->top = -1; // Initialize top index to -1
    return stack;
}

// Function to check if the stack is empty
int isEmpty(Stack* stack) {
    return stack->top == -1;
}

// Function to check if the stack is full
int isFull(Stack* stack) {
    return stack->top == MAX_SIZE - 1;
}

// Function to push an element onto the stack
void push(Stack* stack, int element) {
    if (isFull(stack)) {
        printf("Stack is full. Cannot push more elements.\n");
        return;
    }
    stack->data[++stack->top] = element;
}

// Function to pop an element from the stack
int pop(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty. Cannot pop elements.\n");
        return -1; // Return an error value
    }
    return stack->data[stack->top--];
}

int main() {
    Stack* stack = createStack();

    // Push some elements onto the stack
    push(stack, 1);
    push(stack, 2);
    push(stack, 3);

    // Pop an element from the stack
    int poppedElement = pop(stack);
    printf("Popped element: %d\n", poppedElement);

    return 0;
}