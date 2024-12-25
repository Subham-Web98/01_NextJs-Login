import Image from "next/image";

interface UserProfilePageProps {
  params: { id?: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const userId = params?.id;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-600 text-gray-100 p-4">
      {/* Page Title */}
      <h1 className="text-center text-4xl font-bold bg-gray-800 text-white my-6 py-4 px-10 rounded-2xl shadow-lg">
        User Profile Page
      </h1>

      {/* Conditional Rendering */}
      {userId ? (
        <div className="bg-gray-800 shadow-xl rounded-lg p-6 text-center max-w-md w-full">
          {/* Welcome Message */}
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-200">
            Welcome,{" "}
            <span className="py-1 px-4 mx-2 font-bold text-white bg-gray-700 shadow-sm shadow-gray-500 rounded-md">
              {userId}
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            Thank you for visiting your profile! We are glad to have you here.
          </p>

          {/* Profile Image */}
          <div className="w-full flex justify-center items-center mt-6">
            <Image
              width={300}
              height={300}
              className="rounded-full shadow-lg"
              src="https://images.pexels.com/photos/11276496/pexels-photo-11276496.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Profile"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="bg-red-100 shadow-lg rounded-lg p-6 text-center max-w-md w-full">
          {/* Error Message */}
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
