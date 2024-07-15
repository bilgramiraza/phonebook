
function Notification({ message, status }) {
  if (!message) return null;

  return (
    <div className={`w-1/6 h-1/6 absolute right-1 top-1 rounded-lg p-2 border border-2 border-black ${status ? 'bg-green-500' : 'bg-red-800 text-white'}`}>
      {message}
    </div>
  );
}

export default Notification;
