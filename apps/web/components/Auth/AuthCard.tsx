import NextImage from "next/image";

import { Card } from "ui/components/Card";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div
        className={[
          "flex h-full w-full flex-col items-center justify-center z-10",
          "bg-gradient-to-br from-indigo-300 to-emerald-200",
        ].join(" ")}
      >
        <Card
          className={[
            "align-center relative flex flex-col justify-center p-12 border-1",
            "before:absolute before:z-[-1] before:h-full before:w-full",
            "before:overflow-hidden before:top-0 before:left-0",
          ].join(" ")}
        >
          <NextImage
            src="/logo.png"
            alt="logo"
            height="100%"
            width="300px"
            objectFit="contain"
          />
          {children}
        </Card>
      </div>
    </section>
  );
}

export default AuthCard;
