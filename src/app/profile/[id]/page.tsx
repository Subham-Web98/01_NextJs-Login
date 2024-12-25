import Image from "next/image";

interface UserProfilePageProps {
  params: { id?: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const userId = params?.id;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-600 text-gray-800 p-4">
      <h1 className="text-center text-4xl font-bold bg-gray-900 text-white my-6 py-4 px-10 rounded-2xl shadow-lg">
        User Profile Page
      </h1>
      {userId ? (
        <div className="bg-slate-900 shadow-xl rounded-lg p-6 text-center max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-100">
            Welcome ,{" "}
            <span className="py-1 px-4 mx-2  font-bold text-white bg-slate-800 shadow-sm shadow-slate-300 rounded-md">
              {userId}
            </span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            eligendi ex impedit voluptatum laboriosam. Quisquam, suscipit!
          </p>
          <div className="w-full flex justify-center items-center p-6">
            <Image
              width={300}
              height={300}
              className=" rounded-full items-center"
              src="https://images.pexels.com/photos/11276496/pexels-photo-11276496.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="profile image "
            />
          </div>
        </div>
      ) : (
        <div className="bg-red-100 shadow-lg rounded-lg p-6 text-center max-w-md w-full">
          <p className="text-xl sm:text-2xl font-semibold text-red-600">
            User ID is missing or invalid.
          </p>
          <p className="text-gray-700 mt-2">
            Please check the URL and try again.
          </p>
        </div>
      )}
    </div>
  );
}
