"use client";

import { getUserProfile } from "@/app/(user)/action";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Type definitions for addresses
interface Address {
  type: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  _id: string;
}

// Type definition for the user
export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  fileId?: string;
  addresses: Address[];
  __v?: number;
}

interface UserStoreType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
  refreshUserStore: () => Promise<void>;
}

const UserStoreContext = createContext<UserStoreType | undefined>(undefined);

export const UserStoreProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) => {
  const [user, setUserState] = useState<User | null>(initialUser);

  const updateUser = (userData: Partial<User>) => {
    setUserState((prev) => (prev ? { ...prev, ...userData } : null));
  };

  const clearUser = () => setUserState(null);

  //  Function to refetch user from API
  const refreshUserStore = async () => {
    try {
      const data = await getUserProfile();

      if (data?.status) {
        setUserState(data.data); // update user store
      } else {
        clearUser();
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      clearUser();
    }
  };

  useEffect(() => {
    refreshUserStore();
  }, []);

  return (
    <UserStoreContext.Provider
      value={{ user, updateUser, clearUser, refreshUserStore }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(UserStoreContext);
  if (!context) {
    throw new Error("useUserStore must be used within a UserStoreProvider");
  }
  return context;
};
