import { getUsers } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const fetchUsers = async (hash) => {
  const accessRoles = [ROLE.ADMIN];

  const access = await sessions.access(hash, accessRoles);

  if (!access) {
    return { error: "Доспуп запрещен", res: null };
  }
  
  const users = await getUsers();

  return {
    error: null,
    res: users,
  };
};
