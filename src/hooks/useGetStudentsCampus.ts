import { useState } from "react";
import { CampusModel } from "../api/campus";
import APIRequest from "../api/request";

export type GetStudentsCampusHook = () => {
  getStudentsCampus: (studentId: number) => Promise<CampusModel>;
  loading: boolean;
};

const useGetStudentsCampus: GetStudentsCampusHook = () => {
  const [loading, setLoading] = useState(false);

  const getStudentsCampus = async (
    studentId: number
  ): Promise<CampusModel> => {
    try {
      setLoading(true);
      const campus = await APIRequest.Get<CampusModel>(
        `student/${studentId}/campus`
      );
      return campus;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getStudentsCampus,
  };
};

export default useGetStudentsCampus;
