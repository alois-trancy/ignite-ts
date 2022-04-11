
const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-3xl">
        <span className="text-4xl font-bold">404</span> <span className="font-extralight">Page Not Found</span>
      </p>
      <p>
        The page you have been looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;