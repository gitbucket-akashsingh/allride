function FeatureBadge({ text = "Beta" }) {
  return (
    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
      {text}
    </span>
  );
}

export default FeatureBadge;
