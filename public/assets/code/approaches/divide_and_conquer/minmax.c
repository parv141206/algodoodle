#include <stdio.h>

struct Pair {
  int min;
  int max;
};

struct Pair getMinMax(int arr[], int low, int high) {
  struct Pair minmax, mml, mmr;
  int mid;
  
  // Base case: 1 element
  if (low == high) {
     minmax.max = arr[low];
     minmax.min = arr[low];
     return minmax;
  }
  
  // Base case: 2 elements
  if (high == low + 1) {
     if (arr[low] > arr[high]) {
        minmax.max = arr[low];
        minmax.min = arr[high];
     } else {
        minmax.max = arr[high];
        minmax.min = arr[low];
     }
     return minmax;
  }
  
  // Divide
  mid = (low + high) / 2;
  mml = getMinMax(arr, low, mid);
  mmr = getMinMax(arr, mid + 1, high);
  
  // Combine
  if (mml.min < mmr.min) minmax.min = mml.min;
  else minmax.min = mmr.min;
     
  if (mml.max > mmr.max) minmax.max = mml.max;
  else minmax.max = mmr.max;
  
  return minmax;
}

int main() {
  int arr[] = {1000, 11, 445, 1, 330, 3000};
  int n = sizeof(arr) / sizeof(arr[0]);
  struct Pair minmax = getMinMax(arr, 0, n - 1);
  printf("Minimum element is %d\n", minmax.min);
  printf("Maximum element is %d\n", minmax.max);
  return 0;
}
