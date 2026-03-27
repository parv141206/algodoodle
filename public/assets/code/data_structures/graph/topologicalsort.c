// Topological Sorting (Kahn's Algorithm) in C
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

void topologicalSort(int adj[][MAX_VERTICES], int V) {
    int indegree[MAX_VERTICES] = {0};

    // Calculate indegree
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (adj[i][j]) {
                indegree[j]++;
            }
        }
    }

    // Queue for nodes with indegree 0
    int queue[MAX_VERTICES];
    int front = 0, rear = 0;

    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) {
            queue[rear++] = i;
        }
    }

    int count = 0;
    int topoOrder[MAX_VERTICES];

    while (front != rear) {
        int u = queue[front++];
        topoOrder[count++] = u;

        for (int v = 0; v < V; v++) {
            if (adj[u][v]) {
                if (--indegree[v] == 0) {
                    queue[rear++] = v;
                }
            }
        }
    }

    if (count != V) {
        printf("Graph contains a cycle!\n");
        return;
    }

    printf("Topological Sort: \n");
    for (int i = 0; i < count; i++) {
        printf("%d ", topoOrder[i]);
    }
    printf("\n");
}

int main() {
    int V = 6;
    int adj[MAX_VERTICES][MAX_VERTICES] = {0};

    // Creating DAG
    adj[5][2] = 1;
    adj[5][0] = 1;
    adj[4][0] = 1;
    adj[4][1] = 1;
    adj[2][3] = 1;
    adj[3][1] = 1;

    topologicalSort(adj, V);

    return 0;
}
