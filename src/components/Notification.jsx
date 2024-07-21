
function Notification({ message, status }) {
  if (!message) return null;

  return (
    <div className={`w-1/5 mx-2 py-4 absolute right-1/2 top-1 rounded-lg border border-2 border-black ${status ? 'bg-green-500' : 'bg-red-800'}`}>
      <span className={`mx-2 text-lg italic ${status ? 'text-black' : 'text-white'}`}>
        {message}
      </span>
    </div>
  );
}

export default Notification;
