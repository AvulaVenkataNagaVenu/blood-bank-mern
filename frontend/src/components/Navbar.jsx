<div className="relative">
  🔔
  {notifications.filter(n => !n.read).length > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
      {notifications.filter(n => !n.read).length}
    </span>
  )}
</div>
