import { Button } from "@/components/ui/button";
import { register } from "@/app/action";
import Link from "next/link";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import UserManagement from "@/components/UserManagement"; 

export default function page() {

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="mt-4 flex flex-col gap-2">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <AuthButton />
            </div>
          </nav>

          <div className="animate-in flex-1 flex flex-col gap-20  max-w-4xl px-3 "> 
            <main className="mt-4">
                 <UserManagement />
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
