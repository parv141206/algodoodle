#include <stdio.h>
#include <string.h>

#define MAX_LEN 100

int dp[MAX_LEN + 1][MAX_LEN + 1];
char arrow[MAX_LEN + 1][MAX_LEN + 1];

void scs(char *a, char *b) {
    int m = strlen(a);
    int n = strlen(b);

    for (int i = 0; i <= m; i++) {
        dp[i][0] = i;
        if (i > 0) arrow[i][0] = 'U';
    }
    for (int j = 0; j <= n; j++) {
        dp[0][j] = j;
        if (j > 0) arrow[0][j] = 'L';
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                arrow[i][j] = 'D';
            } else if (dp[i - 1][j] <= dp[i][j - 1]) {
                dp[i][j] = dp[i - 1][j] + 1;
                arrow[i][j] = 'U';
            } else {
                dp[i][j] = dp[i][j - 1] + 1;
                arrow[i][j] = 'L';
            }
        }
    }

    printf("DP Table:\n");
    printf("    ");
    for (int j = 0; j <= n; j++)
        printf("%3d", j);
    printf("\n");
    for (int i = 0; i <= m; i++) {
        printf("%c: ", i == 0 ? ' ' : a[i - 1]);
        for (int j = 0; j <= n; j++)
            printf("%3d", dp[i][j]);
        printf("\n");
    }

    printf("\nArrow Table:\n");
    for (int i = 0; i <= m; i++) {
        printf("%c: ", i == 0 ? ' ' : a[i - 1]);
        for (int j = 0; j <= n; j++) {
            char c = arrow[i][j];
            printf("  %c", c == 'D' ? '\\' : c == 'U' ? '|' : c == 'L' ? '-' : ' ');
        }
        printf("\n");
    }

    char result[2 * MAX_LEN + 1];
    int idx = dp[m][n];
    result[idx] = '\0';

    int ci = m, cj = n;
    while (ci > 0 || cj > 0) {
        if (ci > 0 && cj > 0 && arrow[ci][cj] == 'D') {
            result[--idx] = a[ci - 1];
            ci--;
            cj--;
        } else if (ci > 0 && (cj == 0 || arrow[ci][cj] == 'U')) {
            result[--idx] = a[ci - 1];
            ci--;
        } else {
            result[--idx] = b[cj - 1];
            cj--;
        }
    }

    printf("\nSCS length: %d\n", dp[m][n]);
    printf("SCS: %s\n", result);
}

int main() {
    char a[] = "ABCBDAB";
    char b[] = "BDCAB";

    scs(a, b);
    return 0;
}
