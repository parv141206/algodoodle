#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

struct Job {
    char id;
    int deadline;
    int profit;
};

void sortJobs(struct Job arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].profit < arr[j + 1].profit) {
                struct Job temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printJobScheduling(struct Job arr[], int n) {
    sortJobs(arr, n);

    int maxDeadline = 0;
    for (int i = 0; i < n; i++) {
        maxDeadline = MAX(maxDeadline, arr[i].deadline);
    }
    
    char slots[maxDeadline + 1];
    for (int i = 0; i <= maxDeadline; i++) slots[i] = '-';
    
    int totalProfit = 0;
    int scheduledCount = 0;
    
    for (int i = 0; i < n; i++) {
        for (int j = arr[i].deadline; j > 0; j--) {
            if (slots[j] == '-') {
                slots[j] = arr[i].id;
                totalProfit += arr[i].profit;
                scheduledCount++;
                break;
            }
        }
    }
    
    printf("Scheduled Jobs: ");
    for (int i = 1; i <= maxDeadline; i++) {
        if (slots[i] != '-') {
            printf("%c ", slots[i]);
        }
    }
    printf("\nTotal Profit: %d\n", totalProfit);
}

int main() {
    struct Job arr[] = {
        {'A', 4, 20},
        {'B', 1, 10},
        {'C', 1, 40},
        {'D', 1, 30}
    };
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printJobScheduling(arr, n);
    return 0;
}
