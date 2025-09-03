import { type User, userResource } from "./api";

type Props = {
  id: User["id"];
};
export function User({ id }: Props) {
  const user = userResource(id).read();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
