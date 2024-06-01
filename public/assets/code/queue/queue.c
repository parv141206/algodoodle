#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 10

// Structure to represent a queue
typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
} Queue;

// Function to initialize the queue
void initQueue(Queue *q) {
    q->front = -1;
    q->rear = -1;
}

// Function to check if the queue is full
int isFull(Queue *q) {
    return q->rear == MAX_SIZE - 1;
}

// Function to check if the queue is empty
int isEmpty(Queue *q) {
    return q->front == -1;
}

// Function to add an element to the queue (enqueue)
void enqueue(Queue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full, cannot enqueue.\n");
    } else {
        if (isEmpty(q)) {
            q->front = 0;
        }
        q->rear++;
        q->items[q->rear] = value;
        printf("%d enqueued to the queue.\n", value);
    }
}

// Function to remove an element from the queue (dequeue)
int dequeue(Queue *q) {
    int item;
    if (isEmpty(q)) {
        printf("Queue is empty, cannot dequeue.\n");
        return -1;
    } else {
        item = q->items[q->front];
        q->front++;
        if (q->front > q->rear) {
            q->front = q->rear = -1;
        }
        printf("%d dequeued from the queue.\n", item);
        return item;
    }
}

// Function to display the elements in the queue
void display(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty.\n");
    } else {
        printf("Queue elements: ");
        for (int i = q->front; i <= q->rear; i++) {
            printf("%d ", q->items[i]);
        }
        printf("\n");
    }
}

int main() {
    Queue q;
    initQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    display(&q);

    dequeue(&q);
    display(&q);

    return 0;
}