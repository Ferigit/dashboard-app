// import { useFetch } from '@/hooks/api/useApi';

interface User {
  id: string;
  name: string;
  email: string;
}

export function UserList() {
  // const { data: users, isLoading, error } = useFetch<User[]>(['users'], '/users');

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {/* {users?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))} */}
      </ul>
    </div>
  );
}