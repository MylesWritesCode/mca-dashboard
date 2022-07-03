import { Button, Card } from "ui";

export default function Index() {
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
