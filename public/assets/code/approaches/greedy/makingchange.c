#include <stdio.h>

void sortDescending(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void makeChangeGreedy(int coins[], int n, int amount) {
    sortDescending(coins, n);
    
    printf("Coins used to make amount %d: \n", amount);
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        while (amount >= coins[i]) {
            amount -= coins[i];
            printf("%d ", coins[i]);
            count++;
        }
        if (amount == 0) break;
    }
    printf("\nTotal coins used: %d\n", count);
    
    if (amount > 0) {
        printf("Note: Greedy approach failed to make exact change. Remaining: %d\n", amount);
    }
}

int main() {
    int coins[] = {1, 5, 10, 25};
    int n = sizeof(coins) / sizeof(coins[0]);
    int amount = 30;
    
    makeChangeGreedy(coins, n, amount);
    return 0;
}
