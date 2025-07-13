"use client"

import { Button } from "@/components/ui/button";
import { register } from './action'

// import { useFormState } from "react-dom";
import { useActionState } from "react";
type RegisterState = {
  success: boolean;
  message: string;
};

const initialState: RegisterState = {
  success: false,
  message: "",
};
// const initialState = { success: false, message: "" }; // ✅ ใช้ string เปล่า แทน null
export default  function Home() {
// const [state, formAction] = useFormState(register, initialState);
const [state, dispatch, isPending] = useActionState(
    async (_state: RegisterState, formData: FormData): Promise<RegisterState> => {
      return await register(formData); // ✅ ย้าย logic ไปให้ register ที่ server handle
    },
    initialState
  );
    return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="mt-4 flex flex-col gap-2">
          <h4 className="text-center mb-4">Register</h4>
        <form action={dispatch} 
              className="mt-4 flex flex-col gap-2">
          <input
          type="text"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="fullname"
            placeholder="name"
            required
          />

          <input
          type="email"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />

          <input
          type="tel"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="tel"
            placeholder="Tel"
            required
          />
          <input
          type="file"
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="attachment"
            required
          />
            <Button 
            disabled={isPending}
            type="submit"
            className="w-full px-4 py-2 bg-green-700 rounded-md text-white " variant={"default"}>            
               {isPending ? "Submitting..." : "Register"}
          </Button>
          { !state.success&&state.message && <div className="text-red-500">Error : {state.message}</div>}
          { state.success && <div className="text-green-500">Registration successful!</div>} 
          </form>
        </div>
      
        {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div> */}

        {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer> */}
      </div>
    </main>
  );
}
