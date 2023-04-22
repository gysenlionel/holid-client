import { IUser } from "../types/user";
import { isEqual } from "../utils/helpers/isEqual";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface UserContext {
  user?: IUser;
  setUser: (user?: IUser) => void;
}

export const UserContextImpl = createContext<UserContext>(null!);

export function useUser() {
  return useContext(UserContextImpl);
}

interface Props {
  initialUser?: IUser;
  children: React.ReactNode;
}

export const UserProvider: FC<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const prevUser = useRef<IUser | undefined>(user);

  useEffect(() => {
    if (!isEqual(prevUser.current, initialUser)) {
      setUser(initialUser);
      prevUser.current = initialUser;
    }
  }, [initialUser]);

  const value = useMemo(() => {
    return { user, setUser };
  }, [user]);

  return (
    <UserContextImpl.Provider value={value}>
      {children}
    </UserContextImpl.Provider>
  );
};
