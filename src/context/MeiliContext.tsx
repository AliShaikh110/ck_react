// src/context/MeiliContext.tsx

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

// Generic item type used in all dropdown lists
export type GenericData = {
  id?: number;
  name?: string;
  slug?: string;
  title?: string;
  type?: string;
};

// Shape of the Meili-related data in context
export type MeiliDataContextType = {
  subjectData: GenericData[];
  topicData: GenericData[];
  exams: GenericData[];
  category: GenericData[];
};

// Keys you are allowed to use for `type`
export type KeyType = keyof MeiliDataContextType;
// "subjectData" | "topicData" | "exams" | "category"

// Public API of this context
export type MiliDataContextType = {
  data: MeiliDataContextType;
  // addDropItem: (title: string, id: number, type: KeyType, dropdownType: string) => void;
  deleteDropItem: (id: number, type: KeyType) => void;
};

const MeiliContext = createContext<MiliDataContextType | null>(null);

export function MeiliDataContextProvide({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MeiliDataContextType>({
    subjectData: [],
    topicData: [],
    exams: [],
    category: [],
  });

  // const addDropItem: MiliDataContextType["addDropItem"] = (
  //   title,
  //   id,   
  //   type,
  //   dropdownType
  // ) => {

  //   const newItem = { id, title, type };

  //   setData(prev => {

  //     if (dropdownType === "single") {
  //       return {
  //         ...prev,
  //         [type]: [newItem],
  //       };
  //     }

  //     const list = prev[type];
  //     const alreadyExists = list.some(item => item.id === id);
  //     if (alreadyExists) return prev;

  //     return {
  //       ...prev,
  //       [type]: [...list, newItem],
  //     };
  //   });

  // };

  const deleteDropItem: MiliDataContextType["deleteDropItem"] = (id, type) => {

    const ok = data[type].filter((t) => t.id != id)

    setData((prev) => ({
      ...prev,
      [type]: ok
    }))

  }

  return (
    // addDropItem
    <MeiliContext.Provider value={{ data,  deleteDropItem }}>
      {children}
    </MeiliContext.Provider>
  );
}

// Hook to use this context
export default function UseMeiliDataContext() {
  const ctx = useContext(MeiliContext);
  if (!ctx) {
    throw new Error("useMeiliDataContext must be used within MeiliContext");
  }
  return ctx;
}
