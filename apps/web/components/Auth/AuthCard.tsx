import NextImage from "next/image";

import { Card } from "ui/components/Card";

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="auth-card-container">
        <Card className="auth-card">
          <NextImage src="/logo.png" alt="logo" height="100%" width="300px" objectFit="contain" />
          {children}
        </Card>
      </div>
    </section>
  );
}

export default AuthCard;
