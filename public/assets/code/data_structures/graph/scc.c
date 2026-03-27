// Kosaraju's algorithm to find strongly connected components in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

typedef struct Graph {
    int numVertices;
    Node** adjLists;
} Graph;

Node* createNode(int v) {
    Node* newNode = malloc(sizeof(Node));
    newNode->vertex = v;
    newNode->next = NULL;
    return newNode;
}

Graph* createGraph(int vertices) {
    Graph* graph = malloc(sizeof(Graph));
    graph->numVertices = vertices;
    graph->adjLists = malloc(vertices * sizeof(Node*));
    for (int i = 0; i < vertices; i++)
        graph->adjLists[i] = NULL;
    return graph;
}

void addEdge(Graph* graph, int src, int dest) {
    Node* newNode = createNode(dest);
    newNode->next = graph->adjLists[src];
    graph->adjLists[src] = newNode;
}

void DFS(Graph* graph, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("%d ", vertex);
    Node* temp = graph->adjLists[vertex];
    while (temp != NULL) {
        int connectedVertex = temp->vertex;
        if (!visited[connectedVertex]) {
            DFS(graph, connectedVertex, visited);
        }
        temp = temp->next;
    }
}

void fillOrder(Graph* graph, int vertex, bool visited[], int stack[], int* top) {
    visited[vertex] = true;
    Node* temp = graph->adjLists[vertex];
    while (temp != NULL) {
        int connectedVertex = temp->vertex;
        if (!visited[connectedVertex]) {
            fillOrder(graph, connectedVertex, visited, stack, top);
        }
        temp = temp->next;
    }
    stack[++(*top)] = vertex;
}

Graph* getTranspose(Graph* graph) {
    Graph* transpose = createGraph(graph->numVertices);
    for (int v = 0; v < graph->numVertices; v++) {
        Node* temp = graph->adjLists[v];
        while (temp != NULL) {
            addEdge(transpose, temp->vertex, v);
            temp = temp->next;
        }
    }
    return transpose;
}

void printSCCs(Graph* graph) {
    int stack[MAX_VERTICES];
    int top = -1;
    bool visited[MAX_VERTICES];
    for (int i = 0; i < graph->numVertices; i++)
        visited[i] = false;

    // Fill vertices in stack according to their finishing times
    for (int i = 0; i < graph->numVertices; i++)
        if (!visited[i])
            fillOrder(graph, i, visited, stack, &top);

    // Create a reversed graph
    Graph* transpose = getTranspose(graph);

    // Mark all the vertices as not visited (For second DFS)
    for (int i = 0; i < graph->numVertices; i++)
        visited[i] = false;

    // Now process all vertices in order defined by Stack
    while (top != -1) {
        int v = stack[top--];
        if (!visited[v]) {
            DFS(transpose, v, visited);
            printf("\n");
        }
    }
}

int main() {
    int V = 5;
    Graph* graph = createGraph(V);
    
    addEdge(graph, 1, 0);
    addEdge(graph, 0, 2);
    addEdge(graph, 2, 1);
    addEdge(graph, 0, 3);
    addEdge(graph, 3, 4);

    printf("Following are strongly connected components in given graph \n");
    printSCCs(graph);
    return 0;
}
