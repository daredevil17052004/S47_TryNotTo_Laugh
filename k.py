def print_subarray(arr,k):
    n = len(arr)
    sum = 0
    for i in range(n):
        for j in range(i,n):
            sum = 0
            print()
            for w in arr[i:j+1]:
                sum = sum + w
                if sum == k:
                    return i,j
                
                