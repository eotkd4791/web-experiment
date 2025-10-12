import { userResource } from "./api";
import { type User } from "./types";

type Props = {
  id: User["id"];
};
export function User({ id }: Props) {
  const user = userResource(id).read();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
