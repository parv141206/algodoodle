#include <stdio.h>

struct Item {
    int id;
    int weight;
    int value;
    double ratio;
};

void sortItems(struct Item items[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (items[j].ratio < items[j + 1].ratio) {
                struct Item temp = items[j];
                items[j] = items[j + 1];
                items[j + 1] = temp;
            }
        }
    }
}

void fractionalKnapsack(struct Item items[], int n, int W) {
    for (int i = 0; i < n; i++) {
        items[i].ratio = (double)items[i].value / items[i].weight;
    }
    
    sortItems(items, n);
    
    double totalValue = 0.0;
    
    printf("Selected Items:\n");
    for (int i = 0; i < n; i++) {
        if (W >= items[i].weight) {
            W -= items[i].weight;
            totalValue += items[i].value;
            printf("Item %d (100%%) - Value: %d\n", items[i].id, items[i].value);
        } else {
            double fraction = (double)W / items[i].weight;
            totalValue += items[i].value * fraction;
            printf("Item %d (%.0f%%) - Value: %.2f\n", items[i].id, fraction * 100, items[i].value * fraction);
            break;
        }
    }
    printf("Total Value: %.2f\n", totalValue);
}

int main() {
    struct Item items[] = {
        {1, 10, 60, 0},
        {2, 20, 100, 0},
        {3, 30, 120, 0}
    };
    int n = sizeof(items) / sizeof(items[0]);
    int capacity = 50;
    
    fractionalKnapsack(items, n, capacity);
    return 0;
}
