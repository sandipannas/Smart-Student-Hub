import { create } from "zustand";
import { persist } from "zustand/middleware";

type Student = {
  _id?: string;               // required
  studentId?: string;
  user?: string;
  batch?: string;
  course?: string;
  department?: string;
  gender?: string;
  dateOfBirth?: Date;      // keep as string
  createdAt?: string;        // string from backend
  updatedAt?: string;
  trackedBy?: string[];      // array of faculty/admin IDs
  __v?: number;
};


type StudentStore = {
  studentData: Student | null;
  setStudent: (student: Student) => void;
  updateStudent: (fields: Partial<Student>) => void;
  clearStudent: () => void;
};

const useStudentStore = create<StudentStore>()(
  persist(
    (set, get) => ({
      studentData: null,

      // Set full student object
      setStudent: (student) => set({ studentData: student }),

      // Update only specific fields
      updateStudent: (fields: Partial<Student>) =>
        set({
          studentData: {
            ...get().studentData,
            ...fields,
          },
        }),

      // Clear student (logout)
      clearStudent: () => set({ studentData: null }),
    }),
    { name: "student-storage" } // persisted key in localStorage
  )
);

export default useStudentStore;
