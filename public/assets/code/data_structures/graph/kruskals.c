#include <stdio.h>
#include <stdlib.h>

// Structure to represent a graph edge
struct Edge {
    int src, dest, weight;
};

// Structure to represent a connected, undirected and weighted graph
struct Graph {
    int V, E;
    struct Edge* edge;
};

// Structure to represent a subset for union-find
struct subset {
    int parent;
    int rank;
};

// Create a graph with V vertices and E edges
struct Graph* createGraph(int V, int E) {
    struct Graph* graph = (struct Graph*)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edge = (struct Edge*)malloc(graph->E * sizeof(struct Edge));
    return graph;
}

// Find set of an element i
int find(struct subset subsets[], int i) {
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);
    return subsets[i].parent;
}

// Perform union of two sets
void Union(struct subset subsets[], int x, int y) {
    int xroot = find(subsets, x);
    int yroot = find(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank)
        subsets[xroot].parent = yroot;
    else if (subsets[xroot].rank > subsets[yroot].rank)
        subsets[yroot].parent = xroot;
    else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}

// Compare two edges according to their weights
int myComp(const void* a, const void* b) {
    struct Edge* a1 = (struct Edge*)a;
    struct Edge* b1 = (struct Edge*)b;
    return a1->weight > b1->weight;
}

void KruskalMST(struct Graph* graph) {
    int V = graph->V;
    struct Edge result[V]; 
    int e = 0; // Index variable, used for result[]
    int i = 0; // Index variable, used for sorted edges

    // Sort all the edges in non-decreasing order of their weight
    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), myComp);

    // Allocate memory for creating V subsets
    struct subset* subsets = (struct subset*)malloc(V * sizeof(struct subset));

    for (int v = 0; v < V; ++v) {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    while (e < V - 1 && i < graph->E) {
        struct Edge next_edge = graph->edge[i++];

        int x = find(subsets, next_edge.src);
        int y = find(subsets, next_edge.dest);

        // If including this edge doesn't cause cycle
        if (x != y) {
            result[e++] = next_edge;
            Union(subsets, x, y);
        }
    }

    printf("Following are the edges in the constructed MST\n");
    int minimumCost = 0;
    for (i = 0; i < e; ++i) {
        printf("%d -- %d == %d\n", result[i].src, result[i].dest, result[i].weight);
        minimumCost += result[i].weight;
    }
    printf("Minimum Cost Spanning Tree: %d\n", minimumCost);
}

int main() {
    int V = 4; // Number of vertices
    int E = 5; // Number of edges
    struct Graph* graph = createGraph(V, E);

    // add edge 0-1
    graph->edge[0].src = 0; graph->edge[0].dest = 1; graph->edge[0].weight = 10;
    // add edge 0-2
    graph->edge[1].src = 0; graph->edge[1].dest = 2; graph->edge[1].weight = 6;
    // add edge 0-3
    graph->edge[2].src = 0; graph->edge[2].dest = 3; graph->edge[2].weight = 5;
    // add edge 1-3
    graph->edge[3].src = 1; graph->edge[3].dest = 3; graph->edge[3].weight = 15;
    // add edge 2-3
    graph->edge[4].src = 2; graph->edge[4].dest = 3; graph->edge[4].weight = 4;

    KruskalMST(graph);

    return 0;
}
