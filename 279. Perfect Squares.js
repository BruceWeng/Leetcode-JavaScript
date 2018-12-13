/**
Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
 */
/**
 * Leetcode Fundamental: 12/13 Update
 * First Try:
 * Break down n to subset number by deduct by squares (1, 4, 9...sqrt(n))
 * BFS Approach:
 * ex: n = 12
 *                                        12
 *                   /                    |             \
 *               11 (12-1)             8 (12-4)        3 (12-9)
 *        /       |        \          /       \          |
 *    10 (11-1) 7 (11-4)  2 (11-9)  7 (8-1)  4 (8-4)   2 (3-1)
 *   /   |   \  /    \      |      /   \    /   \        |
 *                                            0 (4-4)  1 (2-1)
 *                                            (valid)    |
 *                                                     0 (1-1) 
 *                                                     (Valid)
 * 1. Only the leaves with value 0 are answers.
 * 2. Top-Down Approach is hard to calculate Time Complexity.
 * 3. Nodes with same value have the same amount of children. Recalculating -> DP.
 * 
 * Bottom Up DP Thinking:
 * 1. Each node is one state for the stage (single state).
 * 2. Each child is one prev state for the node.
 * 3. Transfer function: The relation between current node(stage) and children(prev stages).
 * 4. Tree Structure -> Single State DP
 */