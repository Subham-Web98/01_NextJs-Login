/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserProfilePage({ params }: any) {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-center text-3xl sm:text-6xl font-bold bg-slate-800 text-white my-4 py-4 px-20 rounded-3xl ">
        User Profile Page
      </h1>
      <p className="text-3xl p-6  rounded-xl">
        <span className="py-3 mx-4 text-black font-bold px-6 bg-green-500 rounded-md">{params.id}</span>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
        eligendi.{" "}
      </p>
    </div>
  );
}
