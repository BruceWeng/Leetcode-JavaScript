test1 = 1
test2 = test1
test2 = 2
print(test2) #2

test3 = {'name': 'Bruce', 'id': 0}
test4 = test3
test4 = {}

print(test3) #{'name': 'Bruce', 'id': 0}

test5 = {'name': 'Gloria', 'id': 1}
test6 = test5
test6['id'] += 1
print(test5['id']) #2
