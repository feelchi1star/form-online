import axios from "axios";

const fetchData = async (p) => {
  const data = await axios.get(process.env.NEXT_PUBLIC_URL + "/api", {
    headers: {
      Authorization: p,
    },
  });
  return await data.data;
};
export default async function ADMIN({ searchParams: { password } }) {
  const data = await fetchData(password);
  return (
    <div className="flex gap-20 flex-wrap items-start justify-stretch p-6">
      <div className="border p-4 rounded-lg">
        <h1 className="font-bold text-xl">
          Total Available Token: {data?.length}
        </h1>

        <ul className="px-4">
          {data?.token?.map((e, idx) => {
            return (
              <li className="leading-9 my-2" key={idx}>
                {idx + 1}. {e.token}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border p-4 rounded-lg">
        <h1 className="font-bold text-xl">
          Paid Group Members: {data?.userLength}+
        </h1>

        <ul className="px-1 overflow-y-auto max-h-screen">
          {data?.user?.map((e, idx) => {
            return (
              <li
                className="flex p-2 shadow-sm bg-stone-100 my-2 rounded-md flex-col gap-1"
                key={idx}
              >
                <h4 className="font-bold">{e.name}</h4>
                <p className="text-sm">{e.matricNumber}</p>
                <p className="text-sm">{e.email}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
