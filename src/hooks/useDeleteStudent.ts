import { useState } from "react"
import { useDispatch } from "react-redux";
import APIRequest from "../api/request";
import { deleteStudent as acDeleteStudent } from "../store/actions/actionCreators";

export type DeleteStudentHook = () => {
  deleteStudent: (id: number) => Promise<void>,
  loading: boolean
}

const useDeleteStudent : DeleteStudentHook = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const deleteStudent = async (id: number) : Promise<void> => {
    try {
      setLoading(true);
      await APIRequest.Delete(`/student/${id}`);
      dispatch(acDeleteStudent(id));
    } finally {
      setLoading(false);
    }
  }

  return {
    deleteStudent,
    loading
  }
}

export default useDeleteStudent