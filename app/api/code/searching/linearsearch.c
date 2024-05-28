#include <stdio.h>
void main(){
    int arr[] = {1, 2, 3, 4, 5, 6, 7};
    int target = 5;
    int pointer = 0;
    int found = 0;
    while(pointer < 7 && !found){
        if(arr[pointer] == target){
            found = 1;
        }
        else{
            pointer++;
        }
    }
    if(found){
        printf("Target found at index %d", pointer);
    }
    else{
        printf("Target not found");
    }
}