function getTopPosition(isoDate) {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 60 + (minutes / 60) * 60;
}

export default function ScheduledCard({ post }) {
  const top = getTopPosition(post.schedulePostDate);

  return (
    <div
      className="absolute left-2 right-2 bg-blue-600 text-white rounded p-2 text-sm shadow"
      style={{
        top: `${top}px`,
        height: "32px",
      }}
    >
      <div className="font-medium truncate">{post.postContent}</div>
      <div className="text-[10px] opacity-80">
        {new Date(post.schedulePostDate).toLocaleTimeString()}
      </div>
    </div>
  );
}
