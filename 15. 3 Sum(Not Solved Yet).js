/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let result = new Array();
  if (nums === null || nums.length < 3) {
    return result;
  }

  nums.sort(function(a, b) {
    return a - b;
  });
  console.log(nums);
  for (let i = 0; i < nums.length - 2; i++) {
    //skip dulplicate
    if (i !== 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i]+ nums[left] + nums[right];

      if (sum === 0) {
        let answer = new Array();
        answer.push(i);
        answer.push(left);
        answer.push(right);
        result.push(answer);

        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }

        while (left < right && nums[right] === nums[right + 1]) {
          right--;
        }
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
};

let test1 = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(test1));
