export const formatDollarAmount = (value, noDecimals = false) => {
  const numOfDecimals = noDecimals ? 0 : 2;
  const valueWithDecimals = parseFloat(value).toFixed(numOfDecimals);

  if (valueWithDecimals > 5) {
    return `$${valueWithDecimals
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  return `$${valueWithDecimals}`;
};

export const formatUrlLinks = value => {
  const { githubLink, personalLink, stackoverflowLink } = value;
  if (githubLink) {
    const formattedLink = githubLink.split('/').pop();
    return formattedLink;
  }
  if (personalLink) {
    const formattedLink = personalLink
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .split('/')[0];
    return formattedLink;
  }
  if (stackoverflowLink) {
    const formattedLink = stackoverflowLink.split('/').pop();
    return formattedLink;
  }
  return value;
};

export const navHelper = (e, handleNav, route) => {
  if (!e.ctrlKey) {
    e.preventDefault();
    handleNav(route);
  }
};
