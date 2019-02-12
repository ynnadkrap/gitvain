const { combineData } = require("./util");

describe("util", () => {
  describe("#combineData", () => {
    const userId1 = 1;
    const userId2 = 2;
    const userId3 = 3;

    const prs = [
      { userId: userId1, prs: 1 },
      { userId: userId1, prs: 1 },
      { userId: userId1, prs: 1 },
      { userId: userId2, prs: 1 }
    ];

    const diffs = [
      { userId: userId1, additions: 1, deletions: 10, commits: 2 },
      { userId: userId2, additions: 1, deletions: 10, commits: 2 },
      { userId: userId2, additions: 0, deletions: 0, commits: 5 }
    ];

    const comments = [
      { userId: userId1, comments: 1 },
      { userId: userId2, comments: 2 },
      { userId: userId3, comments: 10 }
    ];

    it("merges data from prs, comments, and diffs", () => {
      const results = combineData({ prs, diffs, comments });

      expect(results.length).toEqual(3);

      const user1 = results.find(res => res.userId === userId1);
      expect(user1).toEqual({
        userId: userId1,
        prs: 3,
        additions: 1,
        deletions: 10,
        commits: 2,
        comments: 1
      });

      const user2 = results.find(res => res.userId === userId2);
      expect(user2).toEqual({
        userId: userId2,
        prs: 1,
        additions: 1,
        deletions: 10,
        commits: 7,
        comments: 2
      });

      const user3 = results.find(res => res.userId === userId3);
      expect(user3).toEqual({
        userId: userId3,
        comments: 10,
        additions: 0,
        deletions: 0,
        commits: 0,
        prs: 0
      });
    });
  });
});
