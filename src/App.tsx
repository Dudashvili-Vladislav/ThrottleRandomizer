import React, { useCallback, useMemo, useState } from 'react';
import { User } from './components/type/User';
import Button from './components/ui/Button';
import { UserInfo } from './components/UserInfo';
import useThrottle from './components/lib/useThrottle';

import './App.css';


function App(): JSX.Element {
  const URL = useMemo(() => "https://jsonplaceholder.typicode.com/users", []);
  const [item, setItem] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedUsers, setCachedUsers] = useState<{ [id: number]: User }>({});

  const receiveRandomUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const id = Math.floor(Math.random() * (10 - 1)) + 1;
      if (cachedUsers[id]) {
        setItem(cachedUsers[id]);
      } else {
        const response = await fetch(`${URL}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const _user = (await response.json()) as User;
        setItem(_user);
        setCachedUsers((prevCachedUsers) => ({
          ...prevCachedUsers,
          [id]: _user,
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [URL, cachedUsers]);

  const throttledRandomUser = useThrottle(receiveRandomUser, 1000);

  const handleButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setIsLoading(true);
      await throttledRandomUser();
      setIsLoading(false);
    },
    []
  );

  return (
    <div>
      <header>Get a random user</header>
      <Button onClick={handleButtonClick} />
      {isLoading ? <p>Loading...</p> : <UserInfo user={item} />}
    </div>
  );
}

export default App;
