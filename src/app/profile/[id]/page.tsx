/* eslint-disable @typescript-eslint/no-explicit-any *//* eslint-disable @typescript-eslint/no-explicit-any */
export default async function UserProfile({ params }: any) {
  const resolvedParams = await params; // Ensure `params` is resolved
  const { id } = resolvedParams; // Extract `id` from the resolved `params`

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl bg-slate-500 px-6 py-1 rounded-md my-4">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page Name
        <span className="px-2 ml-2 rounded bg-neutral-700 text-white">
          {id} {/* Use the resolved `id` */}
        </span>
      </p>
    </div>
  );
}


