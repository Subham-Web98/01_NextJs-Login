/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
export default async function UserProfile({ params }: any) {
  const resolvedParams = await params; // Ensure `params` is resolved
  const { id } = resolvedParams; // Extract `id` from the resolved `params`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl bg-slate-500 px-6 py-1 rounded-md my-4">
        Profile
      </h1>
      <hr />
      <p className="text-4xl text-center">
        Profile page Name
        <span className="px-2 ml-2  rounded bg-neutral-700 text-white">
          {id} {/* Use the resolved `id` */}
        </span>
      </p>
      <div className="my-4 flex items-center justify-center ">
        <Image height={300} width={300}
          className="rounded-3xl "
          src="https://images.pexels.com/photos/29725302/pexels-photo-29725302/free-photo-of-festive-christmas-decorations-with-ornaments.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="dec Image"
        />
      </div>
    </div>
  );
}


