#include <stdio.h>

#define MAX_SIZE 100

// Define a structure for the stack
typedef struct {
    int stack[MAX_SIZE];
    int top;
} Stack;

// Function to create a stack of given capacity
Stack* createStack(unsigned capacity) {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->capacity = capacity;
    stack->top = -1;
    return stack;
}

// Function to add an item to the stack
void push(Stack* stack, int item) {
    if (stack->top == MAX_SIZE - 1) {
        printf("Stack Overflow\n");
        return;
    }
    stack->top++;
    stack->stack[stack->top] = item;
}

int main() {
    Stack* stack = createStack(MAX_SIZE);

    push(stack, 44);
    push(stack, 10);
    push(stack, 62);
    push(stack, 123);
    push(stack, 15);

    return 0;
}