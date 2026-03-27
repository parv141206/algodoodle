#include <stdio.h>

#define MAX_N 100
#define MAX_W 1000

int dp[MAX_N + 1][MAX_W + 1];

void knapsack(int weights[], int values[], int n, int capacity) {
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= capacity; j++)
            dp[i][j] = 0;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= capacity; j++) {
            dp[i][j] = dp[i - 1][j];
            if (weights[i - 1] <= j) {
                int include = values[i - 1] + dp[i - 1][j - weights[i - 1]];
                if (include > dp[i][j])
                    dp[i][j] = include;
            }
        }
    }

    printf("DP Table:\n");
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= capacity; j++)
            printf("%3d ", dp[i][j]);
        printf("\n");
    }

    printf("Maximum value: %d\n", dp[n][capacity]);

    printf("Items selected: ");
    int ci = n, cj = capacity;
    while (ci > 0 && cj > 0) {
        if (dp[ci][cj] != dp[ci - 1][cj]) {
            printf("%d (w=%d, v=%d) ", ci, weights[ci - 1], values[ci - 1]);
            cj -= weights[ci - 1];
        }
        ci--;
    }
    printf("\n");
}

int main() {
    int weights[] = {2, 3, 4, 5};
    int values[] = {3, 4, 5, 6};
    int n = 4;
    int capacity = 8;

    knapsack(weights, values, n, capacity);
    return 0;
}
