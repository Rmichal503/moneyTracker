import { Button } from "@tremor/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <Button size="xs" icon={LogOut} variant="secondary">Logout</Button>
    </form>
  )
}
