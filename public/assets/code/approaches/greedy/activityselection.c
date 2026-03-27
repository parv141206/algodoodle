#include <stdio.h>

struct Activity {
    int id;
    int start;
    int finish;
};

void sortActivities(struct Activity arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].finish > arr[j + 1].finish) {
                struct Activity temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printMaxActivities(struct Activity arr[], int n) {
    sortActivities(arr, n);

    printf("Following activities are selected:\n");
    
    // The first activity is always selected
    int i = 0;
    printf("Activity %d (Start: %d, Finish: %d)\n", arr[i].id, arr[i].start, arr[i].finish);

    for (int j = 1; j < n; j++) {
        if (arr[j].start >= arr[i].finish) {
            printf("Activity %d (Start: %d, Finish: %d)\n", arr[j].id, arr[j].start, arr[j].finish);
            i = j;
        }
    }
}

int main() {
    struct Activity arr[] = {
        {1, 1, 2},
        {2, 3, 4},
        {3, 0, 6},
        {4, 5, 7},
        {5, 8, 9},
        {6, 5, 9}
    };
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printMaxActivities(arr, n);
    return 0;
}
