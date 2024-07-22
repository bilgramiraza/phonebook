
function Notification({ message, status }) {
  if (!message) return null;

  return (
    <div className="w-1/3 absolute top-2 right-1">
      <div className={`py-4 fixed rounded-lg border border-2 border-black ${status ? 'bg-green-500' : 'bg-red-800'}`}>
        <span className={`mx-2 text-sm lg:text-lg italic ${status ? 'text-black' : 'text-white'}`}>
          {message}
        </span>
      </div>
    </div>
  );
}

export default Notification;
