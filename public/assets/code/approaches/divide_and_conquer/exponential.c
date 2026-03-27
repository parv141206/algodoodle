#include <stdio.h>

long long fastPower(long long base, long long exp) {
    if (exp == 0) return 1;

    long long half = fastPower(base, exp / 2);
    long long result = half * half;

    if (exp % 2 != 0) {
        result *= base;
    }

    return result;
}

int main() {
    long long base = 2;
    long long exp = 10;
    
    printf("%lld^%lld = %lld\n", base, exp, fastPower(base, exp));
    return 0;
}
