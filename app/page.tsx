import DotPattern from "@/components/ui/dot-pattern-background";
import { Form } from "@/components/ui/Form";
import { cn } from "@/lib/utils";
import { sendFeedback, submit } from "./modules/form/actions";
import { ResponseContainer } from "@/components/ui/ResponseContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative gap-12">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
      <header className="w-full max-w-5xl flex flex-col gap-5 justify-center items-center z-10">
        <h1 className="text-4xl font-bold tracking-tight">AI + ML Feedback</h1>
        <Form action={submit as any} />
      </header>
      <ResponseContainer onFeedback={sendFeedback} />
    </main>
  );
}
