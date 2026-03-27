#include <stdio.h>

void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int medianOf3(int arr[], int low, int high) {
    int mid = low + (high - low) / 2;
    if (arr[mid] < arr[low]) swap(&arr[mid], &arr[low]);
    if (arr[high] < arr[low]) swap(&arr[high], &arr[low]);
    if (arr[mid] > arr[high]) swap(&arr[mid], &arr[high]);
    
    swap(&arr[mid], &arr[high]);
    return arr[high];
}

int partition(int arr[], int low, int high, int pivot) {
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSortMedian(int arr[], int low, int high) {
    if (low < high) {
        if (high - low < 2) {
            if (arr[high] < arr[low]) swap(&arr[high], &arr[low]);
            return;
        }
        int pivot = medianOf3(arr, low, high);
        int pi = partition(arr, low, high, pivot);
        quickSortMedian(arr, low, pi - 1);
        quickSortMedian(arr, pi + 1, high);
    }
}

int main() {
    int arr[] = {8, 1, 4, 9, 6, 3, 5, 2, 7, 0};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    quickSortMedian(arr, 0, n - 1);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}
