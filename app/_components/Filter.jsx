"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// TODO: added animations TOO ALL WEBSITE
const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 Guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 Guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 Guests
      </Button>
    </div>
  );
};

export const Button = ({
  filter,
  handleFilter,
  activeFilter,
  children,
  ...rest
}) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
