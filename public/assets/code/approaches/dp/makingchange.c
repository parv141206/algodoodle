#include <stdio.h>
#include <limits.h>

#define MAX_COINS 100
#define MAX_AMOUNT 1000

int dp[MAX_COINS + 1][MAX_AMOUNT + 1];
int choice[MAX_COINS + 1][MAX_AMOUNT + 1];

void makingChange(int coins[], int n, int amount) {
    for (int i = 0; i <= n; i++)
        for (int j = 0; j <= amount; j++)
            dp[i][j] = INT_MAX;

    for (int i = 0; i <= n; i++)
        dp[i][0] = 0;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= amount; j++) {
            dp[i][j] = dp[i - 1][j];
            choice[i][j] = -1;
            if (coins[i - 1] <= j && dp[i][j - coins[i - 1]] != INT_MAX) {
                if (dp[i][j - coins[i - 1]] + 1 < dp[i][j]) {
                    dp[i][j] = dp[i][j - coins[i - 1]] + 1;
                    choice[i][j] = i;
                }
            }
        }
    }

    printf("DP Table:\n");
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= amount; j++) {
            if (dp[i][j] == INT_MAX)
                printf("INF ");
            else
                printf("%3d ", dp[i][j]);
        }
        printf("\n");
    }

    if (dp[n][amount] == INT_MAX) {
        printf("Cannot make amount %d with given coins.\n", amount);
        return;
    }

    printf("Minimum coins: %d\n", dp[n][amount]);
    printf("Coins used: ");
    int ci = n, cj = amount;
    while (cj > 0 && ci > 0) {
        if (choice[ci][cj] == ci) {
            printf("%d ", coins[ci - 1]);
            cj -= coins[ci - 1];
        } else {
            ci--;
        }
    }
    printf("\n");
}

int main() {
    int coins[] = {1, 5, 10, 25};
    int n = 4;
    int amount = 30;

    makingChange(coins, n, amount);
    return 0;
}
