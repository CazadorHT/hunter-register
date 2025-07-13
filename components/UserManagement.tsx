"use client";
import React from "react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UserManagement() {
  const supabase = createClient();
  const itemPerPage = 2;
  const [users, setUsers] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const userSupabaseQuery = () => {
    let query = supabase
      .from('users')
      .select('*', { count: 'exact' })
    if (searchTerm) {
      query = query.like('fullname', `%${searchTerm}%`)
    }
    query = query.range((page - 1) * itemPerPage, page * itemPerPage - 1)
    return query
  }
 
  const fetchUsers = async () => {
    
    const { data, error, count } = await userSupabaseQuery()
    if (!data || error) {
      console.error("Error fetching users:", error);
    }
    if (!data || data.length === 0) {
      console.warn("⚠️ No users found in DB.");
      return;
    }
    setUsers(data);
    // count = count || 0; 
    const calculateMaxPage = Math.ceil((count ?? 0) / itemPerPage);
    setMaxPage(calculateMaxPage);
    console.log("Fetched users:", data);
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    console.log("Searching for:", searchTerm); 
    let { data: usersearch, error , count} = await userSupabaseQuery()
    if (error) {
      console.error("Error searching users:", error);
      return false;
    }
    if (!usersearch || usersearch.length === 0) {
      console.warn("⚠️ No users found matching the search term.");
      return;
    }
    setPage(1)
    const calculateMaxPage= Math.ceil((count ?? 0) / itemPerPage);
    setMaxPage(calculateMaxPage);
    setUsers(usersearch);
    console.log("Search results:", usersearch);
  };
  return (
    <div className="animate-in flex-1 flex flex-col gap-20 px-3">
      <div className="flex gap-2 items-center">
        <input
          onChange={handleSearch}
          className="rounded-md px-4 py-2 bg-inherit border w-full"
          type="text"
        />
        <button onClick={search}>Search</button>
      </div>
      <main className="flex-1 flex flex-col gap-6">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Full Name</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Telephone</th>
              <th className="border border-gray-200 px-4 py-2">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="border border-gray-200 px-4 py-2">{user.id}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.fullname}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-200 px-4 py-2">{user.tel}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {user.attachment && (
                    <a
                      href={user.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Attachment
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-5 py-5 flex flex-col xs:flex-row items-center xs:justify-between">
          <span className="text-xs xs:text-sm ">
            Page {page} / {maxPage}
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            { page > 1 && 
            <button
              onClick={() => setPage(page - 1)}
              className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
            >
              Previous
            </button>}
            { page < maxPage &&  
            <button
              onClick={() => setPage(page + 1)}
              className="text-sm leading-none border border-solid font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
            >
              Next
            </button>}
          </div>
        </div>
      </main>
    </div>
  );
}
