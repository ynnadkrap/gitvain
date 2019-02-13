const Ocktokit = require("@octokit/rest");
const { combineData } = require("./util");

const TOKEN = process.env.GITVAIN_TOKEN;
const ORG = process.env.GITVAIN_ORG;
const REPO = process.env.GITVAIN_REPO;

const api = new Ocktokit({ auth: `token ${TOKEN}` });

const fetchData = async date => {
  try {
    const [[prs, prNumbers], comments] = await Promise.all([
      fetchPullRequests(date),
      fetchComments(date)
    ]);
    const diffs = await Promise.all(prNumbers.map(num => fetchDiffs(num)));

    return combineData({ diffs, comments, prs });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const fetchPullRequests = async date => {
  const endDate = new Date(date);
  const prNumbers = [];
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await api.pulls.list({
      owner: ORG,
      repo: REPO,
      state: "all",
      per_page: 100,
      page
    });

    if (data.length === 0) {
      break;
    }

    let exceededDate = false;

    data.some(pr => {
      const prDate = new Date(pr.created_at);
      if (prDate.getTime() < endDate.getTime()) {
        exceededDate = true;
        return true;
      }

      prNumbers.push(pr.number);
      const user = pr.user;
      results.push({ userId: user.id, username: user.login, prs: 1 });
    });

    if (exceededDate) {
      break;
    }

    page += 1;
  }

  return [results, prNumbers];
};

const fetchDiffs = async num => {
  const { data } = await api.pulls.get({
    owner: ORG,
    repo: REPO,
    number: num
  });

  return {
    userId: data.user.id,
    username: data.user.login,
    additions: data.additions,
    deletions: data.deletions,
    commits: data.commits
  };
};

const fetchComments = async date => {
  const results = [];
  let page = 1;

  while (true) {
    const { data } = await api.pulls.listCommentsForRepo({
      owner: ORG,
      repo: REPO,
      since: date,
      per_page: 100,
      page
    });

    if (data.length === 0) {
      break;
    }

    results.push(
      ...data.map(comment => ({
        userId: comment.user.id,
        username: comment.user.login,
        comments: 1
      }))
    );

    page += 1;
  }

  return results;
};

module.exports = {
  fetchData
};
