const DEFAULT_OBJECT = {
  additions: 0,
  deletions: 0,
  commits: 0,
  comments: 0,
  prs: 0
};

const combineData = ({ prs, comments, diffs }) => {
  const combinedPulls = prs.reduce((acc, pr) => {
    if (acc[pr.userId]) {
      acc[pr.userId].prs += 1;
    } else {
      acc[pr.userId] = pr;
    }

    return acc;
  }, {});

  const combinedDiffs = diffs.reduce((acc, diff) => {
    const d = acc[diff.userId];

    if (d) {
      d.deletions += diff.deletions;
      d.additions += diff.additions;
      d.commits += diff.commits;
    } else {
      acc[diff.userId] = diff;
    }

    return acc;
  }, {});

  const combinedComments = comments.reduce((acc, comment) => {
    if (acc[comment.userId]) {
      acc[comment.userId].comments += 1;
    } else {
      acc[comment.userId] = comment;
    }

    return acc;
  }, {});

  return Object.values(
    merge({
      diffs: combinedDiffs,
      comments: combinedComments,
      prs: combinedPulls
    })
  );
};

const merge = ({ diffs, comments, prs }) => {
  const result = {};

  const mergeResource = r =>
    Object.keys(r).forEach(
      k => (result[k] = Object.assign({}, DEFAULT_OBJECT, result[k], r[k]))
    );

  mergeResource(diffs);
  mergeResource(comments);
  mergeResource(prs);

  return result;
};

module.exports = {
  combineData
};
