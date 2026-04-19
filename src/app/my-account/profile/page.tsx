import { redirect } from "next/navigation";
import { getMyAccountUser } from "@/lib/my-account/queries";
import ProfileForm from "@/components/my-account/ProfileForm";

export default async function ProfilePage() {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  return (
    <ProfileForm
      initial={{
        id: user.id,
        name: user.name,
        email: user.email ?? null,
        phone: user.phone ?? null,
        role: user.role ?? "STUDENT",
        avatarUrl: user.avatarUrl ?? null,
      }}
    />
  );
}
