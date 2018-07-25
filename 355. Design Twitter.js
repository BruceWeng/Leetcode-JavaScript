/**
Design a simplified version of Twitter where users can post tweets, follow/unfollow another 
user and is able to see the 10 most recent tweets in the user's news feed. Your design should 
support the following methods:

postTweet(userId, tweetId): Compose a new tweet.
getNewsFeed(userId): Retrieve the 10 most recent tweet ids in the user's news feed. Each item 
in the news feed must be posted by users who the user followed or by the user herself. Tweets 
must be ordered from most recent to least recent.

follow(followerId, followeeId): Follower follows a followee.
unfollow(followerId, followeeId): Follower unfollows a followee.
Example:

Twitter twitter = new Twitter();

// User 1 posts a new tweet (id = 5).
twitter.postTweet(1, 5);

// User 1's news feed should return a list with 1 tweet id -> [5].
twitter.getNewsFeed(1);

// User 1 follows user 2.
twitter.follow(1, 2);

// User 2 posts a new tweet (id = 6).
twitter.postTweet(2, 6);

// User 1's news feed should return a list with 2 tweet ids -> [6, 5].
// Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.getNewsFeed(1);

// User 1 unfollows user 2.
twitter.unfollow(1, 2);

// User 1's news feed should return a list with 1 tweet id -> [5],
// since user 1 is no longer following user 2.
twitter.getNewsFeed(1);
 */
/**
 * Solution 1 OOP, hashmap, set, heap
 */
class Twitter {
    constructor() {
        this.userMap = new Map(); // (id, User)
    }
    /**
     * Compose a new tweet. 
     * @param {number} userId 
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.userMap.has(userId)) {
            let newUser = new User(userId);
            this.userMap.set(userId, newUser);
        }

        this.userMap.get(userId).post(tweetId);
    }

    /**
     * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        let result = [];
        if (!this.userMap.has(userId)) {
            return result;
        }

        let users = this.userMap.get(userId).followed;
        // Initiate MaxHeap() https://gist.github.com/fabianuribe/5eeeaf5370d03f66f739
        let heap = new Heap([], 'max', (a, b) => (a.time - b.time));
        for (let user of users) {
            let tweet = this.userMap.get(user).tweetHead;
            if (tweet !== null) {
                heap.insert(tweet);
            }
        }

        let n = 0;
        while (heap.size() !== 0 && n < 10) {
            let tweet = heap.removeTop();
            result.push(tweet.id);
            n += 1;
            if (tweet.next !== null) {
                heap.insert(tweet.next);
            }

            return result;
        }
    }

    /**
     * Follower follows a followee. If the operation is invalid, it should be a no-op. 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.userMap.has(followerId)) {
            let newFollower = new User(followerId);
            this.userMap.set(followerId, newFollower);
        }

        if (!this.userMap.has(followeeId)) {
            let newFollowee = new User(followeeId);
            this.userMap.set(followeeId, newFollowee);
        }

        this.userMap.get(followerId).follow(followeeId);
    }

    /**
     * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (!this.userMap.has(followerId) || followerId === followeeId) return;

        this.userMap.get(followerId).unfollow(followeeId);
    }
}

// Tweet link to next Tweet so that we can save lots of time
// when we execute getNewsFeed(userId)
class Tweet {
    constructor(id) {
        this.id = id;
        this.time = Date.now();
        this.next = null;
    }
}

// User can follow, unfollow and post itself
class User {
    constructor(id) {
        this.id = id;
        this.followed = new Set();
        this.follow(id); // follow itself
        this.tweetHead = null;
    }

    follow(id) {
        this.followed.add(id);
    }

    unfollow(id) {
        this.followed.delete(id);
    }

    // everytime user post a new tweet, add it to the head of tweet list.
    post(id) {
        let temp = new Tweet(id);
        temp.next = this.tweetHead;
        this.tweetHead = temp;
    }
}

/**
 * Solution 2 Deque, hashmap, set
 */
class Twitter {
    constructor() {
        this.posts = []; //deque
        this.relation = new Map();
    }

    postTweet(userId, tweetId) {
        this.posts.unshift({userId, tweetId});
    }

    getNewsFeed(userId) {
        let followees;
        if (this.relation.has(userId)) {
            followees = this.relation.get(userId);
        } else {
            followees = new Set();
        }

        let news = [];
        for (let post of this.posts) {
            if (news.length === 10) break;
            if (post.userId === userId || followees.has(post.userId)) {
                news.push(post.tweetId);
            }
        }
        return news;
    }

    follow(followerId, followeeId) {
        let followees;
        if (this.relation.has(followerId)) {
            followees = this.relation.get(followerId);
        } else {
            followees = new Set();
        }
        followees.add(followeeId);
        this.relation.set(followerId, followees);
    }

    unfollow(followerId, followeeId) {
        let followees;
        if (this.relation.has(followerId)) {
            followees = this.relation.get(followerId);
        } else {
            followees = new Set();
        }
        followees.delete(followeeId);
        this.relation.set(followerId, followees);
    }
}