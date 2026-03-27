#include <stdio.h>
#include <limits.h>

#define MAX_N 100

int dp[MAX_N][MAX_N];
int split[MAX_N][MAX_N];

void printOptimalParens(int i, int j) {
    if (i == j) {
        printf("M%d", i + 1);
        return;
    }
    printf("(");
    printOptimalParens(i, split[i][j]);
    printf(" x ");
    printOptimalParens(split[i][j] + 1, j);
    printf(")");
}

void matrixChainMultiplication(int dims[], int size) {
    int n = size - 1;

    for (int i = 0; i < n; i++)
        dp[i][i] = 0;

    for (int len = 2; len <= n; len++) {
        for (int i = 0; i < n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    split[i][j] = k;
                }
            }
        }
    }

    printf("DP Table (Min Cost):\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j < i)
                printf("  -  ");
            else
                printf("%5d", dp[i][j]);
        }
        printf("\n");
    }

    printf("\nSplit Table:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j <= i)
                printf("  -  ");
            else
                printf("%5d", split[i][j]);
        }
        printf("\n");
    }

    printf("\nMinimum multiplications: %d\n", dp[0][n - 1]);
    printf("Optimal parenthesization: ");
    printOptimalParens(0, n - 1);
    printf("\n");
}

int main() {
    int dims[] = {10, 20, 30, 40, 30};
    int size = 5;

    matrixChainMultiplication(dims, size);
    return 0;
}
