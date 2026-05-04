export const formatTimeAgo = (ts: number) => {
  const diff = Math.floor((Date.now() - ts) / 60000); // minutes

  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;

  const hours = Math.floor(diff / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
