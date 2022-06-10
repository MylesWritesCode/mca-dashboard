import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Button, Card } from "ui";

export default function Web() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("user:", session.user);
    }
  }, [session]);

  return (
    <div>
      <Card>
        <Card.Header title="Card header">Card header</Card.Header>
        <div className="h-36 w-36"></div>
        <div>
          <Button>Button</Button>
        </div>
      </Card>
    </div>
  );
}
